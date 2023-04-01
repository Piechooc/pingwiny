from fastapi import FastAPI
import uuid

from starlette import status
from starlette.responses import JSONResponse

from backend.request.MoveRequest import MoveRequest
from backend.response.MapStateResponse import MapStateResponse, User, UserInChat, ChatCloud
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


@app.put("/move/{moveRequest}")
async def move(moveRequest: MoveRequest):
    users[moveRequest.id]["x"] = moveRequest.x
    users[moveRequest.id]["y"] = moveRequest.y
    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


def get_map_state(user_id):
    MAX_LENGTH_IN_CLOUD = 20
    LAST_ITEM = -1

    users_response = []
    for user_id, user_dict in users.items():
        user = User()
        user.id = user_id
        user.x = user_dict["x"]
        user.y = user_dict["y"]
        user.status = user_dict["status"]
        user.nickname = user_dict["nickname"]
        users_response.append(user)

    chat_clouds = []
    for chat_id, chat_dict in chats.items():
        can_access = True
        if chat_dict["is_private"] and user_id not in chat_dict["user_ids"].values():
            can_access = False

        if can_access:
            text_in_cloud = chat_dict["messages"][LAST_ITEM]["message"][:MAX_LENGTH_IN_CLOUD]
        else:
            text_in_cloud = "..."

        users_in_chat = []
        for user_id, is_active in chat_dict["users_ids"].items():
            user_in_chat = UserInChat()
            user_in_chat.id = user_id
            user_in_chat.isActive = is_active
            users_in_chat.append(user_in_chat)

        chat_cloud = ChatCloud()
        chat_cloud.chat_id = chat_id
        chat_cloud.users_in_chat = users_in_chat
        chat_cloud.can_access = can_access
        chat_cloud.text_in_cloud = text_in_cloud
        chat_clouds.append(chat_cloud)

    map_state_response = MapStateResponse()
    map_state_response.chat_clouds = chat_clouds
    map_state_response.users = users
    return map_state_response


def update_status(user_id, status):
    users[user_id]["status"] = status


def get_chat(user_id, chat_id):
    chat = chats[chat_id]
    if not (chat["is_private"] and user_id not in chat["users_ids"].keys()):
        return chat


def join_chat(user_id, chat_id):
    chat = chats[chat_id]
    if not chat["is_private"]:
        chat["users_ids"][user_id] = True
        chat["active_users_count"] += 1


def create_chat(user_id1, user_id2, is_private):
    if users[user_id2]["status"] != "not disturb":
        new_chat_id = uuid.uuid4()
        chats[new_chat_id] = {"users_ids": {user_id1: True, user_id2: True}, "active_users_count": 2, "messages": [], "is_private": is_private}
        return new_chat_id
    # TODO if not then return error or smth idk


def write_msg(user_id, chat_id, msg):
    chat = chats[chat_id]
    chat["messages"].append({"user-id": user_id, "message": msg})


def leave_chat(user_id, chat_id):
    chat = chats[chat_id]
    chat["users_ids"][user_id] = False
    chat["active_users_count"] -= 1

    if chat["active_users_count"] == 0:
        # delete chat and archive conversation and remove it from current chats
        pass


@app.route('/move', methods=['PUT'])
def move(user_id: int, x: str, y: str):
    return register_move(user_id, x, y)


@app.route('/get_map_state', methods=['GET'])
def get_map_state(user_id: int):
    return get_map_state(user_id)


@app.route('/update_status', methods=['PUT'])
def move(user_id: int, status: str):
    return update_status(user_id, status)


@app.route('/get_chat', methods=['GET'])
def get_chat(user_id: int, chat_id: int):
    return get_chat(user_id, chat_id)


@app.route('/join_chat', methods=['PUT'])
def join_chat(user_id: int, chat_id: int):
    return join_chat(user_id, chat_id)


@app.route('/create_chat', methods=['POST'])
def create_chat(user_id1: int, user_id2: int, is_private: bool):
    return create_chat(user_id1, user_id2, is_private)


@app.route('/write_msg', methods=['PUT'])
def write_msg(user_id: int, chat_id: int, msg: str):
    return write_msg(user_id, chat_id, msg)


@app.route('/leave_chat', methods=['PUT'])
def leave_chat(user_id: int, chat_id: str):
    return leave_chat(user_id, chat_id)


if __name__ == "__main__":
    app.run()
