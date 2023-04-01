from pydantic import BaseModel


class MapStateRequest(BaseModel):
    user_id: str
