from pydantic import BaseModel


class LeaveRequest(BaseModel):
    user_id: int
    chat_id: int