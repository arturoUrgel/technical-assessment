from flask import Flask

from .routes import MatchRoutes

app = Flask(__name__)


def init_app():

    app.register_blueprint(MatchRoutes.main, url_prefix="/api/match")
    return app
