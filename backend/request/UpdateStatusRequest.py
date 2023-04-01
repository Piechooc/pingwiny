from pydantic import BaseModel


class UpdateStatusRequest(BaseModel):
    user_id: str
    status: str
