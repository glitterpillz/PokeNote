from app.models import db, Pokemon, PokemonStat, environment, SCHEMA
from sqlalchemy.sql import text

# def seed_pokemon():
#     bulbasaur = Pokemon(
#         name="Bulbasaur",
#         types=["Grass", "Poison"],
#         image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png"
#     )
#     ivysaur = Pokemon(
#         name="Ivysaur",
#         types=["Grass", "Poison"],
#         image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/002.png"
#     )
#     venusaur = Pokemon(
#         name="Venusaur",
#         types=["Grass", "Poison"],
#         image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/003.png"
#     )

#     bulbasaur.stats = [
#         PokemonStat(stat_name="hp", stat_value=45),
#         PokemonStat(stat_name="attack", stat_value=49),
#         PokemonStat(stat_name="defense", stat_value=49),
#         PokemonStat(stat_name="speed", stat_value=45)
#     ]
#     ivysaur.stats = [
#         PokemonStat(stat_name="hp", stat_value=60),
#         PokemonStat(stat_name="attack", stat_value=62),
#         PokemonStat(stat_name="defense", stat_value=63),
#         PokemonStat(stat_name="speed", stat_value=60)
#     ]
#     venusaur.stats = [
#         PokemonStat(stat_name="hp", stat_value=80),
#         PokemonStat(stat_name="attack", stat_value=82),
#         PokemonStat(stat_name="defense", stat_value=83),
#         PokemonStat(stat_name="speed", stat_value=80)
#     ]

#     db.session.add(bulbasaur)
#     db.session.add(ivysaur)
#     db.session.add(venusaur)

#     db.session.commit()


# def undo_pokemon():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.pokemon_stats RESTART IDENTITY CASCADE;")
#         db.session.execute(f"TRUNCATE table {SCHEMA}.pokemons RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM pokemon_stats"))
#         db.session.execute(text("DELETE FROM pokemons"))

