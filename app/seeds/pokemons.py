from app.models import db, Pokemon, PokemonStat, environment, SCHEMA
from sqlalchemy.sql import text

def seed_pokemon():
    bulbasaur = Pokemon(
        name="Bulbasaur",
        types=["Grass", "Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png"
    )
    ivysaur = Pokemon(
        name="Ivysaur",
        types=["Grass", "Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/002.png"
    )
    venusaur = Pokemon(
        name="Venusaur",
        types=["Grass", "Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/003.png"
    )

    bulbasaur.stats = [
        PokemonStat(stat_name="hp", stat_value=45),
        PokemonStat(stat_name="attack", stat_value=49),
        PokemonStat(stat_name="defense", stat_value=49),
        PokemonStat(stat_name="speed", stat_value=45)
    ]
    ivysaur.stats = [
        PokemonStat(stat_name="hp", stat_value=60),
        PokemonStat(stat_name="attack", stat_value=62),
        PokemonStat(stat_name="defense", stat_value=63),
        PokemonStat(stat_name="speed", stat_value=60)
    ]
    venusaur.stats = [
        PokemonStat(stat_name="hp", stat_value=80),
        PokemonStat(stat_name="attack", stat_value=82),
        PokemonStat(stat_name="defense", stat_value=83),
        PokemonStat(stat_name="speed", stat_value=80)
    ]

    db.session.add(bulbasaur)
    db.session.add(ivysaur)
    db.session.add(venusaur)

    db.session.commit()


def undo_pokemon():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pokemon_stats RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pokemons RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pokemon_stats"))
        db.session.execute(text("DELETE FROM pokemons"))

    db.session.commit()
