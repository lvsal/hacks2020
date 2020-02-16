from flask import Flask, jsonify, request, render_template, make_response
app = Flask(__name__)
import json
import data_manager as dm
import Login_Create as login

logged_in = ""
err = ""


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


@app.route('/login_success', methods=['POST'])
def login_success():
    # lol = json.(data)
    # dumps
    global err
    if request.method == 'POST':
        print(err)
        return err, 200


@app.route('/create_success', methods=['POST'])
def create_success():
    # lol = json.(data)
    # dumps
    global err
    if request.method == 'POST':
        print(err)
        return err, 200



@app.route('/postmethod', methods = ['POST'])
def get_post_javascript_data():
    global logged_in
    global err
    jsdata = request.form['javascript_data']
    js = json.loads(jsdata)
    details = get_login(js)
    err = details[1]
    if(details[0] == 1):
        logged_in = js["user"]
        return logged_in
    else:
        logged_in = ""
        return logged_in


@app.route('/createnew', methods = ['POST'])
def create_Account():
    global err
    global logged_in
    jsdata = request.form['javascript_data']
    js = json.loads(jsdata)
    login.Create_User(js["email"], js["pass"], js["user"])
    hey = login.get_success()
    err = hey[1]
    return err


def get_login(js):
    username = js["user"]
    login.Login(js["user"], js["pass"])
    hey = login.get_success()
    return hey


@app.route('/')
def index():
    # look inside `templates` and serve `index.html`
    return render_template('index.html')




if __name__ == '__main__':
    app.run(debug=True)
