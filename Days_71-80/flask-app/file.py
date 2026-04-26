from flask import Flask, jsonify, render_template, request, url_for, redirect
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, EmailField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, Length
# import email_validator

app = Flask(__name__)
app.config['SECRET_KEY'] = 'some-secret-key'

class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=50)])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    message = TextAreaField('Message', validators=[DataRequired(), Length(min=10, max=200)])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6, max=20)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password', message='Password must match')])
    submit = SubmitField('Submit')


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

if __name__ == '__main__':
    app.run(debug=True)