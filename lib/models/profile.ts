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
    location: string;
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
        },
        degree: {
          type: String,
          required: true,
        },
        specialization: {
          type: String,
          required: true,
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
        }
      }
    ],

    experience: [
      {
        company: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
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
        }
      }
    ],

    projects: [
      {
        title: {
          type: String,
          required: true
        },

        description: {
          type: String,
          required: true
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