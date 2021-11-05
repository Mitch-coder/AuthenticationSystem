from datetime import datetime, timedelta
from functools import wraps
from flask import Flask, request,jsonify,make_response,session,redirect
from flask_graphql import GraphQLView
import jwt
from schema import schema,User
from flask_cors import CORS

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = '1@{xbaGxd0xd0vi3xf1|xaf5eJx9bxe6Pxff('
CORS(app)

def tokenRequired(func):
    @wraps(func)
    def decorated(*args,**kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'Alert':'No esta el token'})
        try:
            payload = jwt.decode(token,app.config['SECRET_KEY'])
        except:
            return jsonify({'Alert':'token invalido'})
    return decorated

@app.route('/profile')
@tokenRequired
def profile():
    if not session.get('logged_in'):
        return jsonify({"success":False})
    else:
        return jsonify({"success":True})

@app.route('/login',methods=['POST'])
def login():
    username = request.form.get("username")
    password = request.form.get("password")

    if username=='user' and password=='1234':
        session['logged_in'] = True
        token = jwt.encode({
            'user':request.form.get('username'),
            'expiration':str(datetime.utcnow() + timedelta(seconds=120))
        },
        app.config['SECRET_KEY'])

        user_root = User(username=request.form.get('username'))
        result = schema.execute(
            '''
            query getUser {
                user {
                    username
                }
            }
            ''',
            root=user_root
        )
        print(result)
        return jsonify({"success":True,'token':token.decode('utf-8')})
    else:
        return jsonify({"success":False})

app.add_url_rule('/graphql', view_func=GraphQLView.as_view(
    'graphql',
    schema=schema,
    graphiql=True,))

if __name__=="__main__":
    app.run(debug=True,host='127.0.0.1',port=5000)