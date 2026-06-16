"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Profile } from "../models";
import { success } from "better-auth";

export async function editCourses(courses: string[]) {
  const session = await getSession();

  if (!session?.user) {
    return {error: "Unauthorized"};
  }

  await connectDB();

  const userId = session.user.id;

  await Profile.updateOne(
    {userId},
    {
      $set: {
        courses,
      },
    }
  );

  revalidatePath('/profile');

  return {success: true};
}