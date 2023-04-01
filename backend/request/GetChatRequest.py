from pydantic import BaseModel


class GetChatRequest(BaseModel):
    user_id: str
    chat_id: str