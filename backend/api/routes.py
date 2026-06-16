from fastapi import APIRouter
from .schemas import JobInsightRequest

from inference.query import generate_job_insights

router = APIRouter()

@router.post('/generate')
def generate(payload: JobInsightRequest):
  result = generate_job_insights(
    payload.profile,
    payload.job
  )

  return result