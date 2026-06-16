import connectDB from "./db";
import { Profile } from "./models";


export async function initializeUserProfile(userId: string) {
  try {
    await connectDB();

    const existingProfile = await Profile.findById(userId);

    if (existingProfile) {
      return existingProfile;
    }

    const profile = await Profile.create({
      userId
    });

    return profile;

  } catch(err) {
    console.error(err);
    throw err;
  }
}