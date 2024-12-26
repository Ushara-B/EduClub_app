from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Import CORS
from .config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)


    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    JWTManager(app)

    from .routes.auth_routes import auth_blueprint
    from .routes.course_routes import course_blueprint
    from .routes.user_routes import user_blueprint

    app.register_blueprint(auth_blueprint, url_prefix='/api')
    app.register_blueprint(course_blueprint, url_prefix='/api')
    app.register_blueprint(user_blueprint, url_prefix='/api')

    return app
