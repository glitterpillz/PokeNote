from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Pokemon, PokemonStat, UserPokemon, User


pokemon_routes = Blueprint('pokemon', __name__)


# @pokemon_routes.route('/')
# def pokemons():
#     pokemons = Pokemon.query.filter(Pokemon.id.in_([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])).order_by(Pokemon.id).all()

#     return jsonify({"Pokemon": [pokemon.to_dict() for pokemon in pokemons]})

@pokemon_routes.route('/')
def pokemons():
    pokemons = Pokemon.query.filter(Pokemon.id.in_([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])).order_by(Pokemon.id).all()

    return jsonify({"Pokemon": [pokemon.to_dict() for pokemon in pokemons]})


@pokemon_routes.route('/<int:id>')
def get_pokemon_by_id(id):
    pokemon = Pokemon.query.get(id)

    if pokemon:
        return jsonify(pokemon.to_dict())
    
    return jsonify({'message': 'Pokemon not found'}), 404


@pokemon_routes.route('/<int:id>', methods=['POST'])
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





# @pokemon_routes.route('/collection')
# @login_required
# def get_user_collection():
#     user = User.query.get(current_user.id)

#     if not user:
#         return {'error': 'User not found'}, 404
    
#     return jsonify({'pokemon_collection': [pokemon.to_dict() for pokemon in user.pokemon_collection]})

@pokemon_routes.route('/collection', methods=['GET'])
def get_user_pokemons():
    if not current_user.is_authenticated:
        return jsonify({'message': 'User not authenticated'})
    
    pokemons = UserPokemon.query.filter(UserPokemon.user_id == current_user.id).all()
    pokemons_dict = [pokemon.to_dict() for pokemon in pokemons]
    return jsonify({"Pokemon": pokemons_dict})


# @pokemon_routes.route('/collection/<int:collection_id>')
# @login_required
# def get_user_pokemon_by_collection_id(collection_id):
#     """
#     Retrieve a specific Pokémon instance in the user's collection by collection ID.
#     """
#     user_pokemon = UserPokemon.query.filter_by(id=collection_id, user_id=current_user.id).first()
    
#     if not user_pokemon:
#         return jsonify({'error': 'Pokémon not found in your collection'}), 404

#     return jsonify({
#         'collection_id': user_pokemon.id,
#         'pokemon_id': user_pokemon.pokemon_id,
#         'nickname': user_pokemon.nickname,
#         'level': user_pokemon.level,
#         'pokemon_data': user_pokemon.to_dict()
#     })

# @pokemon_routes.route('/collection/<int:collection_id>', methods=['GET'])
# def get_user_pokemon_by_collection_id(collection_id):
#     user_pokemon = UserPokemon.query.get(collection_id)
#     if not user_pokemon:
#         return jsonify({'error': 'Pokemon not found in your collection'}), 404
#     return [{'pokemon': user_pokemon.to_dict()}]

@pokemon_routes.route('/collection/<int:collection_id>', methods=['GET'])
def get_user_pokemon_by_collection_id(collection_id):
    user_pokemon = UserPokemon.query.get(collection_id)
    if not user_pokemon:
        return jsonify({'error': 'Pokemon not found in your collection'}), 404
    return jsonify({'pokemon': user_pokemon.to_dict()})


# @pokemon_routes.route('/collection/<int:pokemon_id>')
# @login_required
# def get_user_pokemon_instances(pokemon_id):
#     """
#     Retrieve all instances of a specific Pokémon in the user's collection.
#     """
#     user_pokemons = UserPokemon.query.filter_by(user_id=current_user.id, pokemon_id=pokemon_id).all()
    
#     if not user_pokemons:
#         return {'error': 'Pokémon not found in your collection'}, 404

#     return jsonify({
#         'pokemon_instances': [
#             {
#                 'collection_id': user_pokemon.id,
#                 'pokemon_id': user_pokemon.pokemon_id,
#                 'index': idx + 1,
#                 'pokemon_data': user_pokemon.to_dict()
#             }
#             for idx, user_pokemon in enumerate(user_pokemons)
#         ]
#     })


@pokemon_routes.route('/collection/<int:collection_id>', methods=['PUT'])
@login_required
def edit_user_pokemon(collection_id):
    """
    Edit a Pokémon in the user's collection, including optional updates to stats.
    """
    user_pokemon = UserPokemon.query.filter_by(id=collection_id, user_id=current_user.id).first()

    if not user_pokemon:
        return {'error': 'Pokémon not found in your collection'}, 404

    pokemon = Pokemon.query.get(user_pokemon.pokemon_id)
    if not pokemon:
        return {'error': 'Pokémon data not found'}, 404

    data = request.get_json()

    nickname = data.get('nickname', user_pokemon.nickname)
    level = data.get('level', user_pokemon.level)
    user_pokemon.nickname = nickname
    user_pokemon.level = level

    stats_data = data.get('stats', [])
    for stat_data in stats_data:
        stat_name = stat_data.get('stat_name')
        stat_value = stat_data.get('stat_value')
        if stat_name and stat_value is not None:

            stat = PokemonStat.query.filter_by(pokemon_id=user_pokemon.pokemon_id, stat_name=stat_name).first()

            if stat:
                stat.stat_value = stat_value
            else:
                new_stat = PokemonStat(
                    pokemon_id=user_pokemon.pokemon_id,
                    stat_name=stat_name,
                    stat_value=stat_value
                )
                db.session.add(new_stat)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update Pokémon', 'details': str(e)}), 400

    return jsonify({'message': 'Pokémon updated successfully', 'pokemon': user_pokemon.to_dict()})


@pokemon_routes.route('/collection/<int:collection_id>', methods=['DELETE'])
@login_required
def delete_user_pokemon(collection_id):
    user_pokemon = UserPokemon.query.filter_by(id=collection_id, user_id=current_user.id).first()

    if not user_pokemon:
        return jsonify({'error': 'Pokémon not found in your collection'}), 404
    
    try:
        db.session.delete(user_pokemon)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete Pokémon', 'details': str(e)}), 400
    
    return jsonify({'message': 'Pokémon successfully removed from your collection'})