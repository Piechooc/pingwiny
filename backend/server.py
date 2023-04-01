from flask import Flask

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



def get_id():
    # TODO return id, generate it somehow
    pass


def add_user(nickname):
    new_id = get_id()
    users[new_id] = {"nickname": nickname, "x": 0, "y": 0}


def register_move(user_id, x, y):
    users[user_id]["x"] = x
    users[user_id]["y"] = y


def get_map_state(user_id):
    # TODO get list of all users and list of all current chats as per whiteboard
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
    pass


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


if __name__ == "__main__":
    app.run()
