"use client";

import { Board, Column, JobApplication } from "@/lib/models/models.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";
import CreateJobApplicationDialog from "./create-job-dialog";
import JobApplicationCard from "./job-application-card";

interface KanbanBoardProps {
  board: Board;
  userId: string;
}

function KanbanColumn({
  column,
  boardId,
  columns,
}: {
  column: Column;
  boardId: string;
  columns: Column[];
}) { 
  // There are a number of ways we can sort the Job Applications, for now we are choosing order.
  const sortedJobs =
    column.jobApplications?.sort((a, b) => a.order - b.order) || [];
  return (
    <Card className="shadow-md h-[300px] p-0 2xl:w-[400px] lg:w-[400px] xl:w-[350px] sm:w-[500px] md:w-[600px] w-[300px] min-[480px]:w-[400px]">
      <CardHeader className="bg-secondary pb-1.5 pt-1.5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{column.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>random</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-1">
      <div className="flex flex-col gap-5 pt-3 pb-5 px-3">
        {sortedJobs.map((job, key) => (
          <JobApplicationCard
            key={key}
            job={{ ...job, columnId: job.columnId || column._id }}
            columns={columns}
          />
        ))}
      </div>
      </CardContent>
    </Card>
  );
}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const columns = board.columns;
  return (
    <>
      <div className="lg:self-start xl:mx-[10vw] lg:mx-[15vw] pb-5 mx-[20vw]">
        <CreateJobApplicationDialog boardId={board._id} />
      </div>

      <div className="w-full px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
          {columns.map((col, key) => {
            return <KanbanColumn key={key} column={col} boardId={board._id} columns={columns}/>;
          })}
        </div>
      </div>
    </>
  );
}
