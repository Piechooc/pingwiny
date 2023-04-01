from pydantic import BaseModel


class LeaveChatRequest(BaseModel):
    user_id: str
    chat_id: str