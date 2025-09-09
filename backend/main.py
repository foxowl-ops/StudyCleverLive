from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from typing import List, Literal
import uuid

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class DomainCreate(BaseModel):
    name: str
    description: str
    icon: str
    color: str

class Domain(DomainCreate):
    id: str

class Content(BaseModel):
    id: str
    domain_id: str
    type: Literal["article", "video", "news"]
    title: str
    url: str
    description: str

# Helper function to read data from db.json
def read_db():
    with open("db.json", "r") as f:
        return json.load(f)

# Helper function to write data to db.json
def write_db(data):
    with open("db.json", "w") as f:
        json.dump(data, f, indent=2)

@app.get("/")
async def root():
    return {"message": "Welcome to the StudyClever API"}

# Public Endpoints
@app.get("/api/domains", response_model=List[Domain])
async def get_domains():
    db = read_db()
    return db["domains"]

@app.get("/api/domains/{domain_id}")
async def get_domain(domain_id: str):
    db = read_db()
    domain = next((d for d in db["domains"] if d["id"] == domain_id), None)
    if not domain:
        raise HTTPException(status_code=404, detail="Domain not found")
    return domain

@app.get("/api/domains/{domain_id}/content", response_model=List[Content])
async def get_domain_content(domain_id: str):
    db = read_db()
    content = [c for c in db["content"] if c["domain_id"] == domain_id]
    return content

# Admin Endpoints

# Domain Management
@app.post("/api/admin/domains", response_model=Domain)
async def create_domain(domain_data: DomainCreate):
    db = read_db()
    new_domain = domain_data.dict()
    new_domain['id'] = str(uuid.uuid4())
    db["domains"].append(new_domain)
    write_db(db)
    return new_domain

@app.put("/api/admin/domains/{domain_id}", response_model=Domain)
async def update_domain(domain_id: str, updated_domain: Domain):
    db = read_db()
    for i, domain in enumerate(db["domains"]):
        if domain["id"] == domain_id:
            db["domains"][i] = updated_domain.dict()
            write_db(db)
            return updated_domain
    raise HTTPException(status_code=404, detail="Domain not found")

@app.delete("/api/admin/domains/{domain_id}")
async def delete_domain(domain_id: str):
    db = read_db()
    domain_to_delete = next((d for d in db["domains"] if d["id"] == domain_id), None)
    if not domain_to_delete:
        raise HTTPException(status_code=404, detail="Domain not found")
    
    # Delete domain and its associated content
    db["domains"] = [d for d in db["domains"] if d["id"] != domain_id]
    db["content"] = [c for c in db["content"] if c["domain_id"] != domain_id]
    
    write_db(db)
    return {"message": "Domain and associated content deleted successfully"}

# Content Management
@app.post("/api/admin/content", response_model=Content)
async def create_content(content: Content):
    db = read_db()
    new_content = content.dict()
    new_content["id"] = str(uuid.uuid4())
    db["content"].append(new_content)
    write_db(db)
    return new_content

@app.put("/api/admin/content/{content_id}", response_model=Content)
async def update_content(content_id: str, updated_content: Content):
    db = read_db()
    for i, content in enumerate(db["content"]):
        if content["id"] == content_id:
            db["content"][i] = updated_content.dict()
            write_db(db)
            return updated_content
    raise HTTPException(status_code=404, detail="Content not found")

@app.delete("/api/admin/content/{content_id}")
async def delete_content(content_id: str):
    db = read_db()
    content_to_delete = next((c for c in db["content"] if c["id"] == content_id), None)
    if not content_to_delete:
        raise HTTPException(status_code=404, detail="Content not found")
    db["content"] = [c for c in db["content"] if c["id"] != content_id]
    write_db(db)
    return {"message": "Content deleted successfully"}
