from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Pokemon, UserPokemon

pokemon_routes = Blueprint('pokemon', __name__)


@pokemon_routes.route('/')
def pokemons():
    pokemons = Pokemon.query.all()
    return jsonify({"Pokemon": [pokemon.to_dict() for pokemon in pokemons]})


@pokemon_routes.route('/<int:id>')
def get_pokemon_by_id(id):
    pokemon = Pokemon.query.get(id)

    if pokemon:
        return jsonify(pokemon.to_dict())
    
    return jsonify({'message': 'Pokemon not found'}), 404


@pokemon_routes.route('/<int:id>/add', methods=['POST'])
@login_required
def add_pokemon_to_user(id):
    pokemon = Pokemon.query.get(id)

    if not pokemon:
        return jsonify({'error': 'Pokemon not found'}), 404
    
    new_entry = UserPokemon(user_id=current_user.id, pokemon_id=pokemon.id)
    db.session.add(new_entry)
    db.session.commit()

    return jsonify({'message': 'Pokemon added to your collection'}), 201


@pokemon_routes.route('/search', methods=['GET'])
def search_pokemon():
    search_query = request.args.get('query', '').strip()

    if not search_query:
        return {'error': 'Search query cannot be empty'}, 400
    
    if search_query.isdigit():
        pokemon = Pokemon.query.filter(Pokemon.id == int(search_query)).first()
        if not pokemon:
            return {'error': 'Pokemon not found'}, 404
        return jsonify({"Pokemon": [pokemon.to_dict()]})
    
    pokemons = Pokemon.query.filter(Pokemon.name.like(f"%{search_query}%")).all()
    
    if not pokemons:
        return {'error': 'No Pokémon found'}, 404
    
    return jsonify({"Pokemon": [pokemon.to_dict() for pokemon in pokemons]})

