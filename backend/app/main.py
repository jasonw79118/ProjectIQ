from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from pathlib import Path
import sqlite3

DB_PATH = Path(__file__).resolve().parents[2] / "projectiq.db"

app = FastAPI(title="ProjectIQ API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://127.0.0.1:5173","https://jasonw79118.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def conn():
    c = sqlite3.connect(DB_PATH)
    c.row_factory = sqlite3.Row
    return c

def init_db():
    c = conn()
    c.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            phone TEXT,
            email TEXT,
            property_address TEXT,
            city TEXT,
            state TEXT,
            zip TEXT,
            source TEXT,
            notes TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)
    c.commit()
    c.close()

@app.on_event("startup")
def startup():
    init_db()

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
    notes: Optional[str] = ""

@app.get("/")
def root():
    return {"message":"ProjectIQ API running"}

@app.get("/health")
def health():
    return {"status":"ok"}

@app.get("/leads")
def get_leads():
    c = conn()
    rows = c.execute("SELECT * FROM leads ORDER BY id DESC").fetchall()
    c.close()
    return [dict(r) for r in rows]

@app.post("/leads")
def create_lead(payload: LeadCreate):
    c = conn()
    cur = c.cursor()
    cur.execute(
        "INSERT INTO leads (first_name,last_name,phone,email,property_address,city,state,zip,source,notes) VALUES (?,?,?,?,?,?,?,?,?,?)",
        (payload.first_name.strip(), payload.last_name.strip(), payload.phone or "", payload.email or "", payload.property_address or "", payload.city or "", payload.state or "", payload.zip or "", payload.source or "", payload.notes or "")
    )
    new_id = cur.lastrowid
    c.commit()
    row = c.execute("SELECT * FROM leads WHERE id=?", (new_id,)).fetchone()
    c.close()
    return dict(row)
