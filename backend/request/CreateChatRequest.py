from pydantic import BaseModel


class CreateChatRequest(BaseModel):
    user_id1: str
    user_id2: str
    is_private: bool
