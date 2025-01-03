from flask import Blueprint,jsonify, request
from app.models import User, UserPokemon, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            fname=form.data['fname'],
            lname=form.data['lname'],
            admin=form.data['admin'],
            profile_picture=form.data['profile_picture']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/account')
@login_required
def get_account():
    user = User.query.get(current_user.id)
    if not user:
        return {'error': 'User not found'}, 404
    
    return jsonify({'user': user.to_dict()})


@auth_routes.route('/account', methods=['PUT'])
@login_required
def update_account():
    data = request.get_json()
    user = User.query.get(current_user.id)
    if not user:
        return {'error': 'User not found'}, 404
    
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.fname = data.get('fname', user.fname)
    user.lname = data.get('lname', user.lname)
    user.profile_picture = data.get('profile_picture', user.profile_picture)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return {'error': 'Failed to update account information', 'details': str(e)}, 400

    return jsonify({'message': 'Account updated successfully', 'user': user.to_dict()})


@auth_routes.route('/account', methods=['DELETE'])
@login_required
def delete_account():
    user = User.query.get(current_user.id)
    if not user:
        return {'error': 'User not found'}, 404
    
    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return {'error': 'Failed to delete account', 'details': str(e)}, 400
    
    logout_user()
    return jsonify({'message': 'Account deleted successfully'})


@auth_routes.route('/collection')
@login_required
def get_user_collection():
    user = User.query.get(current_user.id)
    if not user:
        return {'error': 'User not found'}, 404
    
    return jsonify({'pokemon_collection': [entry.to_dict() for entry in user.pokemon_collection]})


@auth_routes.route('/collection/<int:pokemon_id>')
@login_required
def get_user_pokemon(pokemon_id):
    user_pokemon = UserPokemon.query.filter_by(user_id=current_user.id, pokemon_id=pokemon_id).first()
    if not user_pokemon:
        return {'error': 'Pokémon not found in your collection'}, 404

    return jsonify({'pokemon': user_pokemon.to_dict()})
    

@auth_routes.route('/collection/<int:pokemon_id>', methods=['PUT'])
@login_required
def update_user_pokemon(pokemon_id):
    user_pokemon = UserPokemon.query.filter_by(user_id=current_user.id, pokemon_id=pokemon_id).first()
    if not user_pokemon:
        return {'error': 'Pokémon not found in your collection'}, 404
    
    data = request.get_json()
    nickname = data.get('nickname', user_pokemon.nickname)
    level = data.get('level', user_pokemon.level)

    user_pokemon.nickname = nickname
    user_pokemon.level = level

    db.session.commit()

    return jsonify({'message': 'Pokémon updated successfully', 'pokemon': user_pokemon.to_dict()})


@auth_routes.route('/collection/<int:pokemon_id>', methods=['DELETE'])
@login_required
def delete_user_pokemon(pokemon_id):
    user_pokemon = UserPokemon.query.filter_by(user_id=current_user.id, pokemon_id=pokemon_id).first()
    if not user_pokemon:
        return {'error': 'Pokémon not found in your collection'}, 404
    
    db.session.delete(user_pokemon)
    db.session.commit()

    return jsonify({'message': 'Pokémon deleted successfully'})