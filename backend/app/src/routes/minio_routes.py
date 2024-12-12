# routes/minio_routes.py
from fastapi import APIRouter, HTTPException
from src.models.file_request import FileRequest
from src.config import Config
import pickle



# Initialize the Config class (which initializes MinIO client)
config = Config()

minio_router = APIRouter()
@minio_router.post("/files/")
async def get_file(file_request: FileRequest):
    """
    Fetches a file from MinIO storage
    
    :param bucket_name: The bucket where the file is stored
    :param file_name: The name of the file to fetch
    :return: The deserialized Python object (the value of the 'json' key)
    """
    minio_client = config.get_minio_client()  # Access MinIO client from the Config class

    try:
        # Fetch the file from MinIO
        file_object = pickle.loads(
            minio_client.get_object(
                bucket_name = file_request.bucket_name,
                object_name = file_request.file_name
            ).read()
        )

        # Extract the 'json' property
        return file_object.json

    except Exception as e:
        raise HTTPException(status_code=404, detail=f"File not found: {file_request.file_name}")


# Create a new router for listing objects in a bucket
@minio_router.get("/minio/{bucket_name}/objects")
async def list_objects(bucket_name: str):
    try:
        # Try to get the MinIO client
        minio_client = config.get_minio_client()
        
        # List objects in the specified bucket
        objects = minio_client.list_objects(bucket_name)
        
        # Convert the objects to a list of object names or metadata
        object_list = [{"name": obj.object_name} for obj in objects]
        
        # Return the list of objects as a JSON response
        return {"bucket": bucket_name, "objects": object_list}
    
    except Exception as e:
        # In case of an error, return a failure message
        raise HTTPException(status_code=500, detail=f"Failed to list objects in bucket {bucket_name}: {str(e)}")