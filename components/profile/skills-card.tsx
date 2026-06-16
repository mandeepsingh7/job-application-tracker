"use client";

import { Profile } from "@/lib/models/models.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookMarked, Brain, FolderKanban } from "lucide-react";
import { useState } from "react";
import EditSkillsDialog from "./edit-skills-dialog";
import { Badge } from "../ui/badge";


export default function SkillsCard({
  profile,
}: {
  profile: Profile;
}) {
  const skills = profile.skills?.join(', ') || "";
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Card className="shadow-md h-[300px] p-0 border-2">
      <CardHeader className="bg-secondary py-2 rounded-t-sm">
        <CardTitle className="text-xl font-semibold flex gap-2 items-center">
          <Brain className="size-6"/>
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-1">
        <div className="pb-5">
          <EditSkillsDialog
          isEditing = {isEditing}
          setIsEditing = {setIsEditing}
          skills = {skills}
          />
        </div>
        <div className="flex flex-wrap gap-2 gap-y-3">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="p-3.5 rounded-4xl border-primary">
              {skill}
            </Badge>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}