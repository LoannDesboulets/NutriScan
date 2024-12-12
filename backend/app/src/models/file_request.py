# models/file_request.py
from pydantic import BaseModel

class FileRequest(BaseModel):
    bucket_name: str
    file_name: str