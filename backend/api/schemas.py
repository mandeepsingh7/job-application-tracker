from pydantic import BaseModel

class JobInsightRequest(BaseModel):
  profile: dict 
  job: dict 