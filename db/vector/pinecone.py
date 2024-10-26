import os
import json
import pinecone as pc
from openai import OpenAIEmbeddings
import openai
from src.logger import logger 

"""
INIT PINECONE STORE
"""
def init_vector():
    pc.init(api_key=os.getenv("PINECONE_API_KEY"), 
              environment="us-west1-gcp")

    index = pc.Index(api_key=os.getenv("PINECONE_API_KEY"), name="model-eval-reports")
    return index

"""
LOADING AND CHUNKING FOR PINECONE

"""
import bs4
from langchain import hub
from langchain_pinecone import Pinecone
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter


loader = WebBaseLoader(
    web_paths=("https://lilianweng.github.io/posts/2023-06-23-agent/",),
    bs_kwargs=dict(
        parse_only=bs4.SoupStrainer(
            class_=("post-content", "post-title", "post-header")
        )
    ),
)
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)
vectorstore = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())

# Retrieve and generate using the relevant snippets of the blog.
retriever = vectorstore.as_retriever()
prompt = hub.pull("rlm/rag-prompt")


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

rag_chain.invoke("What is Task Decomposition?")  

def vectorize_report(report_data):
    OpenAIEmembeddings = OpenAIEmbeddings()
    
    # Convert report to a single string for embedding
    report_text = json.dumps(report_data)
    response = OpenAIEmembeddings.create(
        input=report_text,
        model="text-embedding-small"  # example model for embeddings
    )
    embedding = response['data'][0]['embedding']
    return embedding



def store_report_vector(report_data, embedding):
    index = init_vector()
    # Create metadata for storing with the vector
    metadata = {
        "model_name": report_data["model_name"],
        "data_profile": report_data["data_profile"],
        "performance_metrics": report_data["performance_metrics"],
        "report summary": report_data["report_summary"]
    }
    logger.info(f"Metadata Uploaded {model_name}")
    index.upsert([(report_data["model_name"], embedding, metadata)])
    print("Report vector stored in vector database.")

