from fastapi import FastAPI 

from api.routes import router as job_router

app = FastAPI(title="Job Insights")

app.include_router(
  job_router,
  prefix="/job-assistant",
  tags=['Job Assistant']
)

