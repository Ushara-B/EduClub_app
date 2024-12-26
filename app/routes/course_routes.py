from flask import Blueprint, jsonify
from ..models import db, Course

course_blueprint = Blueprint('courses', __name__)

@course_blueprint.route('/courses', methods=['GET'])
def list_courses():
    courses = Course.query.all()
    return jsonify([{'id': course.id, 'name': course.name} for course in courses]), 200
