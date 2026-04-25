from flask import Flask, jsonify, url_for, request

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/home')
def home():
    return "Home Page"

@app.route('/about')
def about():
    return "About Page"

@app.route('/contact')
def contact():
    return "Contact Page"

@app.route('/user/<username>')
def user(username):
    return f'<h1>User is {username}</h1>'

@app.route('/api/user/<username>')
def api_user(username):
    return jsonify({
        'status': 'ok',
        'username': username
    })

with app.test_request_context():
    print(url_for('hello'))
    print(url_for('user', username='Saad'))

@app.route('/search')
def search():
    keyword = request.args.get('keyword', '')
    location = request.args.get('location', '')
    return f'Searching for {keyword} in {location}'

if __name__ == '__main__':
    app.run(debug=True)