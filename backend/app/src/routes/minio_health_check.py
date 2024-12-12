from fastapi import APIRouter, HTTPException
from src.config import Config 



# Initialize the Config class (which initializes MinIO client)
config = Config()

# Create a new router for health check
health_check_router = APIRouter()

@health_check_router.get("/health/minio")
async def minio_health_check():
    try:
        # Try listing the buckets to check if Minio is reachable
        minio_client = config.get_minio_client()
        buckets = minio_client.list_buckets()
        # If we get here, Minio is working, and we can return a success message
        return {"status": "healthy", "message": f"Minio server is reachable. {len(buckets)} buckets found."}
    except Exception as e :
        # In case of an error, return a failure message
        raise HTTPException(status_code=500, detail=f"Minio health check failed : {str(e)}")
