"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Profile } from "../models";
import { success } from "better-auth";

interface ExperienceData {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export async function addExperience(data: ExperienceData) {
  const session = await getSession();

  if (!session?.user) {
    return {error: "Unauthorized"};
  }

  await connectDB();

  const {
  company,
  role,
  location,
  startDate,
  endDate,
  description,
  } = data;

  if (!company || !role || !startDate || !description){
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
        experience: {
          company,
          role,
          location,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : undefined,
          description
        }
      }
    }
  )

  revalidatePath('/profile');

  return {success: true}
}

export async function updateExperience(
  id: string,
  updates: {
    company?: string;
    role?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
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
      "experience._id": id,
    },
    {
      $set: {
        "experience.$.company": updates.company,
        "experience.$.role": updates.role,
        "experience.$.location": updates.location,
        "experience.$.startDate": updates.startDate,
        "experience.$.endDate": updates.endDate,
        "experience.$.description": updates.description,
      }
    }
  )

  revalidatePath('/profile');

  return {success: true};
}

export async function deleteExperience(id: string) {
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
        experience: {
          _id: id,
        }
      }
    }   
  );
  
  revalidatePath('/profile');

  return {success: true};
}