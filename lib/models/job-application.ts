import mongoose, {Schema, Document} from "mongoose";

export interface IJobApplication extends Document {
    company: string;
    role: string;
    description: string;
    status?: string;
    appliedDate?: Date;
    lastResponseDate?: Date;
    location?: string;
    columnId: mongoose.Types.ObjectId;
    boardId: mongoose.Types.ObjectId;
    userId: string;
    order: number;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    coverLetter?: string;
    createdAt: Date;
    updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
    {
        company: {
            type: String,
            required: true,
            maxlength: 100,
        },
        role: {
            type: String,
            required: true,
            maxlength: 100
        },
        description: {
            type: String,
            required: true,
            maxlength: 5000
        },
        status: {
            type: String,
            default: 'wishlist'
        },
        appliedDate: {
            type: Date,
        },
        lastResponseDate: {
            type: Date,
        },
        location: {
            type: String,
            maxlength: 100
        },
        columnId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Column',
            index: true
        },
        boardId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Board',
            index: true
        },
        userId: {
            type: String,
            required: true,
            index: true
        },
        order: {
            type: Number,
            required: true,
            default: 0
        },
        notes: {
            type: String,
            maxlength: 5000
        },
        salary: {
            type: String,
            maxlength: 100
        },
        jobUrl: {
            type: String,
            maxlength: 500
        },
        coverLetter: {
            type: String,
            maxlength: 5000
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
