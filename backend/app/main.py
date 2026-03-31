from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / 'projectiq.db'

app = FastAPI(title='ProjectIQ API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173', 'http://127.0.0.1:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            phone TEXT DEFAULT '',
            email TEXT DEFAULT '',
            property_address TEXT DEFAULT '',
            city TEXT DEFAULT '',
            state TEXT DEFAULT '',
            zip TEXT DEFAULT '',
            source TEXT DEFAULT '',
            status TEXT DEFAULT 'New Lead',
            notes TEXT DEFAULT '',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
        '''
    )
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            display_name TEXT NOT NULL,
            primary_phone TEXT DEFAULT '',
            primary_email TEXT DEFAULT '',
            mailing_address TEXT DEFAULT '',
            city TEXT DEFAULT '',
            state TEXT DEFAULT '',
            zip TEXT DEFAULT '',
            source_lead_id INTEGER,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
        '''
    )
    conn.commit()

    lead_count = cur.execute('SELECT COUNT(*) AS count FROM leads').fetchone()['count']
    if lead_count == 0:
        cur.execute(
            '''
            INSERT INTO leads (first_name, last_name, phone, email, property_address, city, state, zip, source, status, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''',
            (
                'Sample',
                'Homeowner',
                '806-555-0111',
                'sample@example.com',
                '123 Main St',
                'Amarillo',
                'TX',
                '79101',
                'Website',
                'Inspection Scheduled',
                'Seeded lead so the page is not empty on first load.'
            )
        )
        conn.commit()
    conn.close()


@app.on_event('startup')
def on_startup():
    init_db()


class LeadCreate(BaseModel):
    first_name: str
    last_name: str
    phone: Optional[str] = ''
    email: Optional[str] = ''
    property_address: Optional[str] = ''
    city: Optional[str] = ''
    state: Optional[str] = ''
    zip: Optional[str] = ''
    source: Optional[str] = ''
    status: Optional[str] = 'New Lead'
    notes: Optional[str] = ''


class CustomerCreate(BaseModel):
    display_name: str
    primary_phone: Optional[str] = ''
    primary_email: Optional[str] = ''
    mailing_address: Optional[str] = ''
    city: Optional[str] = ''
    state: Optional[str] = ''
    zip: Optional[str] = ''
    source_lead_id: Optional[int] = None


@app.get('/')
def root():
    return {'message': 'ProjectIQ API running'}


@app.get('/health')
def health():
    return {'status': 'ok'}


@app.get('/dashboard/summary')
def dashboard_summary():
    conn = get_conn()
    cur = conn.cursor()
    leads = cur.execute('SELECT COUNT(*) AS count FROM leads').fetchone()['count']
    customers = cur.execute('SELECT COUNT(*) AS count FROM customers').fetchone()['count']
    conn.close()
    return {'open_leads': leads, 'customers': customers, 'active_jobs': 0, 'open_claims': 0}


@app.get('/leads')
def list_leads():
    conn = get_conn()
    rows = conn.execute('SELECT * FROM leads ORDER BY id DESC').fetchall()
    conn.close()
    return [dict(row) for row in rows]


@app.post('/leads')
def create_lead(lead: LeadCreate):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        '''
        INSERT INTO leads (first_name, last_name, phone, email, property_address, city, state, zip, source, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''',
        (
            lead.first_name,
            lead.last_name,
            lead.phone,
            lead.email,
            lead.property_address,
            lead.city,
            lead.state,
            lead.zip,
            lead.source,
            lead.status,
            lead.notes,
        ),
    )
    conn.commit()
    lead_id = cur.lastrowid
    row = cur.execute('SELECT * FROM leads WHERE id = ?', (lead_id,)).fetchone()
    conn.close()
    return dict(row)


@app.post('/leads/{lead_id}/convert')
def convert_lead(lead_id: int):
    conn = get_conn()
    cur = conn.cursor()
    lead = cur.execute('SELECT * FROM leads WHERE id = ?', (lead_id,)).fetchone()
    if not lead:
        conn.close()
        raise HTTPException(status_code=404, detail='Lead not found')

    display_name = f"{lead['first_name']} {lead['last_name']}".strip()
    cur.execute(
        '''
        INSERT INTO customers (display_name, primary_phone, primary_email, mailing_address, city, state, zip, source_lead_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''',
        (
            display_name,
            lead['phone'],
            lead['email'],
            lead['property_address'],
            lead['city'],
            lead['state'],
            lead['zip'],
            lead['id'],
        ),
    )
    cur.execute('UPDATE leads SET status = ? WHERE id = ?', ('Converted', lead_id))
    conn.commit()
    customer_id = cur.lastrowid
    customer = cur.execute('SELECT * FROM customers WHERE id = ?', (customer_id,)).fetchone()
    conn.close()
    return {'message': 'Lead converted', 'customer': dict(customer)}


@app.get('/customers')
def list_customers():
    conn = get_conn()
    rows = conn.execute('SELECT * FROM customers ORDER BY id DESC').fetchall()
    conn.close()
    return [dict(row) for row in rows]


@app.post('/customers')
def create_customer(customer: CustomerCreate):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        '''
        INSERT INTO customers (display_name, primary_phone, primary_email, mailing_address, city, state, zip, source_lead_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''',
        (
            customer.display_name,
            customer.primary_phone,
            customer.primary_email,
            customer.mailing_address,
            customer.city,
            customer.state,
            customer.zip,
            customer.source_lead_id,
        ),
    )
    conn.commit()
    customer_id = cur.lastrowid
    row = cur.execute('SELECT * FROM customers WHERE id = ?', (customer_id,)).fetchone()
    conn.close()
    return dict(row)
