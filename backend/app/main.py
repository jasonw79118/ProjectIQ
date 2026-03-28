from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="ProjectIQ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LeadCreate(BaseModel):
    first_name: str
    last_name: str
    phone: Optional[str] = ""
    email: Optional[str] = ""
    property_address: Optional[str] = ""
    city: Optional[str] = ""
    state: Optional[str] = ""
    zip: Optional[str] = ""
    source: Optional[str] = ""
    status: Optional[str] = "New Lead"
    notes: Optional[str] = ""

class Lead(LeadCreate):
    id: int
    created_at: str

LEADS = [
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Sample",
        "phone": "555-0101",
        "email": "john@example.com",
        "property_address": "123 Storm Ridge Dr",
        "city": "Amarillo",
        "state": "TX",
        "zip": "79101",
        "source": "Referral",
        "status": "Inspection Scheduled",
        "notes": "Potential hail claim.",
        "created_at": datetime.utcnow().isoformat(),
    }
]

@app.get("/")
def root():
    return {"message": "ProjectIQ API running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/leads")
def list_leads():
    return LEADS

@app.post("/leads")
def create_lead(payload: LeadCreate):
    new_id = max([lead["id"] for lead in LEADS], default=0) + 1
    lead = payload.model_dump()
    lead["id"] = new_id
    lead["created_at"] = datetime.utcnow().isoformat()
    LEADS.insert(0, lead)
    return lead
