import { maxLength } from "better-auth";
import mongoose, {Schema, Document} from "mongoose";

export interface IProfile extends Document {
  userId: string;

  education: {
    institution: string;
    degree: string;
    specialization: string;
    startDate: Date;
    endDate: Date;
    grade: string;
  }[];

  experience: {
    company: string;
    role: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    description: string;
  }[];

  projects: {
    title: string;
    description: string;
    projectUrl?: string;
    githubUrl?: string;
  }[];

  skills?: string[];
  courses?: string[];

  createdAt: Date;
  updatedAt: Date; 
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      unique: true 
    },

    education: [
      {
        institution: {
          type: String,
          required: true,
          maxLength: 200,
        },
        degree: {
          type: String,
          required: true,
          maxLength: 200
        },
        specialization: {
          type: String,
          required: true,
          maxLength: 200
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        grade: {
          type: String,
          required: true,
          maxLength: 200
        }
      }
    ],

    experience: [
      {
        company: {
          type: String,
          required: true,
          maxLength: 200
        },
        role: {
          type: String,
          required: true,
          maxLength: 200
        },
        location: {
          type: String,
          maxLength: 500
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
          required: true,
          maxLength: 10000
        }
      }
    ],

    projects: [
      {
        title: {
          type: String,
          required: true,
          maxLength: 500
        },

        description: {
          type: String,
          required: true,
          maxLength: 10000
        },

        projectUrl: {
          type: String,
        },

        githubUrl: {
          type: String, 
        }
      }
    ],

    skills: [
      {
        type: String
      }
    ],

    courses: [
      {
        type: String
      }
    ],
  },
  {
    timestamps: true, 
  }
);

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);