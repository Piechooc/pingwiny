from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uuid
import openai
import os

from request.LeaveChatRequest import LeaveChatRequest
from request.CreateChatRequest import CreateChatRequest
from request.GetChatRequest import GetChatRequest
from request.JoinChatRequest import JoinChatRequest
from request.UpdateStatusRequest import UpdateStatusRequest
from response.CreateChatResponse import CreateChatResponse
from response.GetChatResponse import GetChatResponse
from response.LeaveChatResponse import LeaveChatResponse
from starlette import status
from starlette.responses import JSONResponse
from tagging import tag_chat

from request.MoveRequest import MoveRequest
from request.WriteMessageRequest import WriteMessageRequest
from response.MapStateResponse import MapStateResponse, User, UserInChat, ChatCloud
from response.UserLoginResponse import UserLoginResponse

openai.api_key = os.environ.get("OPENAI_API")

users = {"user_id1_mock": {"nickname": "mock", "x": 0, "y": 0, "status": "available"}}
chats = {
    "chat_id1_mock": {
        "users_ids": {"user-id": True, "user-id2": True},  # bool represents if user is currently in chat
        "active_users_count": 2,
        "messages": [
            {
                "user-id": 1,
                "message": "hello",
            },
            {
                "user-id": 2,
                "message": "hi",
            }

        ],
        "is_private": False
    },
}

archive = {}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/userlogin/{nickname}")
async def user_login(nickname: str) -> UserLoginResponse:
    new_id = str(uuid.uuid4())
    users[new_id] = {"nickname": nickname, "x": 0, "y": 0}
    return UserLoginResponse(id=new_id, nickname=nickname, x=0, y=0, status="available")


@app.put("/updatestatus/{updateStatusRequest}")
async def update_status(update_status_request: UpdateStatusRequest) -> JSONResponse:
    users[update_status_request.user_id]["status"] = update_status_request.status
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@app.put("/move/{moveRequest}")
async def move(move_request: MoveRequest) -> JSONResponse:
    users[move_request.id]["x"] = move_request.x
    users[move_request.id]["y"] = move_request.y
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@app.get("/getmapstate/{userId}")
async def get_map_state(user_id) -> MapStateResponse:
    MAX_LENGTH_IN_CLOUD = 10
    LAST_ITEM = -1

    users_response = []
    for user_id, user_dict in users.items():
        user = User(
            id=user_id,
            x=user_dict["x"],
            y=user_dict["y"],
            status=user_dict["status"],
            nickname=user_dict["nickname"]
        )
        users_response.append(user)

    chat_clouds = []
    for chat_id, chat_dict in chats.items():
        can_access = True
        if chat_dict["is_private"] and user_id not in chat_dict["user_ids"].values():
            can_access = False

        if can_access:
            text_in_cloud = chat_dict["messages"][LAST_ITEM]["message"][:MAX_LENGTH_IN_CLOUD] + "..."
        else:
            text_in_cloud = "..."

        users_in_chat = []
        cloud_x = 0
        cloud_y = 0
        for user_id, is_active in chat_dict["users_ids"].items():
            user_in_chat = UserInChat(
                id=user_id,
                isActive=is_active,
            )
            users_in_chat.append(user_in_chat)
            cloud_x = users[user_id]["x"]
            cloud_y = users[user_id]["y"]

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
        users=users,
    )


@app.get("/getchat/{getChatRequest}")
async def get_chat(get_chat_request: GetChatRequest):
    chat = chats[get_chat_request.chat_id]
    if not (chat["is_private"] and get_chat_request.user_id not in chat["users_ids"].keys()):
        return GetChatResponse(msg=chat["messages"])
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="not ok")


@app.put("/joinchat/{joinChatRequest}")
async def join_chat(join_chat_request: JoinChatRequest) -> JSONResponse:
    chat = chats[join_chat_request.chat_id]
    if not chat["is_private"]:
        chat["users_ids"][join_chat_request.user_id] = True
        chat["active_users_count"] += 1
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@app.post("/createchat/{createChatRequest}")
async def create_chat(create_chat_request: CreateChatRequest):
    if users[create_chat_request.user_id2]["status"] != "not disturb":
        new_chat_id = uuid.uuid4()
        chats[new_chat_id] = {"users_ids": {create_chat_request.user_id1: True, create_chat_request.user_id2: True},
                              "active_users_count": 2, "messages": [],
                              "is_private": create_chat_request.is_private}
        return CreateChatResponse(chat_id=new_chat_id)
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="not ok")


@app.put("/writemessage/{writeMessageRequest}")
async def write_msg(write_message_request: WriteMessageRequest) -> JSONResponse:
    chat = chats[write_message_request.chat_id]
    chat["messages"].append({"user-id": write_message_request.user_id, "message": write_message_request.message})
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


def merge_messages(chat_id: str):
    chat = ""
    for message_data in chats[chat_id]["messages"]:
        chat += message_data["message"] + '\n'
    return chat


@app.put("/leavechat/{leaveChatRequest}")
def leave_chat(leave_request: LeaveChatRequest) -> LeaveChatResponse:
    user_id, chat_id = leave_request.user_id, leave_request.chat_id
    chat = chats[chat_id]
    chat["users_ids"][user_id] = False
    chat["active_users_count"] -= 1

    if chat["active_users_count"] == 0:
        # delete chat and archive conversation and remove it from current chats
        tag = tag_chat(chat)
        tagged_chats = archive.get(tag, dict())
        tagged_chats[chat_id] = chat
        archive[tag] = tagged_chats
        chats.pop(chat_id)
        return LeaveChatResponse(active=False)
    return LeaveChatResponse(active=True)
