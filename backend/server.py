from fastapi import FastAPI
import uuid

from backend.request.CreateChatRequest import CreateChatRequest
from backend.request.GetChatRequest import GetChatRequest
from backend.request.JoinChatRequest import JoinChatRequest
from backend.request.UpdateStatusRequest import UpdateStatusRequest
from backend.response.CreateChatResponse import CreateChatResponse
from backend.response.GetChatResponse import GetChatResponse
from starlette import status
from starlette.responses import JSONResponse

from backend.request.MoveRequest import MoveRequest
from backend.request.WriteMessageRequest import WriteMessageRequest
from backend.response.UserLoginResponse import UserLoginResponse

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

app = FastAPI()


@app.post("/userlogin/{nickname}")
async def user_login(nickname: str) -> UserLoginResponse:
    new_id = uuid.uuid4()
    users[new_id] = {"nickname": nickname, "x": 0, "y": 0}
    return UserLoginResponse(id=new_id, nickname=nickname, x=0, y=0, status="available")


@app.put("/updatestatus")
async def update_status(update_status_request: UpdateStatusRequest):
    users[update_status_request.user_id]["status"] = update_status_request.status
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@app.put("/move/{moveRequest}")
async def move(moveRequest: MoveRequest):
    users[moveRequest.id]["x"] = moveRequest.x
    users[moveRequest.id]["y"] = moveRequest.y
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@app.get("/getchat")
async def get_chat(get_chat_request: GetChatRequest) -> GetChatResponse:
    chat = chats[get_chat_request.chat_id]
    if not (chat["is_private"] and get_chat_request.user_id not in chat["users_ids"].keys()):
        return GetChatResponse(msg=chat["messages"])
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="not ok")


@app.put("/joinchat")
async def join_chat(join_chat_request: JoinChatRequest):
    chat = chats[join_chat_request.chat_id]
    if not chat["is_private"]:
        chat["users_ids"][join_chat_request.user_id] = True
        chat["active_users_count"] += 1
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@app.post("/userlogin")
async def create_chat(create_chat_request: CreateChatRequest) -> CreateChatResponse:
    if users[create_chat_request.user_id2]["status"] != "not disturb":
        new_chat_id = uuid.uuid4()
        chats[new_chat_id] = {"users_ids": {create_chat_request.user_id1: True, create_chat_request.user_id2: True},
                              "active_users_count": 2, "messages": [],
                              "is_private": create_chat_request.is_private}
        return CreateChatResponse(chat_id=new_chat_id)
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="not ok")


@app.put("/writemessage/{writeMessageRequest}")
async def write_msg(writeMessageRequest: WriteMessageRequest):
    chat = chats[writeMessageRequest.chat_id]
    chat["messages"].append({"user-id": writeMessageRequest.user_id, "message": writeMessageRequest.message})
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


def leave_chat(user_id, chat_id):
    chat = chats[chat_id]
    chat["users_ids"][user_id] = False
    chat["active_users_count"] -= 1

    if chat["active_users_count"] == 0:
        # delete chat and archive conversation and remove it from current chats
        pass


@app.route('/get_map_state', methods=['GET'])
def get_map_state(user_id: int):
    return get_map_state(user_id)


@app.route('/write_msg', methods=['PUT'])
def write_msg(user_id: int, chat_id: int, msg: str):
    return write_msg(user_id, chat_id, msg)


@app.route('/leave_chat', methods=['PUT'])
def leave_chat(user_id: int, chat_id: str):
    return leave_chat(user_id, chat_id)


if __name__ == "__main__":
    app.run()
