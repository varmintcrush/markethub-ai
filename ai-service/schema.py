import strawberry

@strawberry.type
class Product:
    id: str
    title: str
    description: str

@strawberry.type
class Query:

    @strawberry.field
    def hello(self) -> str:
        return "MarketHub GraphQL"

schema = strawberry.Schema(
    query=Query
)

