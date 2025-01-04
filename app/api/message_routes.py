from flask import Blueprint, jsonify, request
from app.models import User, Message, db
from flask_login import current_user, login_required

message_routes = Blueprint('messages', __name__)

@message_routes.route('/send', methods=['POST'])
@login_required
def send_message():
    """
    Sends a message from the current user to another user using their username.
    """
    data = request.get_json()
    receiver_username = data.get('receiver')
    content = data.get('content')

    if not receiver_username or not content:
        return jsonify({'error': 'Receiver username and content are required'}), 400

    receiver = User.query.filter_by(username=receiver_username).first()
    if not receiver:
        return jsonify({'error': f'User with username "{receiver_username}" not found'}), 404

    message = Message(
        sender_id=current_user.id,
        receiver_id=receiver.id,
        content=content
    )

    db.session.add(message)
    db.session.commit()

    return jsonify({'message': 'Message sent successfully', 'sent_message': message.to_dict()}), 201


@message_routes.route('/inbox')
@login_required
def get_inbox():
    inbox = Message.query.filter(Message.receiver_id == current_user.id).all()

    if inbox:
        return jsonify([message.to_dict() for message in inbox])
    else:
        return jsonify({'error': f'No messages found for User {current_user.id}.'}), 404
    

@message_routes.route('/sent')
@login_required
def get_sent_box():
    sent_box = Message.query.filter(Message.sender_id == current_user.id).all()

    if sent_box:
        return jsonify([message.to_dict() for message in sent_box])
    else:
        return jsonify({'error': f'No messages found for User {current_user.id}.'}), 404