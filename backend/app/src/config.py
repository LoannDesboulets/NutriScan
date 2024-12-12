# Load environment variables from the .env file
from dotenv import load_dotenv
import os
from minio   import Minio
from urllib3 import PoolManager

load_dotenv()

# Define a custom PoolManager to prepend '/api/' to the URL
class CustomHTTPClient(PoolManager):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def urlopen(self, method, url, *args, **kwargs):
        endpoint = os.getenv('MINIO_URL')
        # Add '/api/' prefix to the URL if it's localhost
        print(url)
        print(endpoint)
        if url.startswith(f'http://{endpoint}') or url.startswith(f'https://{endpoint}'):
            url = url.replace(f'://{endpoint}', f'://{endpoint}/api', 1)
            print(url)
        return super().urlopen(method, url, *args, **kwargs)

# Define a custom config to connect to Minio
class Config:
    """Base configuration class with common settings."""

    MINIO_URL     = os.getenv('MINIO_URL')
    ACCESS_KEY    = os.getenv('ACCESS_KEY')
    SECRET_KEY    = os.getenv('SECRET_KEY')
    CA_CERTS_PATH = os.getenv('CA_CERTS_PATH')

    def __init__(self):

        self.MINIO_CLIENT = Minio(
            endpoint    = self.MINIO_URL,
            access_key  = self.ACCESS_KEY,   
            secret_key  = self.SECRET_KEY,
            secure      = True,
            http_client = CustomHTTPClient(
                            cert_reqs = 'CERT_REQUIRED',
                            ca_certs  = self.CA_CERTS_PATH
                        )
        )

    def get_minio_client(self):
        return self.MINIO_CLIENT