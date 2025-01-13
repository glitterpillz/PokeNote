from flask_wtf import FlaskForm
from wtforms import TextAreaField, FileField, SelectField, DateField, BooleanField, StringField
from wtforms.validators import DataRequired, Length, ValidationError
from werkzeug.utils import secure_filename

class JournalEntryForm(FlaskForm):
    title = StringField(
        'Title',
        validators=[DataRequired(), Length(min=1, max=100)],
        render_kw={'placeholder': 'Title...'}
    )

    content = TextAreaField(
        'Content',
        validators=[DataRequired(), Length(min=1, max=500)],
        render_kw={'placeholder': 'Write your journal entry...'}
    )

    accomplishments = TextAreaField(
        'Accomplishments',
        validators=[Length(max=500)]
    )

    timestamp = DateField('Date', format='%Y-%m-%d', validators=[])

    photo = StringField('Upload Photo (optional)')

    is_private = BooleanField('Private')