from .db import db, environment, SCHEMA
from datetime import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    sender = db.relationship(
        'User',
        foreign_keys=[sender_id],
        back_populates='sent_messages'
    )

    receiver = db.relationship(
        'User',
        foreign_keys=[receiver_id],
        back_populates='received_messages'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'profile_picture': self.sender.profile_picture,
            'content': self.content,
            'timestamp': self.timestamp.isoformat(),
            'sender': self.sender.username,
            'receiver': self.receiver.username
        }