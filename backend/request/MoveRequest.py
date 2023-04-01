from pydantic import BaseModel


class MoveRequest(BaseModel):
    id: str
    x: int
    y: int
