from fastapi import FastAPI
from src.routes.minio_routes import minio_router
from src.routes.minio_health_check import health_check_router 
from starlette.middleware.cors import CORSMiddleware

# Create an instance of FastAPI
app = FastAPI(    
    title="Nutriscan",
    version="0.0.1"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; you can restrict this for security
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Define a basic route
@app.get("/")
async def root():
    return {"message": "Welcome to NutriScan Backend!"}

# Health check 
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Include the minio routes in the main FastAPI app
app.include_router(minio_router, prefix="/minio", tags=["minio"])
app.include_router(health_check_router)