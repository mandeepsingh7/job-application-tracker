"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication, Profile } from "../models";

interface JobApplicationData {
    company: string;
    role: string;
    location?: string; 
    salary?: string;
    jobUrl?: string;
    description: string;
    appliedDate?: string;
    lastResponseDate?: string;
    notes?: string;
    coverLetter?: string;
    boardId: string;
}

export async function createJobApplication(data: JobApplicationData) {
    // This function can be called from client component. 
    // Return will be {data: ...} or {error: "..."}
    const session = await getSession();

    if (!session?.user) {
        return {error: "Unauthorized"};
    }

    await connectDB();

    const {
        company,
        role,
        location,
        salary,
        jobUrl,
        description,
        appliedDate,
        lastResponseDate,
        notes,
        coverLetter,
        boardId
    } = data;

    if (!company || !role || !description || !boardId) {
        return {error: "Missing required fields"};
    }

    // Check if the user is linked to this board or not 
    const board = await Board.findOne({
        _id: boardId,
        userId: session.user.id 
    });

    if (!board) {
        return {error: "Board not found"};
    }

    // Getting column Wishlist for this board 

    const column = await Column.findOne({
        boardId,
        name: "Wishlist"
    })

    if (!column) {
        return {error: "Column not found"};
    }
    
    const columnId = column._id; 

    const maxOrder = (await JobApplication.findOne({
        columnId,
        boardId
    })
    .sort({order: -1})
    .select('order')
    .lean()) as {order: number} | null;
    // MongoDB will first sort in descending order and then only return for e.g. {order: 4}

    const jobApplication = await JobApplication.create({
        company,
        role,
        description,
        status: 'wishlist',
        appliedDate,
        lastResponseDate,
        location,
        columnId,
        boardId,
        userId: session.user.id,
        order: maxOrder ? maxOrder.order + 1 : 0,
        notes,
        salary,
        jobUrl,
        coverLetter
    });

    await Column.findByIdAndUpdate(columnId, {
        $push: { jobApplications: jobApplication._id},
    });

    revalidatePath('/dashboard');

    const profile = await Profile.findOne({
        userId: session.user.id
    });

    const profilePayLoad = {
        skills: profile.skills,
        projects: profile.projects,
        experience: profile.experience,
        education: profile.education,
        courses: profile.courses
    }

    const jobApplicationPayLoad = {
        company: data.company,
        role: data.role,
        location: data.location,
        salary: data.salary,
        description: data.description,
        notes: data.notes,
        coverLetter: data.coverLetter
    }

    const response = await fetch(
        `${process.env.AI_BACKEND_URL}/job-application-tracker/generate`,
        {
            method: "POST",
            headers: {
                 "Content-Type": "application/json",
            },
            body: JSON.stringify({
                profile: profilePayLoad,
                job: jobApplicationPayLoad
            })
        }
    )

    if (!response.ok) {
        throw new Error("AI Service failed");
    }

    const responseData = await response.json();
    const newCoverLetter = responseData['cover_letter']
    const newNotes = responseData['notes']

    await JobApplication.findByIdAndUpdate(jobApplication._id, 
        {
            coverLetter: newCoverLetter,
            notes: newNotes
        }
    )

    return { data: JSON.parse(JSON.stringify(jobApplication))};
    // jobApplication is mongoose Document. Stringify converts it into Json and then parse converts it to JS object so it can be sent to client component. 
}

export async function updateJobApplication(
    id: string,
    updates: {
        company?: string;
        role?: string;
        location?: string;
        salary?: string;
        jobUrl?: string;
        description?: string;
        appliedDate?: string;
        lastResponseDate?: string;
        notes?: string;
        coverLetter?: string;
        columnId?: string;
        status?: string;
        order?: number;
    }
)   {
    const session = await getSession();

    if (!session?.user) {
        return {error: "Unauthorized"};
    }

    await connectDB();

    const jobApplication = await JobApplication.findById(id);

    if (!jobApplication) {
        return {error: "No Job Application for this ID"}
    }

    if (jobApplication.userId != session.user.id) {
        return {error: "Unauthorized"};
    }

    const {columnId, order, status, ...otherUpdates} = updates; 

    const updatesToApply: Partial<{
        company: string;
        role: string;
        location: string;
        salary: string;
        jobUrl: string;
        description: string;
        appliedDate: string;
        lastResponseDate: string;
        notes: string;
        coverLetter: string;
        columnId: string;
        order: number;
        status: string;
    }> = otherUpdates;

    const currentColumnId = jobApplication.columnId.toString();
    const newColumnId = columnId?.toString();

    const isMovingToDifferentColumn = newColumnId && (newColumnId !== currentColumnId);

    if (isMovingToDifferentColumn) {
        await Column.findByIdAndUpdate(currentColumnId, {
            $pull : {jobApplications: id},
        });
        // We need to first pull that job application from Old Column 

        const maxOrder = await JobApplication.findOne({
            columnId: newColumnId 
        }).sort({order: -1})
        .select('order')
        .lean() as { order: number} | null; 

        const newOrder = maxOrder ? maxOrder.order + 1 : 0;

        updatesToApply.columnId = newColumnId;
        updatesToApply.order = newOrder;

        const column = await Column.findById(newColumnId);

        if (!column) {
            return {error: "Column not found for this ID"}
        }

        updatesToApply.status = column.name; 

        await Column.findByIdAndUpdate(newColumnId, {
            $push: { jobApplications: id}
        })
    }

    const updated = await JobApplication.findByIdAndUpdate(id, updatesToApply, {
        returnDocument: "after"
    })

    // We need new: true to return updated values. 

    revalidatePath('/dashboard');

    return {data: JSON.parse(JSON.stringify(updated))};
}

export async function deleteJobApplication (id: string) {
    const session = await getSession();

    if (!session?.user) {
        return {error: "Unauthorized"};
    }

    await connectDB();

    const jobApplication = await JobApplication.findById(id);

    if (!jobApplication) {
        return {error: "Job Application with this ID not found"};
    }

    if (jobApplication.userId != session.user.id) {
        return {error: "Unauthorized"};
    }

    await Column.findByIdAndUpdate(jobApplication.columnId, {
        $pull: { jobApplications: id}
    })

    await JobApplication.deleteOne({_id: id});

    revalidatePath('/dashboard');

    return {success: true};
}