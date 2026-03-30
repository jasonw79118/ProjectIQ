from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ProjectIQ API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://jasonw79118.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary in-memory lead store for local testing.
# Replace with a real database in the next phase.
LEADS = [
    {
        "id": 1,
        "first_name": "Sample",
        "last_name": "Lead",
        "phone": "555-0100",
        "email": "sample@example.com",
        "property_address": "123 Demo St",
        "city": "Amarillo",
        "state": "TX",
        "zip": "79101",
        "status": "New",
        "notes": "Test record so the leads page has data.",
    }
]


@app.get("/")
def root():
    return {"message": "ProjectIQ API running"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/leads")
def get_leads():
    return LEADS


@app.post("/leads")
def create_lead(payload: dict):
    new_id = max((lead["id"] for lead in LEADS), default=0) + 1
    lead = {
        "id": new_id,
        "first_name": payload.get("first_name", ""),
        "last_name": payload.get("last_name", ""),
        "phone": payload.get("phone", ""),
        "email": payload.get("email", ""),
        "property_address": payload.get("property_address", ""),
        "city": payload.get("city", ""),
        "state": payload.get("state", ""),
        "zip": payload.get("zip", ""),
        "status": payload.get("status", "New"),
        "notes": payload.get("notes", ""),
    }
    LEADS.append(lead)
    return lead
