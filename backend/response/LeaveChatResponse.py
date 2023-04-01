from pydantic import BaseModel


class LeaveChatResponse(BaseModel):
    active = True