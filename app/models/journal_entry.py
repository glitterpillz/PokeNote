from .db import db, environment, SCHEMA

class JournalEntry(db.Model):
    __tablename__ = 'journal_entries'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    accomplishments = db.Column(db.Text, nullable=True)
    weather = db.Column(db.String(50), nullable=True)
    mood = db.Column(db.String(50), nullable=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=None)
    photo_url = db.Column(db.String(255), nullable=True)
    
    user = db.relationship(
        'User',
        back_populates='journal_entries'
    )

    comments = db.relationship(
        'Comment',
        back_populates='journal_entry',
        cascade='all, delete-orphan'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'accomplishments': self.accomplishments,
            'weather': self.weather,
            'mood': self.mood,
            'timestamp': self.timestamp,
            'photo_url': self.photo_url,
            'comments': [comment.to_dict() for comment in self.comments]
        }