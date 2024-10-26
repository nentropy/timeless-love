import os
import json
from google.cloud import secretmanager
from dotenv import load_dotenv

def load_secrets():
    # Load variables from cloud.env file
    load_dotenv('cloud.env')

    # Required variables
    required_vars = ['PROJECT_ID', 'LOCATION']
    for var in required_vars:
        if var not in os.environ:
            raise ValueError(f"Missing required environment variable: {var}")

    project_id = os.environ['PROJECT_ID']
    location = os.environ['LOCATION']
    location2 = os.environ["LOCATION2"]

    # Initialize the Secret Manager client
    client = secretmanager.SecretManagerServiceClient()

    # Function to access secret
    def access_secret(secret_id):
        name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
        response = client.access_secret_version(request={"name": name})
        return response.payload.data.decode("UTF-8")

    # Load secrets specified in SECRETS environment variable
    secrets_to_load = os.environ.get('SECRETS', '').split(',')
    for secret_id in secrets_to_load:
        if secret_id:
            secret_value = access_secret(secret_id.strip())
            os.environ[secret_id] = secret_value
            print(f"Loaded secret: {secret_id}")

    print("All specified secrets have been loaded.")

if __name__ == "__main__":
    load_secrets()

   
    # DO NOT print out the actual secret values in a real application