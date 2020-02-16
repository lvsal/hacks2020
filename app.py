from flask import Flask, jsonify, request, render_template, make_response
import os
import time
app = Flask(__name__)

def format_server_time():
  server_time = time.localtime()
  return time.strftime("%I:%M:%S %p", server_time)

@app.route('/hello', methods=['GET', 'POST'])
def hello():

    # POST request
    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json())  # parse as JSON
        return 'OK', 200

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
