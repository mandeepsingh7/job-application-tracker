// TypeScript types for the interfaces we created: Board, Column, JobApplication

export interface JobApplication {
    _id: string;
    company: string;
    role: string;
    description: string;
    status?: string;
    appliedDate?: Date;
    lastResponseDate?: Date;
    location?: string;
    columnId: string;
    boardId: string;
    userId: string;
    order: number;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    coverLetter?: string;
}

export interface Column {
    _id: string;
    name: string;
    boardId: string;
    order: number;
    jobApplications: JobApplication[]
}

export interface Board {
    _id: string;
    name: string;
    userId: string;
    columns: Column[]
}

export interface Education {
    institution: string;
    degree: string;
    specialization: string;
    startDate: Date;
    endDate: Date;
    grade: string;
    _id: string;
}

export interface Experience {
    company: string;
    role: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    _id: string;
}

export interface Project {
    title: string;
    description: string;
    projectUrl?: string;
    githubUrl?: string;
    _id: string;
}

export interface Profile {
    _id: string;
    userId: string;

    education: Education[];
    experience: Experience[];
    projects: Project[];

    skills: string[];
    courses: string[];
}

