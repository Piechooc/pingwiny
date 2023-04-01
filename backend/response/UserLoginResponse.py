from pydantic import BaseModel


class UserLoginResponse(BaseModel):
    id: str
    nickname: str
    x: int
    y: int
    status: str