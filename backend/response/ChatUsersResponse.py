from pydantic import BaseModel


class ChatUsersResponse(BaseModel):
    chat_id: str
