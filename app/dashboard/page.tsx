import KanbanBoard from "@/components/kanban-board";
import { getSession } from "@/lib/auth/auth"
import connectDB from "@/lib/db";
import { Board, Column } from "@/lib/models";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getBoard(userId: string) {
    "use cache";

    await connectDB();

    const boardDoc = await Board.findOne({
        userId: userId,
        name: "Job Application Tracker"
    }).populate({
        path: 'columns',
        populate: {
            path: 'jobApplications'
        }
    });

    // mongoose doesn't return Json, so we have to convert first(stringify and parse)

    if (!boardDoc) return null;

    const board = JSON.parse(JSON.stringify(boardDoc));

    return board;
}

async function DashboardPage() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/sign-in");
    }

    const board = await getBoard(session?.user.id ?? "");

    return (
        <div className="min-h-[calc(100vh-62px)]">
            <div className="flex flex-col gap-4 items-center p-6 mx-auto">
                <div className="flex justify-center pb-5">
                    <h1 className="text-3xl font-semibold">{board.name}</h1>
                </div>
                <KanbanBoard userId={session.user.id} board={board}/>
            </div>
        </div>
    );
}

// Suspense is basically there so that we have something to display while the Uncached data is being loaded

export default async function Dashboard() {
    return (
        <Suspense fallback={
        <div className="flex justify-center items-center ">
            <p className="text-xl">Loading...</p>
        </div>
        }> 
            <DashboardPage />
        </Suspense>
    );
}