"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Profile } from "../models";
import { success } from "better-auth";

export async function editSkills(skills: string[]) {
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
        skills,
      },
    }
  );

  revalidatePath('/profile');

  return {success: true};
}