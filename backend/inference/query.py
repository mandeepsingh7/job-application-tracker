from dotenv import load_dotenv 
from langchain_openai import ChatOpenAI 
from .prompts import JOB_ANALYSIS_PROMPT
from .schemas import JobInsightOutput
from .config import LLM_MODEL

load_dotenv()

def generate_job_insights(
    profile: dict,
    job: dict
):
  llm = ChatOpenAI(model=LLM_MODEL)

  structured_llm = llm.with_structured_output(
    JobInsightOutput
  )

  prompt = JOB_ANALYSIS_PROMPT.format(
    profile = profile,
    job = job 
  )

  result = structured_llm.invoke(prompt)

  return result.model_dump()