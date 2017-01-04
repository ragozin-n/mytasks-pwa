from wsgiref.simple_server import make_server
import os
from pyramid.config import Configurator
from pyramid.response import Response
from jinja2 import FileSystemLoader, Environment
from sqlalchemy import Table, MetaData, create_engine, select, and_, delete
from db import DataBase
import bcrypt
import json

env = Environment(loader=FileSystemLoader('server/templates'))
# DB_PATH = "postgresql://localhost:5432/pwa_db"
DB_PATH = "postgres://fpjotnzddzayus:570ffe920bc0c790d9eddce1fcbd269e836cf1992daaf77e041ed7266d43784d@ec2-107-20-193-74.compute-1.amazonaws.com:5432/d6cder18a6afpt"
engine = create_engine(DB_PATH)
connection = DataBase().init_db(engine)

def Data(request):
    users = connection.execute(select([DataBase.users]))
    if request.method == 'POST':
        for user in users:
            if(request.POST.getone('user') == user[0]):
                if(len(request.POST.getone('user'))+1 == int(request.POST.getone('token'))):
                    if(request.POST.getone('type') == 'add'):
                        connection.execute(DataBase.posts.insert(),
                        {"username": request.POST.getone('user'), "task": request.POST.getone('data'), "isDone": False})
                    if(request.POST.getone('type') == 'delete'):
                        query = DataBase.posts.delete(DataBase.posts.c.task == request.POST.getone('data'))
                        connection.execute(query)

        tasks = connection.execute(select([DataBase.posts.c.task]). \
                                   where(and_(DataBase.posts.c.username == request.POST.getone('user'), DataBase.posts.c.isDone == False)). \
                                   order_by(DataBase.posts.c.task))

        result = []
        for task in tasks:
            result += task

        print(json.dumps({"username": request.POST.getone('user'), "tasks": result}))
        return Response(json.dumps({"username": request.POST.getone('user'), "tasks": result}))

def IndexPage(request):
    
    if request.method == 'POST':
        login = request.POST.getone('login')
        password = request.POST.getone('password').encode('utf-8')
        users = connection.execute(select([DataBase.users]))
        # hashed = bcrypt.hashpw(password, request.registry.settings['salt'])
        
        for user in users:
            if user[0] == login and bcrypt.hashpw(password, request.registry.settings['salt']) == user[1]:
                print("Render app. Auth succes")

                tasks = connection.execute(select([DataBase.posts.c.task]). \
                    where(and_(DataBase.posts.c.username == login, DataBase.posts.c.isDone == False)). \
                    order_by(DataBase.posts.c.task))

                result = []
                for task in tasks:
                    result += task

                print(json.dumps({"username":login,"tasks":result}))
                return Response(json.dumps({"username":login,"tasks":result}))
        print('User not found')

    return Response(env.get_template('index.html').render(css=request.static_url('server/static/main.css'),bundle=request.static_url('server/static/bundle.js')))

def RegisterPage(request):

    if request.method == 'POST':

        hashed = bcrypt.hashpw(request.POST.getone('password').encode('utf-8'),request.registry.settings['salt'])

        users = connection.execute(select([DataBase.users]))
        for username in users:
            if username == request.POST.getone('login'):
                print("user already exist")

        connection.execute(DataBase.users.insert(),
            {"login": request.POST.getone('login'), "password": str(hashed),"fullName": request.POST.getone('fullname')})
        print("user " + request.POST.getone('login') + " : " + request.POST.getone('fullname') + " created")

    return Response(env.get_template('index.html').render(css=request.static_url('server/static/main.css'),bundle=request.static_url('server/static/bundle.js')))


if __name__ == '__main__':

    config = Configurator()
    settings = config.get_settings()
    settings['salt'] = bcrypt.gensalt(10)

    config.add_static_view('static', 'server/static')

    config.add_route('home', '/')
    config.add_view(IndexPage, route_name='home')

    config.add_route('sync', '/data')
    config.add_view(Data, route_name='sync')

    config.add_route('registration', '/register')
    config.add_view(RegisterPage, route_name='registration')

    app = config.make_wsgi_app()
    # PORT = os.environ['PORT']
    PORT = 8080
    server = make_server('0.0.0.0', PORT, app)
    print("Serving localhost on 8080...")
    server.serve_forever()