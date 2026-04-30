from flask import Flask
from model import User, db
from flask_login import LoginManager
# from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config["SECRET_KEY"] = "some-secret-key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# db = SQLAlchemy(app)
db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.login_message = "Please log in to access this page"
login_manager.login_message_category = "warning"

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


from routes import *


if __name__ == "__main__":
    app.run(debug=True)
