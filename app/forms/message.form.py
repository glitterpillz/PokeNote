from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class MessageForm(FlaskForm):
    receiver = StringField("Receiver Username", validators=[DataRequired()])
    content = TextAreaField("Content", validators=[DataRequired(), Length(max=1000)])
    submit = SubmitField("Send Message")