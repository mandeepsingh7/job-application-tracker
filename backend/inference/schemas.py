from pydantic import BaseModel 
from typing import List 

class JobInsightOutput(BaseModel):
  cover_letter: str 
  notes: str 