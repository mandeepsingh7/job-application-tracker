import CoursesCard from "@/components/profile/courses-card";
import EducationCard from "@/components/profile/education-card";
import ExperienceCard from "@/components/profile/experience-card";
import ProjectsCard from "@/components/profile/projects-card";
import SkillsCard from "@/components/profile/skills-card";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Profile } from "@/lib/models";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getProfile(userId: string) {
  "use cache";

  await connectDB();

  const profileDoc = await Profile.findOne({
    userId
  });

  const profile = JSON.parse(JSON.stringify(profileDoc));

  return profile; 
}

async function ProfilePage() {
  const session = await getSession();
  
  if (!session?.user) {
    redirect('/sign-in');
  }

  const profile = await getProfile(session?.user.id ?? "");
  return (
    <div className="min-h-[calc(100vh-62px)]">
      <div className="flex flex-col gap-4 items-center p-6 mx-auto">
        <div className="flex justify-center pb-5">
          <h1 className="text-3xl font-semibold">Profile Page</h1>
        </div>
        <div className="w-full flex flex-col gap-10 xl:px-[calc(15vw)] md:px-[calc(10vw)] px-[calc(5vw)]">
          <EducationCard profile={profile}/>
          <ExperienceCard profile={profile}/>
          <ProjectsCard profile={profile}/>
          <SkillsCard profile={profile}/>
          <CoursesCard profile={profile}/>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center ">
          <p className="text-xl">Loading...</p>
        </div>
      }
    >
     <ProfilePage /> 
    </Suspense>
  );
}
