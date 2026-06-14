from fastapi import FastAPI
from pydantic import BaseModel

from chroma_client import collection
from embedding import model

from strawberry.fastapi import GraphQLRouter
from schema import schema

app = FastAPI()

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")


class SearchRequest(BaseModel):
    query: str


@app.get("/")
def home():
    return {
        "service": "AI Service",
        "status": "running"
    }


@app.post("/index-product")
def index_product(product: dict):

    text = (
        f"{product['title']} "
        f"{product['description']}"
    )

    embedding = model.encode(text).tolist()

    collection.add(
        ids=[product["id"]],
        documents=[text],
        embeddings=[embedding],
        metadatas=[
            {
                "title": product["title"]
            }
        ]
    )

    return {
        "message": "Product indexed successfully"
    }


@app.post("/search")
def search(request: SearchRequest):

    query_embedding = (
        model.encode(request.query)
        .tolist()
    )

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )

    documents = results.get(
        "documents",
        [[]]
    )[0]

    if not documents:
        return {
            "success": False,
            "message": "No matching products found."
        }

    recommendations = []

    for doc in documents:
        recommendations.append(doc)

    return {
        "success": True,
        "query": request.query,
        "message": f"Found {len(recommendations)} relevant products.",
        "recommendations": recommendations,
        "top_match": recommendations[0]
    }