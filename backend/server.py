from flask import Flask, request, render_template
from flask.ext.sqlalchemy import SQLAlchemy as sa
from sqlalchemy.ext.mutable import MutableList

app = Flask(__name__, template_folder="../frontend/")

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://username:password@localhost:port/DBNAME"

db = sa(app)

max_string_length = 10000

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    x_position = db.Column(db.Integer)
    y_position = db.Column(db.Integer)

    def __init__(self, username, x_position, y_position):
        self.username = username
        self.x_position = x_position
        self.y_position = y_position

    def __repr__(self):
        return f'<User {self.username}>'


class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    users = db.Column(db.List(80), unique=True)
    chat_list = db.Column(MutableList.as_mutable(sa.PickleType),
                                    default=[])

    def __init__(self, username, x_position, y_position):
        self.username = username
        self.x_position = x_position
        self.y_position = y_position

    def __repr__(self):
        return f'<User {self.username}>'


user_book_m2m = db.Table(
    "user_book",
    sa.Column("user_id", sa.ForeignKey(User.id), primary_key=True),
    sa.Column("book_id", sa.ForeignKey(Book.id), primary_key=True),
)

with app.app_context():
    db.create_all()

app.debug = True


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/login")
def index(login: str):
    return render_template("index.html")


if __name__ == "__main__":
    app.run()