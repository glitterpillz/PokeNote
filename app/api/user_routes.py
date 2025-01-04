from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/profile')
def public_profile(id):
    user = User.query.get(id)
    if not user:
        return {'error':'User not found'}, 404
    
    return jsonify({
        'id': user.id,
        'username': user.username,
        'fname': user.fname,
        'lname': user.lname,
        'profile_picture': user.profile_picture,
        'pokemon_collection': [pokemon.to_dict() for pokemon in user.pokemon_collection],
        'journal_entries': [entry.to_dict() for entry in user.journal_entries]
    })
