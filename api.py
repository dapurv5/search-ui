import time

import flask
import flask.ext.login as flask_login

from flask import Flask, request
from flask_restful import Resource, Api
from flask import render_template
from flask import send_file, make_response, abort

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='')
app.secret_key = 'mojojojo'  # Change this!


login_manager = flask_login.LoginManager()
login_manager.init_app(app)

users = {'dapurv5@gmail.com': {'pw': 'secret'}}



class User(flask_login.UserMixin):
  pass


@login_manager.user_loader
def user_loader(email):
  if email not in users:
    return

  user = User()
  user.id = email
  return user


@login_manager.request_loader
def request_loader(request):
  email = request.form.get('email')
  if email not in users:
    return

  user = User()
  user.id = email

  # DO NOT ever store passwords in plaintext and always compare password
  # hashes using constant-time comparison!
  user.is_authenticated = request.form['pw'] == users[email]['pw']

  return user


@app.route('/login', methods=['GET', 'POST'])
def login():
  if flask.request.method == 'GET':
    form = '''
               <form action='login' method='POST'>
                <input type='text' name='email' id='email' placeholder='email'></input>
                <input type='password' name='pw' id='pw' placeholder='password'></input>
                <input type='submit' name='submit'></input>
               </form>
               '''
    return make_response(open('static/login.html').read())

  email = flask.request.form['email']
  print email
  if flask.request.form['pw'] == users[email]['pw']:
    user = User()
    user.id = email
    flask_login.login_user(user)
    return flask.redirect(flask.url_for('index'))
  return flask.redirect(flask.url_for('login'))


@app.route('/logout')
def logout():
  flask_login.logout_user()
  return flask.redirect(flask.url_for('login'))


@login_manager.unauthorized_handler
def unauthorized_handler():
  return flask.redirect(flask.url_for('login'))


@app.route('/')
@flask_login.login_required
def search_page(**kwargs):
  return make_response(open('static/index.html').read())


@app.route('/index', methods=['GET', 'POST'])
@flask_login.login_required
def index():
  return make_response(open('static/index.html').read())


@app.route('/search/')
@app.route('/search/<query>')
def api_article(query=None):
  time.sleep(1);
  return 'You are reading ' + str(query)


if __name__ == '__main__':
  app.run(debug=True)

