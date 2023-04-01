from pydantic import BaseModel


class JoinChatRequest(BaseModel):
    user_id: str
    chat_id: str