import os
import requests
from dotenv import find_dotenv, load_dotenv
from elasticsearch import Elasticsearch

load_dotenv(find_dotenv())

# Get the Elasticsearch host and port from environment variables
es_host = os.getenv("ELASTICSEARCH_HOST", "localhost")
es_port = os.getenv("ELASTICSEARCH_PORT", 9200)

# Initialize the Elasticsearch client
es = Elasticsearch([{"host": es_host, "port": es_port}])

# Example: Create an index
INDEX_NAME = "cybersecurity_reports"
if not es.indices.exists(index=INDEX_NAME):
    es.indices.create(index=INDEX_NAME)

# Example: Insert a document into Elasticsearch
document = {
    "report_id": "1234",
    "threat_level": "high",
    "description": "Detected potential phishing attempt",
}
es.index(index=INDEX_NAME, body=document)

# Example: Search for documents in Elasticsearch
response = es.search(index=INDEX_NAME, body={"query": {"match": {"threat_level": "high"}}})
print(response)

class LogstashSender:
    def __init__(self, logstash_url: str):
        self.logstash_url = logstash_url

    def send(self, event: Dict[str, Any]):
        try:
            response = requests.post(self.logstash_url, json=event)
            response.raise_for_status()
            print(f"Event sent successfully: {event.get('@timestamp', 'N/A')}")
        except requests.exceptions.RequestException as e:
            print(f"Error sending event to Logstash: {e}")

if __name__ == "__main__":
    mapping_file = "ecs_mapping.json"
    logstash_url = "http://localhost:5000"  # This will work if running the script on the host

    mapper = ECSMapper(mapping_file)
    sender = LogstashSender(logstash_url)

    # Example payload
    payload = {
        "user_id": "12345",
        "action": "login",
        "ip_address": "192.168.1.1",
        "timestamp": "2023-05-01T12:34:56Z"
    }

    ecs_event = mapper.map_to_ecs(payload)
    sender.send(ecs_event)