#     db.session.commit()


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
    charmander = Pokemon(
        name="Charmander",
        types=["Fire"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png"
    )
    charmeleon = Pokemon(
        name="Charmeleon",
        types=["Fire"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/005.png"
    )
    charizard = Pokemon(
        name="Charizard",
        types=["Fire", "Flying"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png"
    )
    squirtle = Pokemon(
        name="Squirtle",
        types=["Water"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png"
    )
    wartortle = Pokemon(
        name="Wartortle",
        types=["Water"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/008.png"
    )
    blastoise = Pokemon(
        name="Blastoise",
        types=["Water"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/009.png"
    )
    caterpie = Pokemon(
        name="Caterpie",
        types=["Bug"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/010.png"
    )
    metapod = Pokemon(
        name="Metapod",
        types=["Bug"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/011.png"
    )
    butterfree = Pokemon(
        name="Butterfree",
        types=["Bug", "Flying"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/012.png"
    )
    weedle = Pokemon(
        name="Weedle",
        types=["Bug", "Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/013.png"
    )
    kakuna = Pokemon(
        name="Kakuna",
        types=["Bug", "Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/014.png"
    )
    beedrill = Pokemon(
        name="Beedrill",
        types=["Bug", "Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/015.png"
    )
    # pidgey = Pokemon(
    #     name="Pidgey",
    #     types=["Normal", "Flying"],
    #     image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/016.png"
    # )
    # pidgeotto = Pokemon(
    #     name="Pidgeotto",
    #     types=["Normal", "Flying"],
    #     image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/017.png"
    # )
    # pidgeot = Pokemon(
    #     name="Pidgeot",
    #     types=["Normal", "Flying"],
    #     image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/018.png"
    # )
    # rattata = Pokemon(
    #     name="Rattata",
    #     types=["Normal"],
    #     image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/019.png"
    # )
    # raticate = Pokemon(
    #     name="Raticate",
    #     types=["Normal"],
    #     image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/020.png"
    # )
    # spearow = Pokemon(
    #     name="Spearow",
    #     types=["Normal", "Flying"],
    #     image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/021.png"
    # )
    # fearow = Pokemon(
    #     name="Fearow",
    #     types=["Normal", "Flying"],
    #     image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/022.png"
    # )
    
    
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
    charmander.stats = [
        PokemonStat(stat_name="hp", stat_value=39),
        PokemonStat(stat_name="attack", stat_value=52),
        PokemonStat(stat_name="defense", stat_value=43),
        PokemonStat(stat_name="speed", stat_value=65)
    ]
    charmeleon.stats = [
        PokemonStat(stat_name="hp", stat_value=58),
        PokemonStat(stat_name="attack", stat_value=64),
        PokemonStat(stat_name="defense", stat_value=58),
        PokemonStat(stat_name="speed", stat_value=80)
    ]
    charizard.stats = [
        PokemonStat(stat_name="hp", stat_value=78),
        PokemonStat(stat_name="attack", stat_value=84),
        PokemonStat(stat_name="defense", stat_value=78),
        PokemonStat(stat_name="speed", stat_value=100)
    ]
    squirtle.stats = [
        PokemonStat(stat_name="hp", stat_value=44),
        PokemonStat(stat_name="attack", stat_value=48),
        PokemonStat(stat_name="defense", stat_value=65),
        PokemonStat(stat_name="speed", stat_value=43)
    ]
    wartortle.stats = [
        PokemonStat(stat_name="hp", stat_value=59),
        PokemonStat(stat_name="attack", stat_value=63),
        PokemonStat(stat_name="defense", stat_value=80),
        PokemonStat(stat_name="speed", stat_value=58)
    ]
    blastoise.stats = [
        PokemonStat(stat_name="hp", stat_value=79),
        PokemonStat(stat_name="attack", stat_value=83),
        PokemonStat(stat_name="defense", stat_value=100),
        PokemonStat(stat_name="speed", stat_value=78)
    ]
    caterpie.stats = [
        PokemonStat(stat_name="hp", stat_value=45),
        PokemonStat(stat_name="attack", stat_value=30),
        PokemonStat(stat_name="defense", stat_value=35),
        PokemonStat(stat_name="speed", stat_value=45)
    ]
    metapod.stats = [
        PokemonStat(stat_name="hp", stat_value=50),
        PokemonStat(stat_name="attack", stat_value=20),
        PokemonStat(stat_name="defense", stat_value=55),
        PokemonStat(stat_name="speed", stat_value=30)
    ]
    butterfree.stats = [
        PokemonStat(stat_name="hp", stat_value=60),
        PokemonStat(stat_name="attack", stat_value=45),
        PokemonStat(stat_name="defense", stat_value=50),
        PokemonStat(stat_name="speed", stat_value=70)
    ]
    weedle.stats = [
        PokemonStat(stat_name="hp", stat_value=40),
        PokemonStat(stat_name="attack", stat_value=35),
        PokemonStat(stat_name="defense", stat_value=30),
        PokemonStat(stat_name="speed", stat_value=50)
    ]
    kakuna.stats = [
        PokemonStat(stat_name="hp", stat_value=45),
        PokemonStat(stat_name="attack", stat_value=25),
        PokemonStat(stat_name="defense", stat_value=50),
        PokemonStat(stat_name="speed", stat_value=35)
    ]
    beedrill.stats = [
        PokemonStat(stat_name="hp", stat_value=65),
        PokemonStat(stat_name="attack", stat_value=80),
        PokemonStat(stat_name="defense", stat_value=40),
        PokemonStat(stat_name="speed", stat_value=75)
    ]


    db.session.add(bulbasaur)
    db.session.add(ivysaur)
    db.session.add(venusaur)
    db.session.add(charmander)
    db.session.add(charmeleon)
    db.session.add(charizard)
    db.session.add(squirtle)
    db.session.add(wartortle)
    db.session.add(blastoise)
    db.session.add(caterpie)
    db.session.add(metapod)
    db.session.add(butterfree)
    db.session.add(weedle)
    db.session.add(kakuna)
    db.session.add(beedrill)


    db.session.commit()

def undo_pokemon():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pokemon_stats RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pokemons RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pokemon_stats"))
        db.session.execute(text("DELETE FROM pokemons"))

    db.session.commit()

