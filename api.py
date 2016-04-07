from flask import Flask, request
from flask_restful import Resource, Api
from flask import render_template
from flask import send_file, make_response, abort

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='')

@app.route('/')
def basic_pages(**kwargs):
  return make_response(open('static/index.html').read())

if __name__ == '__main__':
    app.run(debug=True)

