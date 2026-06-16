"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Profile } from "../models";
import { success } from "better-auth";

interface EducationData {
  institution: string;
  degree: string;
  specialization: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export async function addEducation(data: EducationData) {
  const session = await getSession();

  if (!session?.user) {
    return {error: "Unauthorized"};
  }

  await connectDB();

  const {
    institution,
    degree,
    specialization,
    startDate,
    endDate,
    grade
  } = data;

  if (!institution || !degree || !specialization || !startDate || !endDate || !grade){
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
        education: {
          institution,
          degree,
          specialization,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          grade,
        }
      }
    }
  )

  revalidatePath('/profile');

  return {success: true}
}

export async function updateEducation(
  id: string,
  updates: {
    institution?: string;
    degree?: string;
    specialization?: string;
    startDate?: string;
    endDate?: string;
    grade?: string;
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
      "education._id": id,
    },
    {
      $set: {
        "education.$.insitution": updates.institution,
        "education.$.degree": updates.degree,
        "education.$.specialization": updates.specialization,
        "education.$.startDate": updates.startDate,
        "education.$.endDate": updates.endDate,
        "education.$.grade": updates.grade,
      }
    }
  )

  revalidatePath('/profile');

  return {success: true};
}

export async function deleteEducation(id: string) {
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
        education: {
          _id: id,
        }
      }
    }   
  );
  
  revalidatePath('/profile');

  return {success: true};
}