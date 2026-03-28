from fastapi import FastAPI

app = FastAPI(title="ProjectIQ API")


@app.get("/")
def root():
    return {"message": "ProjectIQ API running"}


@app.get("/health")
def health():
    return {"status": "ok"}
