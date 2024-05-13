from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass

db = SQLAlchemy()

@dataclass
class Playlist(db.Model):
    id: int
    user_id: str
    title: str
    track_count: int
    owner_id: str
    playlist_id: str

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), nullable=False)
    playlist_id = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(100))  
    creation_date = db.Column(db.DateTime, default=datetime.now(timezone.utc)) 
    track_count = db.Column(db.Integer)
    