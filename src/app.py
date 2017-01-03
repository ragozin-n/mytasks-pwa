from wsgiref.simple_server import make_server
import os
from pyramid.config import Configurator
from pyramid.response import Response
from jinja2 import FileSystemLoader, Environment
from sqlalchemy import Table, MetaData, create_engine, select, and_
from db import DataBase
from passlib.hash import bcrypt

env = Environment(loader=FileSystemLoader('server/templates'))
engine = create_engine("postgresql://localhost:5432/pwa_db")
connection = DataBase().init_db(engine)

def IndexPage(request):
    
    if request.method == 'POST':
        login = request.POST.getone('login')
        password = request.POST.getone('password')
        users = connection.execute(select([DataBase.users]))

        for user in users:
            if user[0] == login and bcrypt.verify(str.encode(password)+request.registry.settings['salt'], user[1]):
                print("Render app. Auth succes")
                import json

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

        hashed = bcrypt.hash(str.encode(request.POST.getone('password'))+request.registry.settings['salt'])

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
    settings['salt'] = b"abc"

    config.add_static_view('static', 'server/static')

    config.add_route('home', '/')
    config.add_view(IndexPage, route_name='home')

    config.add_route('registration', '/register')
    config.add_view(RegisterPage, route_name='registration')

    app = config.make_wsgi_app()
    server = make_server('localhost', 8080, app)
    print("Serving localhost on 8080...")
    server.serve_forever()