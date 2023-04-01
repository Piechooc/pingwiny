from pydantic import BaseModel


class UpdateStatusRequest(BaseModel):
    user_id: int
    status: str
