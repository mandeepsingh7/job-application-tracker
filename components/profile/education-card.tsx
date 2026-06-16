"use client";

import { Profile } from "@/lib/models/models.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CreateEducationDialog from "./create-education-dialog";

import { Education } from "@/lib/models/models.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, GraduationCap, MoreVertical, Trash } from "lucide-react";
import EditEducationDialog from "./edit-education-dialog";
import { useState } from "react";
import { deleteEducation } from "@/lib/actions/profile-education";
import { IoSchoolSharp } from "react-icons/io5";

function SingleEducationCard({ education }: { education: Education }) {
  console.log(education);
  const [isEditing, setIsEditing] = useState(false);
  async function handleDelete() {
    try {
      const result = await deleteEducation(education._id);
      if (result.error) {
        console.error("Failed to delete education entry ", result.error);
      }
    } catch (err) {
      console.error("Failed to delete education entry.");
    }
  }
  return (
    <>
      <Card className="hover:shadow-md">
        <CardContent>
          <div className="flex justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold">
                {education.degree}, {education.specialization}
              </h3>
              <p className="text-xs text-muted-foreground">
                {education.institution}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(education.startDate).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
                &nbsp; - &nbsp;
                {new Date(education.endDate).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-xs text-muted-foreground">{education.grade}</p>
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
      <EditEducationDialog
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        education={education}
      />
    </>
  );
}

export default function EducationCard({ profile }: { profile: Profile }) {
  const educationList = [...profile.education].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
  );
  return (
    <Card className="shadow-md h-[300px] p-0 border-2">
      <CardHeader className="bg-secondary py-2 rounded-t-sm">
        <CardTitle className="text-xl font-semibold flex gap-2 items-center"> 
          <GraduationCap className="size-7"/>
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-1">
        <div className="pb-4">
          <CreateEducationDialog />
        </div>
        <div className="flex flex-col gap-4 pb-4">
          {educationList.map((education, key) => (
            <SingleEducationCard key={key} education={education} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
