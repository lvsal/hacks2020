from flask import Flask, jsonify, request, render_template, make_response
import json
import data_manager as dm
import Login_Create as login
app = Flask(__name__)

logged_in = ""
err_l = ""
err_create = ""

@app.route('/hello', methods=['GET', 'POST'])
def hello():

    # POST request
    data = dm.fetch_query("fetch_events")
    # lol = json.(data)
    # dumps
    if request.method == 'POST':
        return data, 200


@app.route('/login_success', methods=['POST'])
def login_success():

    global err_l
    if request.method == 'POST':
        print(err_l + "    ugkjkgbkhbkj")
        return err_l, 200


@app.route('/create_success', methods=['POST'])
def create_success():

    global err_create
    if request.method == 'POST':
        print(err_create + "  cnskcnskcn")
        return err_create, 200


@app.route('/postmethod', methods = ['POST'])
def get_post_javascript_data():
    global logged_in
    global err_l
    err_l = ""
    jsdata = request.form['javascript_data']
    js = json.loads(jsdata)
    details = get_login(js)
    err_l = details[1]
    if(details[0] == 1):
        logged_in = js["user"]
        return logged_in
    else:
        logged_in = ""
        return logged_in


@app.route('/createnew', methods = ['POST'])
def create_account():
    global err_create
    global logged_in
    err_create = ""
    jsdata = request.form['javascript_data']
    js = json.loads(jsdata)
    login.Create_User(js["email"], js["pass"], js["user"])
    hey = login.get_success()
    err_create = hey[1]
    return err_create


def get_login(js):
    login.Login(js["user"], js["pass"])
    hey = login.get_success()
    print(hey)
    return hey


@app.route('/')
def index():
    # look inside `templates` and serve `index.html`
    return render_template('index.html')




if __name__ == '__main__':
    app.run(debug=True)
