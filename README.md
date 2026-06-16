# AI Powered Job Application Tracker 

A full stack job application management platform that helps users organize job applications and generate AI assisted cover letters and preparation notes about job application

## Live Demo

https://job-tracker.mandeeps.in

## Features
- User authentication and profile management
- Job Application Tracking 
- AI generated cover letters and preparation notes
- Persistent storage with MongoDB
- Responsive Next.js frontend
- FastAPI AI backend 

## Architecture

### Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- Better Auth

### Backend:
- FastAPI
- OpenAI
- LangChain

### Database:
- MongoDB
- Mongoose

### Deployment:
- Vercel (Frontend)
- AWS EC2 (Backend)

## Workflow 
1. Users authenticate using Better Auth. 
2. On Profile Page, users can add Education, Experience, Projects, Skills, Courses details, which serve as context for AI generated insights. 
3. Job applications are organized using a Kanban-style workflow. Each application belongs to a column (Wishlist, Applied, Interviewing, Rejected, or Offered), with columns grouped under a user-specific board.
4. Application and profile data are persisted in MongoDB using a hierarchical data model: 
Board → Columns → Job Applications
5. When a new job application is created, the Next.js frontend sends the job details and user profile information to a FastAPI backend.
6. The FastAPI service invokes OpenAI to generate job-specific insights, including a personalized cover letter and preparation notes.
7. Generated content is persisted in MongoDB and linked to the corresponding job application.
8. Users can review, edit, and manage job application data through dashboard. 