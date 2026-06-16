"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Profile } from "../models";
import { success } from "better-auth";

interface ProjectData {
    title: string;
    description: string;
    projectUrl?: string;
    githubUrl?: string;
}

export async function addProject(data: ProjectData) {
  const session = await getSession();

  if (!session?.user) {
    return {error: "Unauthorized"};
  }

  await connectDB();

  const {
    title,
    description,
    projectUrl,
    githubUrl
  } = data;

  if (!title || !description){
    return {error: "Missing Required Fields"};
  }

  const userId = session.user.id;

  const profile = await Profile.findOne({
    userId,
  })

  if (!profile) {
    return {error: "Profile not found"}
  }

  await Profile.updateOne(
    {userId},
    {
      $push: {
        projects: {
          title,
          description,
          projectUrl,
          githubUrl
        }
      }
    }
  )

  revalidatePath('/profile');

  return {success: true}
}

export async function updateProject(
  id: string,
  updates: {
    title?: string;
    description?: string;
    projectUrl?: string;
    githubUrl?: string;
  }
) {
  const session = await getSession();

  if (!session?.user) {
    return {error: "Unauthorized"};
  }

  await connectDB();

  const userId = session.user.id;

  await Profile.updateOne(
    {
      userId,
      "projects._id": id,
    },
    {
      $set: {
        "projects.$.title": updates.title,
        "projects.$.description": updates.description,
        "projects.$.projectUrl": updates.projectUrl,
        "projects.$.githubUrl": updates.githubUrl,
      }
    }
  )

  revalidatePath('/profile');

  return {success: true};
}

export async function deleteProject(id: string) {
  const session = await getSession();

  if (!session?.user) {
    return {error: "Unauthorized"};
  }

  await connectDB();

  const userId = session.user.id; 

  await Profile.updateOne(
    {userId},
    {
      $pull: {
        projects: {
          _id: id,
        }
      }
    }   
  );
  
  revalidatePath('/profile');

  return {success: true};
}