from flask_sqlalchemy import SQLAlchemy
import os

# Get the environment, defaulting to "development" if not set
environment = os.getenv("FLASK_ENV", "development")

# Get the schema, defaulting to an empty string if not set
SCHEMA = os.environ.get("SCHEMA", "")

db = SQLAlchemy()

# Helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production" and SCHEMA:
        return f"{SCHEMA}.{attr}"
    else:
        return attr



# from flask_sqlalchemy import SQLAlchemy

# import os
# environment = os.getenv("FLASK_ENV")
# SCHEMA = os.environ.get("SCHEMA")


# db = SQLAlchemy()

# # helper function for adding prefix to foreign key column references in production
# def add_prefix_for_prod(attr):
#     if environment == "production":
#         return f"{SCHEMA}.{attr}"
#     else:
#         return attr
