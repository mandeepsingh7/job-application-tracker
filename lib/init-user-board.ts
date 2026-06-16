import connectDB from "./db";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
    {name: "Wishlist", order: 0},
    {name: "Applied", order: 1},
    {name: "Interviewing", order: 2},
    {name: "Rejected", order: 3},
    {name: "Offered", order: 4},
]

export async function initializeUserBoard(userId: string) {
    try {
        await connectDB();

        // Checking if board already exists 
        const existingBoard = await Board.findOne({
            userId,
            name: "Job Application Tracker"
        });

        if (existingBoard) {
            return existingBoard;
        }

        // If board is not exisiting, then we create it 
        const board = await Board.create({
            name: "Job Application Tracker",
            userId,
            columns: []
        });

        const columns = await Promise.all(
            DEFAULT_COLUMNS.map((column) => 
                Column.create({
                      name: column.name,
                      boardId: board._id,
                      order: column.order,
                      jobApplications: []
                }))
        );

        // These 2 lines will update the board with new column IDs
        board.columns = columns.map((column) => column._id)
        await board.save();

        return board;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}