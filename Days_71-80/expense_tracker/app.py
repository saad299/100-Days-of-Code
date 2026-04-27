from flask import Flask, jsonify, render_template, request, url_for, redirect
from contact import ContactForm
from model import User, db
# from flask_migrate import Migrate

app = Flask(__name__)
app.config['SECRET_KEY'] = 'some-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
# migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return 'this is the home page'

@app.route('/user', methods=['GET', 'POST'])
def hello():
    print("Method:", request.method)

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
    print(f"User added: [{users.name}, {users.email}, {users.password}] in '/add' url")
    return "User added successfully"

# Read
@app.route('/members')
def members():
    # users = User.query.all()
    # user = User.query.first()
    user = User.query.first()
    print(f"User: [{user.name}, {user.email}, {user.password}] in '/members' url")
    return str(user)

# Update
@app.route('/update')
def update():
    user = User.query.first()
    user.name = "Saad Ahmad 123"
    db.session.commit()
    print(f"User's name updated: [{user.name}, {user.email}, {user.password}] in '/update' url")
    return "User updated successfully"

# delete
@app.route('/delete')
def delete():
    user = User.query.first()
    print(f"User before getting deleted: [{user.name}, {user.email}, {user.password}] in '/delete' url")
    deleted_user = db.session.delete(user)
    print(f"User after getting deleted: [{deleted_user}] in '/delete' url")
    n = db.session.commit()
    print(f"User now: [{n}] in '/delete' url")
    return "User deleted successfully"


if __name__ == '__main__':
    app.run(debug=True)