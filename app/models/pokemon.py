from .db import db, environment, SCHEMA

class Pokemon(db.Model):
    __tablename__='pokemons'

    if environment == 'production':
        __table_args__={'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    types = db.Column(db.JSON, nullable=False)

    image = db.Column(db.String(255), nullable=True)

    stats = db.relationship(
        'PokemonStat',
        back_populates='pokemon',
        cascade='all, delete-orphan'
    )

    user_instances = db.relationship(
        'UserPokemon',
        back_populates='pokemon',
        cascade='all, delete-orphan'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'types': self.types,
            'image': self.image,
            'stats': [stat.to_dict() for stat in self.stats]
        }
    
class PokemonStat(db.Model):
    __tablename__ = 'pokemon_stats'

    # Schema handling for production
    __table_args__ = {'schema': SCHEMA} if environment == 'production' else {}

    id = db.Column(db.Integer, primary_key=True)
    stat_name = db.Column(db.String(50), nullable=False)
    stat_value = db.Column(db.Integer, nullable=False)
    pokemon_id = db.Column(db.Integer, db.ForeignKey('pokemons.id'), nullable=False)

    pokemon = db.relationship('Pokemon', back_populates='stats')

    def to_dict(self):
        return {
            'stat_name': self.stat_name,
            'stat_value': self.stat_value
        }