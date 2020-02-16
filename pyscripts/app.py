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


@app.route('/create_post', methods = ['POST'])
def create_post():
    global err
    global logged_in
    jsdata = request.form['javascript_data']
    js = json.loads(jsdata)
    status = dm.update_query('create_post', [js["coord_x"], js["coord_y"], js["comments"], js["rating"],  js["username"]])
    if not status:
        return "Failed to create post"
    return ""

@app.route('/upvote_post', methods = ['POST'])
def upvote_post():
    global err
    global logged_in
    jsdata = request.form['javascript_data']
    js = json.loads(jsdata)
    status = dm.update_query('upvote_post', [js["postid"]])
    if not status:
        return "Failed to create post"
    return ""

@app.route('/downvote_post', methods = ['POST'])
def downvote_post():
    global err
    global logged_in
    jsdata = request.form['javascript_data']
    js = json.loads(jsdata)
    status = dm.update_query('downvote_post', [js["postid"]])
    if not status:
        return "Failed to create post"
    return ""


@app.route('/')
def index():
    # look inside `templates` and serve `index.html`
    return render_template('index.html')



if __name__ == '__main__':
    app.run(debug=True)
