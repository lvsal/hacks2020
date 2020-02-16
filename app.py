from flask import Flask, jsonify, request, render_template, make_response

app = Flask(__name__)
import json

@app.route('/hello', methods=['GET', 'POST'])
def hello():

    # POST request
    data = {
        "president": {
            "name": "Beeblebrox",
            "species": "Betelgeusian"
        }
    }

    # lol = json.(data)
    # dumps
    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json())  # parse as JSON
        return data, 200

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers

@app.route('/calhack', methods=['POST'])
def calhack():

    # POST request
    data = {
        "president": {
            "name": "Zaphod Beeblebrox",
            "species": "Betelgeusian"
        }
    }

    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json())  # parse as JSON
        return data, 200



@app.route('/')
def index():
    # look inside `templates` and serve `index.html`
    return render_template('index.html')



if __name__ == '__main__':
    app.run(debug=True)
