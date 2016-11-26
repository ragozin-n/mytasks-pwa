from wsgiref.simple_server import make_server
import os
from pyramid.config import Configurator
from pyramid.response import Response
from jinja2 import FileSystemLoader, Environment
from react.render import render_component
from sqlalchemy import Table, MetaData, create_engine
from db import DataBase

env = Environment(loader=FileSystemLoader('server/templates'))

def IndexPage(request):
    rendered = render_component(
        os.path.join(os.getcwd(), 'client', 'app', 'login.jsx'),
        to_static_markup=False
    )
    #if request.method == 'POST':
        # Check login and password

    return Response(env.get_template('index.html').render(rendered=rendered,css=request.static_url('server/static/main.css')));

def RegisterPage(request):
    rendered = render_component(
        os.path.join(os.getcwd(), 'client', 'app', 'register.jsx'),
        to_static_markup=False
    )

    return Response(env.get_template('index.html').render(rendered=rendered,css=request.static_url('server/static/main.css')));


if __name__ == '__main__':

    connection = DataBase.init_db()

    config = Configurator()
    config.add_static_view('static', 'server/static')

    config.add_route('home', '/')
    config.add_view(IndexPage, route_name='home')

    config.add_route('registration', '/register')
    config.add_view(RegisterPage, route_name='registration')

    app = config.make_wsgi_app()
    server = make_server('localhost', 8081, app)
    print("Serving localhost on 8081...")
    server.serve_forever()