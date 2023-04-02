from pydantic import BaseModel
from typing import List


class Message(BaseModel):
    user_id: str
    nickname: str
    message: str


class GetChatResponse(BaseModel):
    messages: List[Message]
