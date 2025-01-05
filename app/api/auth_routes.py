from flask import Blueprint,jsonify, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import UpdateAccountForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/session')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return jsonify(current_user.to_dict())
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
    
    return jsonify(user.to_dict())


@auth_routes.route('/account', methods=['PUT'])
@login_required
def update_account():
    form = UpdateAccountForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.current_user_id = current_user.id  # Set the current user's ID for custom validation

    if form.validate_on_submit():
        user = User.query.get(current_user.id)
        if not user:
            return {'error': 'User not found'}, 404

        user.username = form.data.get('username', user.username)
        user.email = form.data.get('email', user.email)
        user.fname = form.data.get('fname', user.fname)
        user.lname = form.data.get('lname', user.lname)
        user.profile_picture = form.data.get('profile_picture', user.profile_picture)

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {'error': 'Failed to update account information', 'details': str(e)}, 400

        return jsonify({'message': 'Account updated successfully', 'user': user.to_dict()})

    return form.errors, 400


@auth_routes.route('/account/<int:user_id>', methods=['DELETE'])
@login_required
def delete_account(user_id=None):
    """
    Deletes the account of the user with the given ID, or the current user's account if no ID is provided.
    """
    if user_id is None:
        user = User.query.get(current_user.id)
    else:
        if not current_user.admin:
            return {'error': 'Unauthorized. Admin privileges required.'}, 403
        user = User.query.get(user_id)
    
    if not user:
        return {'error': 'User not found'}, 404

    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return {'error': 'Failed to delete account', 'details': str(e)}, 400

    if user.id == current_user.id:
        logout_user()
        return jsonify({'message': 'Your account has been deleted successfully.'})

    return jsonify({'message': f"User account with ID {user.id} has been deleted successfully."})
