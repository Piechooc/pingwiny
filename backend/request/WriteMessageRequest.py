from pydantic import BaseModel


class WriteMessageRequest(BaseModel):
    user_id: str
    nickname: str
    chat_id: str
    message: str
