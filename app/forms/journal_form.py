from flask_wtf import FlaskForm
from wtforms import TextAreaField, FileField, SelectField, DateField
from wtforms.validators import DataRequired, Length, ValidationError
from werkzeug.utils import secure_filename

class JournalEntryForm(FlaskForm):
    content = TextAreaField(
        'Content',
        validators=[DataRequired(), Length(min=1, max=500)],
        render_kw={'placeholder': 'Write your journal entry...'}
    )

    accomplishments = TextAreaField(
        'Accomplishments',
        validators=[Length(max=500)]
    )

    weather = SelectField(
        'Weather',
        choices=[
            ('', 'Select Weather'),
            ('Sunny', 'Sunny'),
            ('Partly Cloudy', 'Partly Cloudy'),
            ('Cloudy', 'Cloudy'),
            ('Rainy', 'Rainy'),
            ('Stormy', 'Stormy'),
            ('Snowy', 'Snowy')
        ],
        validators=[]
    )

    mood = SelectField(
        'Mood',
        choices=[
            ('', 'Select Mood'),  
            ('Happy', 'Happy'),
            ('Sad', 'Sad'),
            ('Angry', 'Angry'),
            ('Neutral', 'Neutral'),
            ('Tired', 'Tired'),
            ('Excited', 'Excited'),
            ('Loved', 'Loved'),
            ('Homicidal', 'Homicidal'),
            ('Confident', 'Confident'),
            ('Grateful', 'Grateful')
        ],
        validators=[]
    )

    date = DateField('Date', format='%Y-%m-%d', validators=[])

    photo = FileField('Upload Photo (optional)')

    def validate_photo(self, field):
        if field.data:
            filename = secure_filename(field.data.filename)
            if not filename.lower().endswith(('.png', '.jpg', 'jpeg')):
                raise ValidationError('Only .png, .jpg, .jpeg files allowed')