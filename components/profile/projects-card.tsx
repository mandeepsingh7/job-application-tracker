"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Bookmark, BookMarked, Brain, Edit, FolderKanban, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import { Profile, Project } from "@/lib/models/models.types";
import { deleteProject } from "@/lib/actions/profile-projects";
import EditProjectDialog from "./edit-project-dialog";
import CreateProjectDialog from "./create-project-dialog";
import { FaGithub, FaGithubSquare } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";


function SingleProjectCard({ project }: { project: Project }) {
  const [isEditing, setIsEditing] = useState(false);
  async function handleDelete() {
    try {
      const result = await deleteProject(project._id);
      if (!result.error) {
        toast.success('Successfully deleted the project entry.');
      }
      if (result.error) {
        console.error("Failed to delete project entry ", result.error);
        toast.error("Failed to delete project entry.");
      }
    } catch (err) {
      console.error("Failed to delete project entry.");
      toast.error("Failed to delete project entry.");
    }
  }
  return (
    <>
      <Card className="hover:shadow-md">
        <CardContent>
          <div className="flex justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground whitespace-pre-line">{project.description}</p>

              <div className="flex gap-1">
                
                {project.githubUrl ? <>
                <Button variant="secondary" size="sm" className="mt-2 ">
                  <a href={project.githubUrl} target="_blank" className="inline-flex items-center gap-2">
                    <FaGithub className="h-4 w-4"/> Github
                  </a>
                </Button>
                </> : <></>}

                {project.projectUrl ? <>
                <Button variant="secondary" size="sm" className="mt-2 ">
                  <a href={project.projectUrl} target="_blank" className="inline-flex items-center gap-2">
                   Project Page
                  </a>
                </Button>
                </> : <></>}

              </div>

              {/* <p className="text-xs text-muted-foreground">
                {experience.company}, {experience.location}
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
              <p className="text-xs text-muted-foreground whitespace-pre-line">{experience.description}</p> */}
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
      <EditProjectDialog
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        project={project}
      />
    </>
  );
}

export default function ProjectCard({ profile }: { profile: Profile }) {
  const projectList = profile.projects;
  return (
    <Card className="shadow-md h-[300px] p-0 border-2">
      <CardHeader className="bg-secondary py-2 rounded-t-sm">
        <CardTitle className="text-xl font-semibold flex gap-2 items-center">
          <FolderKanban className="size-6"/> 
          Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-1">
        <div className="pb-4">
          <CreateProjectDialog />
        </div>
        <div className="flex flex-col gap-4 pb-4">
          {projectList.map((project, key) => (
            <SingleProjectCard key={key} project={project} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
