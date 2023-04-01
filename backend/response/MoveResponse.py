from pydantic import BaseModel


class MoveResponse(BaseModel):
    id: str
    nickname: str
    x: int
    y: int
    status: str
