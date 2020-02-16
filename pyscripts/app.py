from flask import Flask, jsonify, request, render_template, make_response
app = Flask(__name__)
import json
import data_manager as dm

@app.route('/hello', methods=['GET', 'POST'])
def hello():

    # POST request
    data = dm.fetch_query("fetch_events")
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

@app.route('/fetch_comments', methods=['GET', 'POST'])
def fetch_comments():

    # POST request
    data = dm.fetch_query("fetch_all_posts")
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


@app.route('/')
def index():
    # look inside `templates` and serve `index.html`
    return render_template('index.html')



if __name__ == '__main__':
    app.run(debug=True)
