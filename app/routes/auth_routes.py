from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from ..models import db, Student

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user = Student.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({'error': 'User already exists'}), 409

    hashed_password = generate_password_hash(data['password'])
    new_user = Student(name=data['name'], email=data['email'], password_hash=hashed_password, age=data['age'], adress=data['adress'], phn_no=data['phn_no'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = Student.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        return jsonify({
            'id': user.id,
            'name': user.name,
            'email': user.email
        }), 200
    return jsonify({'error': 'Invalid credentials'}), 401
