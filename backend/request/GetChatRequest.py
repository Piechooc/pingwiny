from pydantic import BaseModel


class GetChatRequest(BaseModel):
    user_id: int
    chat_id: int