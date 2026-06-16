"use client";

import { Column, JobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import {
  Edit,
  Edit3,
  EditIcon,
  ExternalLink,
  MoreVertical,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { getSession } from "@/lib/auth/auth";
import { deleteJobApplication, updateJobApplication } from "@/lib/actions/job-applications";
import { useState } from "react";
import EditJobApplicationDialog from "./edit-job-dialog";

export default function JobApplicationCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {

  async function handleDelete() {
    try {
      const result = await deleteJobApplication(job._id);

      if (result.error) {
        console.error("Failed to delete job application ", result.error);
      }
    } catch (err) {
      console.error('Failed to delete job application. ', err)
    }
  }

  async function handleMove(newColumnId: string) {
    try {
      const result = await updateJobApplication(job._id, {
        columnId: newColumnId
      });
    } catch (err) {
      console.error('Failed to move job application. ', err)
    }
  }

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
    <Card className="hover:shadow-2xl">
      <CardContent>
        <div className="flex justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold">{job.role}</h3>
            <p className="text-xs text-muted-foreground">{job.company}</p>
            {job.location && (
              <p className="text-xs text-muted-foreground">{job.location}</p>
            )}
            {job.appliedDate && (
              <p className="text-xs text-muted-foreground">
                Applied Date:{" "}
                {new Date(job.appliedDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
            {job.lastResponseDate && (
              <p className="text-xs text-muted-foreground">
                Last Response Date:{" "}
                {new Date(job.lastResponseDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
            <div className="pt-2">
              {job.jobUrl && (
                <a target="_blank" href={job.jobUrl}>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-xs">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setIsEditing(true)} className="data-[highlighted]:bg-red-200 text-xs">
                  <Edit />
                  Edit
                </DropdownMenuItem >
                {columns.length > 1 && (
                  <>
                    {columns
                      .filter((col) => col._id !== job.columnId)
                      .map((column, key) => (
                        <DropdownMenuItem key={key} onClick={() => handleMove(column._id)}
                        className="data-[highlighted]:bg-primary/80 data-[highlighted]:text-primary-foreground text-xs">
                          Move to {column.name}
                        </DropdownMenuItem>
                      ))}
                  </>
                )}
                <DropdownMenuItem
                onClick={() => handleDelete()}
                className="data-[highlighted]:bg-red-200 text-red-700 text-xs">
                  <Trash />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>

    <EditJobApplicationDialog 
    isEditing = {isEditing}
    setIsEditing = {setIsEditing}
    job= {job}
    />
    </>
  );
}


