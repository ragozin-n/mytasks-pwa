from wsgiref.simple_server import make_server
import os
from pyramid.config import Configurator
from pyramid.response import Response
from jinja2 import FileSystemLoader, Environment
from react.render import render_component

env = Environment(loader=FileSystemLoader('server/templates'))

def IndexPage(request):
    rendered = render_component(
        os.path.join(os.getcwd(), 'client', 'app', 'app.jsx'),
        to_static_markup=False
    )

    return Response(env.get_template('index.html').render(rendered=rendered,css=request.static_url('server/static/styles.css')));


if __name__ == '__main__':
    config = Configurator()
    config.add_static_view('static', 'server/static')

    config.add_route('home', '/')
    config.add_view(IndexPage, route_name='home')

    app = config.make_wsgi_app()
    server = make_server('localhost', 8081, app)
    print("Serving localhost on 8081...")
    server.serve_forever()