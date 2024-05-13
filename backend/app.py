from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from logic import get_new_playlist, get_user, send_playlist_message
from models import db, Playlist

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://username:password@postgres:5432/dbname')

# TODO: Добавить логику прицепить всё это к эндпоинтам
db.init_app(app)
CORS(app)

@app.route('/playlists/get', methods=['GET'])
def get_user_playlists():
    user_id = str(request.headers.get('X-USER-ID'))
    user_playlists = Playlist.query.filter_by(user_id=user_id).all()

    return jsonify(user_playlists)

@app.route('/playlist/delete', methods=['POST'])
def delete_playlist():
    data = request.json
    user_id = str(request.headers.get('X-USER-ID'))

    playlist_id = data['playlist_id']

    user_playlist = Playlist.query.filter_by(user_id=user_id, playlist_id=playlist_id).first()
    db.session.delete(user_playlist)
    db.session.commit()

    return jsonify(user_playlist)

@app.route('/playlist/send', methods=['POST'])
def send_playlist():
    data = request.json
    user_id = str(request.headers.get('X-USER-ID'))

    playlist_id = data['playlist_id']

    user_playlist = Playlist.query.filter_by(user_id=user_id, playlist_id=playlist_id).first()
    send_playlist_message(user_id, user_playlist.owner_id, user_playlist.playlist_id)

    return jsonify(user_playlist)


@app.route('/playlist/create', methods=['POST'])
def create_playlist():
    data = request.json
    
    user_id = request.headers.get('X-USER-ID')
    user_ids = data['user_ids']
    title = data['title']
    occurences_to_track_add = data['occurences_to_track_add']

    playlist = get_new_playlist(user_ids, occurences_to_track_add, title)

    playlist_to_db = Playlist(
        title = playlist['title'],
        track_count = playlist['count'],
        user_id = str(user_id),
        owner_id = str(playlist['owner_id']),
        playlist_id = str(playlist['id'])
    )

    db.session.add(playlist_to_db)
    db.session.commit()
    return jsonify(playlist_to_db)

@app.route('/check_denied_users', methods=['POST'])
def check_denied_users():
    data = request.json
    
    user_ids = data['user_ids']
    users_denied = [user_id for user_id in user_ids if get_user(user_id).denied]
    return jsonify(users_denied)

