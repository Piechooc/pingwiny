from pydantic import BaseModel


class GetChatResponse(BaseModel):
    msg: list