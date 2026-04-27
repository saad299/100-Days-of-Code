from flask import Flask, jsonify, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from contact import ContactForm
# from model import User


app = Flask(__name__)
app.config['SECRET_KEY'] = 'some-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    
    # def __repr__(self):
    #     return f'<User {self.name}>'

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return 'this is the home page'

"""
Route -> which url are we using to get the response
Request -> which method of request are we using to get the response
Response -> what are we getting in return
"""

@app.route('/user', methods=['GET', 'POST'])
def hello():
    print("Method:", request.method)

    # on browser, we would visit url something like '/user?name=Ali'
    # but that would still be a GET method and not a POST method
    # for POST method, some type of form is used
    if request.method == 'POST':
        name = request.json.get('name', 'User')
        print("JSON Response:", request.json)
        print(f"Hello, {name}")
        return jsonify(message=f"Hello, {name}")
    # return "Hello, World"
    return f"<h1>Hello, {request.args.get('name', 'World')}!</h1>"


@app.route('/form', methods=['GET', 'POST'])
def form():
    print("Method:", request.method)

    # on browser, we visit url '/form'
    # that would show us the form
    # user fills the form and submits it
    # flask reads the form details using 'request.form.get()'
    # and stores the form details in the 'user' variable
    if request.method == 'POST':
        user = request.form.get('name')
        print("Form Response:", request.form)
        print(f"Hello, {user}")
        return f"<h1>Hello, {user}! How you doin'?</h1>"
    
    return render_template('form.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = ContactForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
        message = form.message.data
        password = form.password.data
        confirm_password = form.confirm_password.data
        print("Form Response:", form.data)
        return redirect(url_for('success'))
    return render_template('form.html', form=form)

@app.route('/success')
def success():
    return "<h1>Registration Successful!!</h1>"


@app.route('/user')
def user():
    users = User.query.all()
    return render_template('users.html', users=users)


# Add/Create
@app.route('/add', methods=['GET', 'POST'])
def add():
    users = User(name="Saad", email="saad@example.com", password="password")
    db.session.add(users)
    db.session.commit()
    return "User added successfully"

# Read
@app.route('/members', methods=['GET'])
def members():
    users = User.query.all()
    user = User.query.get(1)
    user = User.query.filter_by(name="Saad").first()
    return str(users)

# Update
@app.route('/update')
def update():
    user = User.query.get(1)
    user.name = "Saad Ahmad"
    db.session.commit()
    return "User updated successfully"

# delete
@app.route('/delete')
def delete():
    user = User.query.get(1)
    db.session.delete(user)
    db.session.commit()
    return "User deleted successfully"


if __name__ == '__main__':
    app.run(debug=True)