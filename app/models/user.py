from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    fname = db.Column(db.String(40), nullable=False)
    lname = db.Column(db.String(40), nullable=False)
    admin = db.Column(db.Boolean, nullable=True)
    profile_picture = db.Column(db.String(255), nullable=True)

    pokemon_collection = db.relationship(
        'UserPokemon',
        back_populates='user',
        cascade='all, delete-orphan'
    )

    journal_entries = db.relationship(
        'JournalEntry',
        back_populates='user',
        cascade='all, delete-orphan'
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'fname': self.fname,
            'lname': self.lname,
            'admin': self.admin,
            'pokemon_collection': [entry.to_dict() for entry in self.pokemon_collection],
            'journal_entries': [entry.to_dict() for entry in self.journal_entries],
            'profile_picture': self.profile_picture
        }
