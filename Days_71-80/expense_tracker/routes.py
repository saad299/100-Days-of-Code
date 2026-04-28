from flask import render_template, request, url_for, redirect, flash, abort
from flask_login import login_required, current_user, login_user, logout_user
from form import RegisterForm, LoginForm, ExpenseForm
from app import db, app
from model import User, Expense
from sqlalchemy import func

"""
Routes it will have
/                  — homepage, redirect to /expenses if logged in
/register          — registration page
/login             — login page
/logout            — logout, redirect to /login

/expenses          — list all expenses + total + filter
/expenses/add      — add expense form
/expenses/<id>/delete  — delete expense (POST only)

"""


# Homepage
@app.route("/")
def home():
    if current_user.is_authenticated:
        return redirect(url_for("expenses"))
    return redirect(url_for("login"))


# register route page
@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if current_user.is_authenticated:
        return redirect(url_for("expenses"))
    form = RegisterForm()
    if form.validate_on_submit():
        user = User(
            username=form.username.data,
            email=form.email.data,
            # password=form.password.data,
            # confirm_password=form.confirm_password.data
        )
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        print("Form Response:", form.data)
        flash('Account created successfully.', 'success')
        return redirect(url_for('expenses'))
    return render_template('auth/register.html', form=form)


# login route page
@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        print("Form Response:", form.data)
        return redirect(url_for('success'))
    return render_template('auth/login.html', form=form)


# logout route page
@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("login"))


# expense lists route page
@app.route("/expense")
def expense():
    return render_template("expenses/list.html")


# add expense route page
@app.route("/expense/add")
def add_expense():
    return render_template("expenses/add.html")


# update expense route page
@app.route("/expense/update/<int:id>")
def update_expense(id):
    return render_template("expenses/update.html")


# delete expense route page
@app.route("/expense/delete/<int:id>")
def delete_expense(id):
    return render_template("expenses/delete.html")
