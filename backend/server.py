from flask import Flask
from fastapi import FastAPI
import uuid

from backend.response.UserLoginResponse import UserLoginResponse

app = Flask(__name__, template_folder="../frontend/")


users = {
    "user_id1_mock": {
        "nickname": "mock",
        "x": 0,
        "y": 0,
        "status": "available"
        },
}
chats = {
    "chat_id1_mock": {
        "users_ids": [],
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


def register_move(user_id, x, y):
    users[user_id]["x"] = x
    users[user_id]["y"] = y


def get_map_state(user_id):
    # TODO get list of all users and list of all current chats as per whiteboard
    # for chat_id, chat_dict in chats.items():
    #     print(key)
    #     print(value)
    chmurki = {
        [
            {
                "chat_id": 1,
                "user_ids": [1, 2, 3],
                "can_access": False,
                "tekst_do_chmurki": "tekst"
            }
        ]
    }
    map_state = {
        "users": users,
        "chats": {},
    }
    pass


def update_status(user_id, status):
    users[user_id]["status"] = status


def get_chat(user_id, chat_id):
    # TODO return chat contents if user can access it
    pass


def join_chat(user_id, chat_id):
    # TODO add user to chat if its not private
    pass


def create_chat(user_id1, user_id2, is_private):
    # TODO create chat is user2 is not on not disturb or already busy
    pass


def write_msg(user_id, chat_id):
    # TODO write message to chat is user is part of it
    try:
        user_ids = chats[chat_id]["user_ids"]

    except:
        print("error")
        return "ERROR"
    pass


if __name__ == '__main__':
    x = 3
    print(write_msg(3, 5))

def leave_chat(user_id, chat_id):
    # TODO remove user from chat, if he is the last one, then archivize conversation and remove it from current chats
    pass


@app.route('/login', methods=['POST'])
def login(login: str):
    return add_user(login)


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
def write_msg(user_id: int, chat_id: str):
    return write_msg(user_id, chat_id)


@app.route('/leave_chat', methods=['PUT'])
def leave_chat(user_id: int, chat_id: str):
    return leave_chat(user_id, chat_id)


# if __name__ == "__main__":
#     app.run()
