from pydantic import BaseModel
from typing import List


class User(BaseModel):
    id: str
    nickname: str
    x: int
    y: int
    status: str


class UserInChat(BaseModel):
    id: str
    isActive: bool


class ChatCloud(BaseModel):
    chat_id: str
    users_in_chat: List[UserInChat]
    can_access: bool
    text_in_cloud: str
    x: int
    y: int


class MapStateResponse(BaseModel):
    users: List[User]
    chat_clouds: List[ChatCloud]
