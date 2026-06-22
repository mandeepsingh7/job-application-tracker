"use client";

import { Experience, Profile } from "@/lib/models/models.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { BriefcaseBusiness, Edit, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import { deleteExperience } from "@/lib/actions/profile-experience";
import EditExperienceDialog from "./edit-experience-dialog";
import CreateExperienceDialog from "./create-experience-dialog";
import { toast } from "sonner";

function SingleExperienceCard({ experience }: { experience: Experience }) {
  const [isEditing, setIsEditing] = useState(false);
  async function handleDelete() {
    try {
      const result = await deleteExperience(experience._id);
      if (!result.error) {
        toast.success('Successfully deleted the experience entry.');
      }
      if (result.error) {
        console.error("Failed to delete experience entry ", result.error);
        toast.error("Failed to delete experience entry.");
      }
    } catch (err) {
      console.error("Failed to delete experience entry.");
      toast.error("Failed to delete experience entry.");
    }
  }
  return (
    <>
      <Card className="hover:shadow-md">
        <CardContent>
          <div className="flex justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold">
                {experience.role}
              </h3>
              <p className="text-xs text-muted-foreground">
                {experience.company}{experience.location ? <>, {experience.location}</>: <></>}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(experience.startDate).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
                &nbsp; - &nbsp;
                {experience.endDate ? <>
                {new Date(experience.endDate).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
                </> : "Present"}
              </p>
              <p className="text-xs text-muted-foreground whitespace-pre-line">{experience.description}</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-xs">
                    <MoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="data-[highlighted]:bg-red-200 text-xs"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="data-[highlighted]:bg-red-200 text-red-700 text-xs" onClick={() => handleDelete()}>
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
      <EditExperienceDialog
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        experience={experience}
      />
    </>
  );
}

export default function ExperienceCard({ profile }: { profile: Profile }) {
  const experienceList = [...profile.experience].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );
  return (
    <Card className="shadow-md h-[300px] p-0 border-2">
      <CardHeader className="bg-secondary py-2 rounded-t-sm">
        <CardTitle className="text-xl font-semibold flex gap-2 items-center">
          <BriefcaseBusiness className="size-6" />
          Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-1">
        <div className="pb-4">
          <CreateExperienceDialog />
        </div>
        <div className="flex flex-col gap-4 pb-4">
          {experienceList.map((experience, key) => (
            <SingleExperienceCard key={key} experience={experience} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
