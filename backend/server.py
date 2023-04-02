from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uuid
import openai
import os

from response.ChatUsersResponse import ChatUsersResponse
from request.LeaveChatRequest import LeaveChatRequest
from request.CreateChatRequest import CreateChatRequest
from request.GetChatRequest import GetChatRequest
from request.JoinChatRequest import JoinChatRequest
from request.UpdateStatusRequest import UpdateStatusRequest
from response.CreateChatResponse import CreateChatResponse
from response.GetChatResponse import GetChatResponse, Message
from response.LeaveChatResponse import LeaveChatResponse
from starlette import status
from starlette.responses import JSONResponse
from tagging import tag_chat
from typing import List

from request.MoveRequest import MoveRequest
from request.WriteMessageRequest import WriteMessageRequest
from response.MapStateResponse import MapStateResponse, User, UserInChat, ChatCloud, ArchiveChat
from response.UserLoginResponse import UserLoginResponse

openai.api_key = os.environ.get("OPENAI_API")

users = {}

chats = {}

archive = {"mock_tag": {"Chat mock": {
    "users_ids": {"user_id1": False, "user_id2": False},  # bool represents if user is currently in chat
    "active_users_count": 0,
    "messages": [
        {
            "user_id": "user_id1",
            "nickname": "Jakub",
            "message": "hello",
        },
        {
            "user_id": "user_id2",
            "nickname": "Dawid",
            "message": "hi",
        },
        {
            "user_id": "user_id2",
            "nickname": "Jakub",
            "message": "this is an example of an archive",
        }

    ],
    "is_private": False
}
}}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/cleanup")
async def cleanup():
    global users, chats
    users = {}
    chats = {}

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@app.post("/userlogin/{nickname}")
async def user_login(nickname: str) -> UserLoginResponse:
    new_id = str(uuid.uuid4())
    users[new_id] = {"nickname": nickname, "x": 0, "y": 0, "status": "Available"}
    return UserLoginResponse(id=new_id, nickname=nickname, x=0, y=0, status="Available")


@app.put("/updatestatus")
async def update_status(update_status_request: UpdateStatusRequest) -> JSONResponse:
    users[update_status_request.user_id]["status"] = update_status_request.status
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@app.put("/move")
async def move(move_request: MoveRequest) -> JSONResponse:
    users[move_request.id]["x"] = move_request.x
    users[move_request.id]["y"] = move_request.y
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@app.get("/getmapstate/{user_id}")
async def get_map_state(user_id: str) -> MapStateResponse:
    MAX_LENGTH_IN_CLOUD = 10
    LAST_ITEM = -1

    users_response = []
    for user_identifier, user_dict in users.items():
        user = User(
            id=user_identifier,
            x=user_dict["x"],
            y=user_dict["y"],
            status=user_dict["status"],
            nickname=user_dict["nickname"]
        )
        users_response.append(user)

    chat_clouds = []
    text_in_cloud = ""
    for chat_id, chat_dict in chats.items():
        can_access = True
        if chat_dict["is_private"] and user_id not in chat_dict["users_ids"].keys():
            can_access = False

        if can_access:
            if chat_dict["messages"]:
                text_in_cloud = chat_dict["messages"][LAST_ITEM]["message"][:MAX_LENGTH_IN_CLOUD] + "..."
        else:
            text_in_cloud = "..."

        users_in_chat = []
        cloud_x = 0
        cloud_y = 0
        for user_identifier, is_active in chat_dict["users_ids"].items():
            user_in_chat = UserInChat(
                id=user_identifier,
                isActive=is_active,
            )
            users_in_chat.append(user_in_chat)
            cloud_x = users[user_identifier]["x"]
            cloud_y = users[user_identifier]["y"]

        chat_cloud = ChatCloud(
            chat_id=chat_id,
            users_in_chat=users_in_chat,
            can_access=can_access,
            text_in_cloud=text_in_cloud,
            x=cloud_x,
            y=cloud_y,
        )
        chat_clouds.append(chat_cloud)

    return MapStateResponse(
        chat_clouds=chat_clouds,
        users=users_response,
    )


@app.post("/getchat")
async def get_chat(get_chat_request: GetChatRequest):
    chat = chats[get_chat_request.chat_id]
    if not (chat["is_private"] and get_chat_request.user_id not in chat["users_ids"].keys()):
        messages_response = []
        for message in chat["messages"]:
            messages_response.append(
                Message(
                    user_id=message["user_id"],
                    nickname=message["nickname"],
                    message=message["message"]
                )
            )

        return GetChatResponse(messages=messages_response, id=get_chat_request.chat_id)
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="not ok")


@app.put("/joinchat")
async def join_chat(join_chat_request: JoinChatRequest) -> JSONResponse:
    chat = chats[join_chat_request.chat_id]
    if not chat["is_private"]:
        chat["users_ids"][join_chat_request.user_id] = True
        chat["active_users_count"] += 1
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@app.post("/createchat")
async def create_chat(create_chat_request: CreateChatRequest):
    if create_chat_request.user_id2 in users.keys() and users[create_chat_request.user_id2]["status"] != "Don't disturb":
        new_chat_id = str(uuid.uuid4())
        chats[new_chat_id] = {"users_ids": {create_chat_request.user_id1: True, create_chat_request.user_id2: True},
                              "active_users_count": 2, "messages": [],
                              "is_private": create_chat_request.is_private}
        return CreateChatResponse(chat_id=new_chat_id)
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="not ok")


@app.put("/writemessage")
async def write_msg(write_message_request: WriteMessageRequest) -> JSONResponse:
    chat = chats[write_message_request.chat_id]
    chat["messages"].append(
        {
            "user_id": write_message_request.user_id,
            "nickname": write_message_request.nickname,
            "message": write_message_request.message,
        })
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


def merge_messages(chat_id: str):
    chat = ""
    for message_data in chats[chat_id]["messages"]:
        chat += message_data["message"] + '\n'
    return chat


@app.put("/leavechat")
def leave_chat(leave_request: LeaveChatRequest) -> LeaveChatResponse:
    user_id, chat_id = leave_request.user_id, leave_request.chat_id
    chat = chats[chat_id]
    chat["users_ids"][user_id] = False
    chat["active_users_count"] -= 1

    if chat["active_users_count"] == 0:
        # delete chat and archive conversation and remove it from current chats
        chat_messages = merge_messages(chat_id)
        tag = tag_chat(chat_messages)
        tagged_chats = archive.get(tag, dict())
        tagged_chats[chat_id] = chat
        archive[tag] = tagged_chats
        chats.pop(chat_id)
        return LeaveChatResponse(active=False)
    return LeaveChatResponse(active=True)


@app.get("/chatusers/{user_id}")
async def user_login(user_id: str):
    for chat_id in chats.keys():
        if user_id in chats[chat_id]["users_ids"] and chats[chat_id]["users_ids"][user_id]:
            return ChatUsersResponse(chat_id=chat_id)
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="not ok")


@app.get("/archive/{user_id}")
async def get_archive_chats(user_id: str) -> List[ArchiveChat]:
    archive_chats = []

    for tag, chats in archive.items():
        for chat_id, chat in chats.items():
            if not (chat["is_private"] and user_id not in chat["users_ids"].keys()):
                archive_chats.append(
                    ArchiveChat(
                        chat_id=chat_id,
                        tags=[tag]
                    )
                )

    return archive_chats
