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
        can_fly=True,
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
    pidgey = Pokemon(
        name="Pidgey",
        types=["Normal", "Flying"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/016.png"
    )
    pidgeotto = Pokemon(
        name="Pidgeotto",
        types=["Normal", "Flying"],
        can_fly=True,
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/017.png"
    )
    pidgeot = Pokemon(
        name="Pidgeot",
        types=["Normal", "Flying"],
        can_fly=True,
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/018.png"
    )
    rattata = Pokemon(
        name="Rattata",
        types=["Normal"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/019.png"
    )
    #20
    raticate = Pokemon(
        name="Raticate",
        types=["Normal"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/020.png"
    )
    #21
    spearow = Pokemon(
        name="Spearow",
        types=["Normal", "Flying"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/021.png"
    )
    #22
    fearow = Pokemon(
        name="Fearow",
        types=["Normal", "Flying"],
        can_fly=True,
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/022.png"
    )
    #23
    ekans = Pokemon(
        name="Ekans",
        types=["Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/023.png"
    )
    #24
    arbok = Pokemon(
        name="Arbok",
        types=["Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/024.png"
    )
    #25
    pikachu = Pokemon(
        name="Pikachu",
        types=["Electric"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
    )
    #26
    raichu = Pokemon(
        name="Raichu",
        types=["Electric"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/026.png"
    )
    #27
    sandshrew = Pokemon(
        name="Sandshrew",
        types=["Ground"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/027.png"
    )
    #28
    sandslash = Pokemon(
        name="Sandslash",
        types=["Ground"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/028.png"
    )
    #29
    nidoran_f = Pokemon(
        name="Nidoran",
        types=["Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/029.png"
    )
    #30
    nidorina = Pokemon(
        name="Nidorina",
        types=["Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/030.png"
    )
    #31
    nidoqueen = Pokemon(
        name="Nidoqueen",
        types=["Poison", "Ground"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/031.png"
    )
    #32
    nidoran_m = Pokemon(
        name="Nidoran",
        types=["Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/032.png"
    )
    #33
    nidorino = Pokemon(
        name="Nidorino",
        types=["Poison"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/033.png"
    )
    #34
    nidoking = Pokemon(
        name="Nidoking",
        types=["Poison", "Ground"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/034.png"
    )
    #35
    clefairy = Pokemon(
        name="Clefairy",
        types=["Fairy"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/035.png"
    )
    #36
    clefable = Pokemon(
        name="Clefable",
        types=["Fairy"],
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/036.png"
    )


    
    bulbasaur.stats = [
        PokemonStat(stat_name="hp", stat_value=45),
        PokemonStat(stat_name="attack", stat_value=49),
        PokemonStat(stat_name="defense", stat_value=49),
        PokemonStat(stat_name="sp attack", stat_value=65),
        PokemonStat(stat_name="sp defense", stat_value=65),
        PokemonStat(stat_name="speed", stat_value=45)
    ]
    ivysaur.stats = [
        PokemonStat(stat_name="hp", stat_value=60),
        PokemonStat(stat_name="attack", stat_value=62),
        PokemonStat(stat_name="defense", stat_value=63),
        PokemonStat(stat_name="sp attack", stat_value=80),
        PokemonStat(stat_name="sp defense", stat_value=80),
        PokemonStat(stat_name="speed", stat_value=60)
    ]
    venusaur.stats = [
        PokemonStat(stat_name="hp", stat_value=80),
        PokemonStat(stat_name="attack", stat_value=82),
        PokemonStat(stat_name="defense", stat_value=83),
        PokemonStat(stat_name="sp attack", stat_value=100),
        PokemonStat(stat_name="sp defense", stat_value=100),
        PokemonStat(stat_name="speed", stat_value=80)
    ]
    charmander.stats = [
        PokemonStat(stat_name="hp", stat_value=39),
        PokemonStat(stat_name="attack", stat_value=52),
        PokemonStat(stat_name="defense", stat_value=43),
        PokemonStat(stat_name="sp attack", stat_value=60),
        PokemonStat(stat_name="sp defense", stat_value=50),
        PokemonStat(stat_name="speed", stat_value=65)
    ]
    charmeleon.stats = [
        PokemonStat(stat_name="hp", stat_value=58),
        PokemonStat(stat_name="attack", stat_value=64),
        PokemonStat(stat_name="defense", stat_value=58),
        PokemonStat(stat_name="sp attack", stat_value=80),
        PokemonStat(stat_name="sp defense", stat_value=65),
        PokemonStat(stat_name="speed", stat_value=80)
    ]
    charizard.stats = [
        PokemonStat(stat_name="hp", stat_value=78),
        PokemonStat(stat_name="attack", stat_value=84),
        PokemonStat(stat_name="defense", stat_value=78),
        PokemonStat(stat_name="sp attack", stat_value=109),
        PokemonStat(stat_name="sp defense", stat_value=85),
        PokemonStat(stat_name="speed", stat_value=100)
    ]
    squirtle.stats = [
        PokemonStat(stat_name="hp", stat_value=44),
        PokemonStat(stat_name="attack", stat_value=48),
        PokemonStat(stat_name="defense", stat_value=65),
        PokemonStat(stat_name="sp attack", stat_value=50),
        PokemonStat(stat_name="sp defense", stat_value=64),
        PokemonStat(stat_name="speed", stat_value=43)
    ]
    wartortle.stats = [
        PokemonStat(stat_name="hp", stat_value=59),
        PokemonStat(stat_name="attack", stat_value=63),
        PokemonStat(stat_name="defense", stat_value=80),
        PokemonStat(stat_name="sp attack", stat_value=65),
        PokemonStat(stat_name="sp defense", stat_value=80),
        PokemonStat(stat_name="speed", stat_value=58)
    ]
    blastoise.stats = [
        PokemonStat(stat_name="hp", stat_value=79),
        PokemonStat(stat_name="attack", stat_value=83),
        PokemonStat(stat_name="defense", stat_value=100),
        PokemonStat(stat_name="sp attack", stat_value=85),
        PokemonStat(stat_name="sp defense", stat_value=105),
        PokemonStat(stat_name="speed", stat_value=78)
    ]
    caterpie.stats = [
        PokemonStat(stat_name="hp", stat_value=45),
        PokemonStat(stat_name="attack", stat_value=30),
        PokemonStat(stat_name="defense", stat_value=35),
        PokemonStat(stat_name="sp attack", stat_value=20),
        PokemonStat(stat_name="sp defense", stat_value=20),
        PokemonStat(stat_name="speed", stat_value=45)
    ]
    metapod.stats = [
        PokemonStat(stat_name="hp", stat_value=50),
        PokemonStat(stat_name="attack", stat_value=20),
        PokemonStat(stat_name="defense", stat_value=55),
        PokemonStat(stat_name="sp attack", stat_value=25),
        PokemonStat(stat_name="sp defense", stat_value=25),
        PokemonStat(stat_name="speed", stat_value=30)
    ]
    butterfree.stats = [
        PokemonStat(stat_name="hp", stat_value=60),
        PokemonStat(stat_name="attack", stat_value=45),
        PokemonStat(stat_name="defense", stat_value=50),
        PokemonStat(stat_name="sp attack", stat_value=90),
        PokemonStat(stat_name="sp defense", stat_value=80),
        PokemonStat(stat_name="speed", stat_value=70)
    ]
    weedle.stats = [
        PokemonStat(stat_name="hp", stat_value=40),
        PokemonStat(stat_name="attack", stat_value=35),
        PokemonStat(stat_name="defense", stat_value=30),
        PokemonStat(stat_name="sp attack", stat_value=20),
        PokemonStat(stat_name="sp defense", stat_value=20),
        PokemonStat(stat_name="speed", stat_value=50)
    ]
    kakuna.stats = [
        PokemonStat(stat_name="hp", stat_value=45),
        PokemonStat(stat_name="attack", stat_value=25),
        PokemonStat(stat_name="defense", stat_value=50),
        PokemonStat(stat_name="sp attack", stat_value=25),
        PokemonStat(stat_name="sp defense", stat_value=25),
        PokemonStat(stat_name="speed", stat_value=35)
    ]
    pidgey.stats = [
        PokemonStat(stat_name="hp", stat_value=40),
        PokemonStat(stat_name="attack", stat_value=45),
        PokemonStat(stat_name="defense", stat_value=40),
        PokemonStat(stat_name="sp attack", stat_value=35),
        PokemonStat(stat_name="sp defense", stat_value=35),
        PokemonStat(stat_name="speed", stat_value=56)
    ]
    pidgeotto.stats = [
        PokemonStat(stat_name="hp", stat_value=63),
        PokemonStat(stat_name="attack", stat_value=60),
        PokemonStat(stat_name="defense", stat_value=55),
        PokemonStat(stat_name="sp attack", stat_value=50),
        PokemonStat(stat_name="sp defense", stat_value=50),
        PokemonStat(stat_name="speed", stat_value=71)
    ]
    pidgeot.stats = [
        PokemonStat(stat_name="hp", stat_value=83),
        PokemonStat(stat_name="attack", stat_value=80),
        PokemonStat(stat_name="defense", stat_value=75),
        PokemonStat(stat_name="sp attack", stat_value=70),
        PokemonStat(stat_name="sp defense", stat_value=70),
        PokemonStat(stat_name="speed", stat_value=101)
    ]
    rattata.stats = [
        PokemonStat(stat_name="hp", stat_value=30),
        PokemonStat(stat_name="attack", stat_value=56),
        PokemonStat(stat_name="defense", stat_value=35),
        PokemonStat(stat_name="sp attack", stat_value=25),
        PokemonStat(stat_name="sp defense", stat_value=35),
        PokemonStat(stat_name="speed", stat_value=72)
    ]
    raticate.stats = [
        PokemonStat(stat_name="hp", stat_value=55),
        PokemonStat(stat_name="attack", stat_value=81),
        PokemonStat(stat_name="defense", stat_value=60),
        PokemonStat(stat_name="sp attack", stat_value=50),
        PokemonStat(stat_name="sp defense", stat_value=70),
        PokemonStat(stat_name="speed", stat_value=97)
    ]
    spearow.stats = [
        PokemonStat(stat_name="hp", stat_value=40),
        PokemonStat(stat_name="attack", stat_value=60),
        PokemonStat(stat_name="defense", stat_value=30),
        PokemonStat(stat_name="sp attack", stat_value=31),
        PokemonStat(stat_name="sp defense", stat_value=31),
        PokemonStat(stat_name="speed", stat_value=70)
    ]
    fearow.stats = [
        PokemonStat(stat_name="hp", stat_value=65),
        PokemonStat(stat_name="attack", stat_value=90),
        PokemonStat(stat_name="defense", stat_value=65),
        PokemonStat(stat_name="sp attack", stat_value=61),
        PokemonStat(stat_name="sp defense", stat_value=61),
        PokemonStat(stat_name="speed", stat_value=100)
    ]
    ekans.stats = [
        PokemonStat(stat_name="hp", stat_value=35),
        PokemonStat(stat_name="attack", stat_value=60),
        PokemonStat(stat_name="defense", stat_value=44),
        PokemonStat(stat_name="sp attack", stat_value=40),
        PokemonStat(stat_name="sp defense", stat_value=54),
        PokemonStat(stat_name="speed", stat_value=55)
    ]
    arbok.stats = [
        PokemonStat(stat_name="hp", stat_value=60),
        PokemonStat(stat_name="attack", stat_value=95),
        PokemonStat(stat_name="defense", stat_value=69),
        PokemonStat(stat_name="sp attack", stat_value=65),
        PokemonStat(stat_name="sp defense", stat_value=79),
        PokemonStat(stat_name="speed", stat_value=80)
    ]
    pikachu.stats = [
        PokemonStat(stat_name="hp", stat_value=35),
        PokemonStat(stat_name="attack", stat_value=55),
        PokemonStat(stat_name="defense", stat_value=40),
        PokemonStat(stat_name="sp attack", stat_value=50),
        PokemonStat(stat_name="sp defense", stat_value=50),
        PokemonStat(stat_name="speed", stat_value=90)
    ]
    raichu.stats = [
        PokemonStat(stat_name="hp", stat_value=60),
        PokemonStat(stat_name="attack", stat_value=90),
        PokemonStat(stat_name="defense", stat_value=55),
        PokemonStat(stat_name="sp attack", stat_value=90),
        PokemonStat(stat_name="sp defense", stat_value=80),
        PokemonStat(stat_name="speed", stat_value=110)
    ]
    sandshrew.stats = [
        PokemonStat(stat_name="hp", stat_value=50),
        PokemonStat(stat_name="attack", stat_value=75),
        PokemonStat(stat_name="defense", stat_value=85),
        PokemonStat(stat_name="sp attack", stat_value=20),
        PokemonStat(stat_name="sp defense", stat_value=30),
        PokemonStat(stat_name="speed", stat_value=40)
    ]
    sandslash.stats = [
        PokemonStat(stat_name="hp", stat_value=75),
        PokemonStat(stat_name="attack", stat_value=100),
        PokemonStat(stat_name="defense", stat_value=110),
        PokemonStat(stat_name="sp attack", stat_value=45),
        PokemonStat(stat_name="sp defense", stat_value=55),
        PokemonStat(stat_name="speed", stat_value=65)
    ]
    nidoran_f.stats = [
        PokemonStat(stat_name="hp", stat_value=55),
        PokemonStat(stat_name="attack", stat_value=47),
        PokemonStat(stat_name="defense", stat_value=52),
        PokemonStat(stat_name="sp attack", stat_value=40),
        PokemonStat(stat_name="sp defense", stat_value=40),
        PokemonStat(stat_name="speed", stat_value=41)
    ]
    nidorina.stats = [
        PokemonStat(stat_name="hp", stat_value=70),
        PokemonStat(stat_name="attack", stat_value=62),
        PokemonStat(stat_name="defense", stat_value=67),
        PokemonStat(stat_name="sp attack", stat_value=55),
        PokemonStat(stat_name="sp defense", stat_value=55),
        PokemonStat(stat_name="speed", stat_value=56)
    ]
    nidoqueen.stats = [
        PokemonStat(stat_name="hp", stat_value=90),
        PokemonStat(stat_name="attack", stat_value=92),
        PokemonStat(stat_name="defense", stat_value=87),
        PokemonStat(stat_name="sp attack", stat_value=75),
        PokemonStat(stat_name="sp defense", stat_value=85),
        PokemonStat(stat_name="speed", stat_value=76)
    ]
    nidoran_m.stats = [
        PokemonStat(stat_name="hp", stat_value=46),
        PokemonStat(stat_name="attack", stat_value=57),
        PokemonStat(stat_name="defense", stat_value=40),
        PokemonStat(stat_name="sp attack", stat_value=40),
        PokemonStat(stat_name="sp defense", stat_value=40),
        PokemonStat(stat_name="speed", stat_value=50)
    ]
    nidorino.stats = [
        PokemonStat(stat_name="hp", stat_value=61),
        PokemonStat(stat_name="attack", stat_value=72),
        PokemonStat(stat_name="defense", stat_value=57),
        PokemonStat(stat_name="sp attack", stat_value=55),
        PokemonStat(stat_name="sp defense", stat_value=55),
        PokemonStat(stat_name="speed", stat_value=65)
    ]
    nidoking.stats = [
        PokemonStat(stat_name="hp", stat_value=81),
        PokemonStat(stat_name="attack", stat_value=102),
        PokemonStat(stat_name="defense", stat_value=77),
        PokemonStat(stat_name="sp attack", stat_value=85),
        PokemonStat(stat_name="sp defense", stat_value=75),
        PokemonStat(stat_name="speed", stat_value=85)
    ]
    clefairy.stats = [
        PokemonStat(stat_name="hp", stat_value=70),
        PokemonStat(stat_name="attack", stat_value=45),
        PokemonStat(stat_name="defense", stat_value=48),
        PokemonStat(stat_name="sp attack", stat_value=60),
        PokemonStat(stat_name="sp defense", stat_value=65),
        PokemonStat(stat_name="speed", stat_value=35)
    ]
    clefable.stats = [
        PokemonStat(stat_name="hp", stat_value=95),
        PokemonStat(stat_name="attack", stat_value=70),
        PokemonStat(stat_name="defense", stat_value=73),
        PokemonStat(stat_name="sp attack", stat_value=95),
        PokemonStat(stat_name="sp defense", stat_value=90),
        PokemonStat(stat_name="speed", stat_value=60)
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
    db.session.add(pidgey)
    db.session.add(pidgeotto)
    db.session.add(pidgeot)
    db.session.add(rattata)
    db.session.add(raticate)
    db.session.add(spearow)
    db.session.add(fearow)
    db.session.add(ekans)
    db.session.add(arbok)
    db.session.add(pikachu)
    db.session.add(raichu)
    db.session.add(sandshrew)
    db.session.add(sandslash)
    db.session.add(nidoran_f)
    db.session.add(nidorina)
    db.session.add(nidoqueen)
    db.session.add(nidoran_m)
    db.session.add(nidorino)
    db.session.add(nidoking)
    db.session.add(clefairy)
    db.session.add(clefable)

    db.session.commit()

def undo_pokemon():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pokemon_stats RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pokemons RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pokemon_stats"))
        db.session.execute(text("DELETE FROM pokemons"))

    db.session.commit()

