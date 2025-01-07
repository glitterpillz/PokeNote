from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    # Clear existing data
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    # Add new users
    admin = User(
        username='admin',
        email='admin@example.com',
        password='password',
        fname='Admin',
        lname='User',
        admin=True
    )    
    demo = User(
        username='demo',
        email='demo@example.com',
        password='password',
        fname='Demo',
        lname='User',
        admin=False,
        profile_picture='https://i.ibb.co/bJPCvPt/profile-picture.jpg',
        banner_url='https://i.ibb.co/864V411/banner.jpg'
    )
    glitterpillz = User(
        username='glitterpillz',
        email='glitter@example.com',
        password='password',
        fname='Karen',
        lname='Hickey',
        admin=False
    )

    db.session.add(admin)
    db.session.add(demo)
    db.session.add(glitterpillz)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
