from pydantic import BaseModel


class LeaveRequest(BaseModel):
    user_id: str
    chat_id: str