from flask import Blueprint, jsonify, request
from ..models import db, Enrollment, Course, Student
from flask_jwt_extended import jwt_required, get_jwt_identity  # If using JWT for authentication

user_blueprint = Blueprint('user', __name__)


# Endpoint to fetch user profile details
@user_blueprint.route('/profile', methods=['GET'])
def get_user_profile():
    user_id = request.args.get('user_id')  # Extract user_id from the query params
    user = Student.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email
    }), 200


# Endpoint to enroll a user in a course
@user_blueprint.route('/enroll', methods=['POST'])
def enroll_course():
    try:
        data = request.get_json()
        user_id = data.get('user_id')  # Retrieve user_id from the request body
        course_id = data.get('course_id')  # Retrieve course_id from the request body

        if not user_id or not course_id:
            return jsonify({'error': 'User ID and Course ID are required'}), 400

        course = Course.query.get(course_id)
        if not course:
            return jsonify({'error': 'Course not found'}), 404

        # Check if the user is already enrolled in the course
        existing_enrollment = Enrollment.query.filter_by(student_id=user_id, course_id=course_id).first()
        if existing_enrollment:
            return jsonify({'error': 'Already enrolled in this course'}), 400

        # Enroll the user in the course
        enrollment = Enrollment(student_id=user_id, course_id=course_id)
        db.session.add(enrollment)
        db.session.commit()

        return jsonify({'message': 'Enrollment successful'}), 200

    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred', 'details': str(e)}), 500
