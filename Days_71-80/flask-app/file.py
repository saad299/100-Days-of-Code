from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def hello():
    print("Method:", request.method)

    if request.method == 'POST':
        name = request.json.get('name', 'User')
        print("JSON Response:", request.json)
        print(f"Hello, {name}")
        return jsonify(message=f"Hello, {name}")
    return "Hello, World!"





if __name__ == '__main__':
    app.run(debug=True)