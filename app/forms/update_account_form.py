from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Email, ValidationError, Optional
from app.models import User

def email_in_use(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != form.current_user_id:
        raise ValidationError('Email address is already in use.')

def username_in_use(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != form.current_user_id:
        raise ValidationError('Username is already in use.')

class UpdateAccountForm(FlaskForm):
    current_user_id = None  # Set this dynamically when validating
    username = StringField('username', validators=[Optional(), username_in_use])
    email = StringField('email', validators=[Optional(), Email(), email_in_use])
    fname = StringField('fname', validators=[Optional()])
    lname = StringField('lname', validators=[Optional()])
    profile_picture = StringField('profile_picture', validators=[Optional()])
