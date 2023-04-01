from pydantic import BaseModel


class JoinChatRequest(BaseModel):
    user_id: int
    chat_id: int