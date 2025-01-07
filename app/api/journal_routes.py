from flask import Blueprint, request, jsonify
from datetime import datetime
from app.models import db, JournalEntry, Like
from app.forms import JournalEntryForm
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from app.config import Config
import os

journal_routes = Blueprint('journal', __name__)

UPLOAD_FOLDER = Config.UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@journal_routes.route('/post', methods=['POST'])
@login_required
def post_journal():
    form = JournalEntryForm()

    form['csrf_token'].data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        accomplishments = form.accomplishments.data
        weather = form.weather.data
        mood = form.mood.data
        date = form.date.data  
        photo = form.photo.data
        private = form.private.data

        if date:
            timestamp = date
        else:
            timestamp = db.func.current_timestamp()

        photo_url = None
        if photo:
            filename = secure_filename(photo.filename)
            photo_path = os.path.join(UPLOAD_FOLDER, filename)
            photo.save(photo_path)
            photo_url = f'/static/uploads/{filename}'

        new_entry = JournalEntry(
            user_id=current_user.id,
            title=title,
            content=content,
            accomplishments=accomplishments,
            weather=weather,
            mood=mood,
            timestamp=timestamp,
            photo_url=photo_url,
            private=private
        )

        db.session.add(new_entry)
        db.session.commit()

        return jsonify(new_entry.to_dict()), 201

    return {'errors': form.errors}, 400


@journal_routes.route('/<int:id>')
@login_required
def get_journal_entry(id):
    journal_entry = JournalEntry.query.get(id)

    if not journal_entry:
        return jsonify({'error': 'Journal entry not found'}), 404
    
    if journal_entry.user_id != current_user.id:
        return jsonify({'error': 'You can only view your own journal entries'}), 403
    
    return jsonify(journal_entry.to_dict())


@journal_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_entry(id):
    journal_entry = JournalEntry.query.get(id)

    if not journal_entry:
        return jsonify({'error': 'Journal entry not found'}), 404
    
    if journal_entry.user_id != current_user.id:
        return jsonify({'error': 'You can only view your own journal entries'}), 403

    data = request.get_json()
    title = data.get('title', journal_entry.title)
    content = data.get('content', journal_entry.content)
    accomplishments = data.get('accomplishments', journal_entry.accomplishments)
    weather = data.get('weather', journal_entry.weather)
    mood = data.get('mood', journal_entry.mood)
    date = data.get('date', journal_entry.timestamp)
    photo = data.get('photo_url', journal_entry.photo_url)
    private = data.get('private', journal_entry.private)

    if date and isinstance(date, str):
        try:
            timestamp = datetime.strptime(date, '%Y-%m-%d')
        except ValueError:
            return jsonify({'error': 'Invalid date format, use YYYY-MM-DD'}), 400
    else:
        timestamp = journal_entry.timestamp

    journal_entry.title = title
    journal_entry.content = content
    journal_entry.accomplishments = accomplishments
    journal_entry.weather = weather
    journal_entry.mood = mood
    journal_entry.timestamp = timestamp
    journal_entry.photo_url = photo
    journal_entry.private = private

    db.session.commit()

    return jsonify({'message': 'Journal entry updated successfully', 'journal_entry': journal_entry.to_dict()})


@journal_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_journal_entry(id):
    journal_entry = JournalEntry.query.get(id)

    if not journal_entry:
        return jsonify({'error': 'Journal entry not found'}), 404
    
    if journal_entry.user_id != current_user.id:
        return jsonify({'error': 'You can only view your own journal entries'}), 403

    db.session.delete(journal_entry)
    db.session.commit()

    return jsonify({'message': 'Journal entry successfully deleted'}), 200



@journal_routes.route('/all')
@login_required
def get_all_journal_entries():
    journal_entries = JournalEntry.query.filter_by(private=False).all()

    if not journal_entries:
        return jsonify({'error': 'No journal entries found'}), 404
    
    return jsonify([entry.to_dict() for entry in journal_entries])




@journal_routes.route('/')
@login_required
def get_user_journal():
    journal_entries = JournalEntry.query.filter_by(user_id=current_user.id).all()

    if not journal_entries:
        return jsonify({'error': 'No journal entries found'}), 404

    return jsonify([entry.to_dict() for entry in journal_entries])




@journal_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def like_journal_entry(id):
    journal_entry = JournalEntry.query.get(id)

    if not journal_entry:
        return jsonify({'error': 'Journal entry not found'}), 404
    
    existing_like = Like.query.filter_by(user_id=current_user.id, journal_entry_id=id).first()

    if existing_like:
        return jsonify({'error': 'You have already liked this entry'}), 400
    
    like = Like(user_id=current_user.id, journal_entry_id=id)
    db.session.add(like)
    db.session.commit()

    return jsonify({'message': 'Journal entry liked successfully', 'like': like.to_dict()}), 201


@journal_routes.route('/<int:journal_entry_id>/like', methods=['DELETE'])
@login_required
def unlike_journal_entry(journal_entry_id):
    like = Like.query.filter_by(user_id=current_user.id, journal_entry_id=journal_entry_id).first()

    if not like:
        return jsonify({'error': 'Like not found or already removed'}), 404

    db.session.delete(like)
    db.session.commit()

    return jsonify({'message': 'Like removed successfully'})
