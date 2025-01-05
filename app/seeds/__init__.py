from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pokemons import seed_pokemon, undo_pokemon
from .journal_entries import seed_journal_entries, undo_journal_entries
from .user_pokemon import seed_user_pokemon, undo_user_pokemon

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_pokemon()
        undo_journal_entries()
        undo_user_pokemon()
    seed_users()
    seed_pokemon()
    seed_journal_entries()
    seed_user_pokemon()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_pokemon()
    undo_journal_entries()
    undo_user_pokemon()
    # Add other undo functions here
