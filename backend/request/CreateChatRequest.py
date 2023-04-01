from pydantic import BaseModel


class CreateChatRequest(BaseModel):
    user_id1: int
    user_id2: int
    is_private: bool
