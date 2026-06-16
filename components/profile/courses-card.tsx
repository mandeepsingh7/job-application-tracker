"use client";

import { Profile } from "@/lib/models/models.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookMarked, Brain, FolderKanban } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import EditCoursesDialog from "./edit-courses-dialog";


export default function CoursesCard({
  profile,
}: {
  profile: Profile;
}) {
  const courses = profile.courses?.join('\n') || "";
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Card className="shadow-md h-[300px] p-0 border-2">
      <CardHeader className="bg-secondary py-2 rounded-t-sm">
        <CardTitle className="text-xl font-semibold flex gap-2 items-center">
          <BookMarked className="size-6"/>
          Courses
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-1">
        <div className="pb-5">
          <EditCoursesDialog
          isEditing = {isEditing}
          setIsEditing = {setIsEditing}
          courses = {courses}
          />
        </div>
        <ul className="pl-5" >
          {profile.courses.map((course => (
            <li key={course}>{course}</li>
          )))}
        </ul>

      </CardContent>
    </Card>
  );
}