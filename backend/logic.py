from internal_api import VKAPI
from cachetools import TTLCache
from typing import List
from collections import Counter
from os import environ

CREDENTIALS = {
    'token': environ.get('TOKEN'),
    'group_token': environ.get('GROUP_TOKEN'),
    'user_agent': environ.get('USER_AGENT')
}

users_cache = TTLCache(maxsize=50, ttl=1200)
user_denied_cache = TTLCache(maxsize=50, ttl=1800)

api = VKAPI(CREDENTIALS['token'], CREDENTIALS['group_token'], CREDENTIALS['user_agent'])

class UserAudios:
    def __init__(self, id: str) -> None:
        self.id = str(id)
        self.denied = (id in user_denied_cache)
        self.tracks = {}

        if self.denied:
            return

        tracks = api.get_tracks(self.id)
        if tracks:
            self.__process_tracks(tracks)
        else:
            self.denied = True
        
    def __process_tracks(self, tracks):
        if len(tracks) < 1: return []
        for track in tracks:
            if not f"{track['artist']} - {track['title']}" in self.tracks:
                self.tracks[f"{track['artist']} - {track['title']}"] = f"{track['owner_id']}_{track['id']}"

def common_elements(dicts, n):
    if not dicts or not all(isinstance(d, dict) for d in dicts):
        return {}

    key_counter = Counter()
    for d in dicts:
        key_counter.update(d.keys())

    common_keys = {key for key, count in key_counter.items() if count >= n}
    common_elements_dict = {key: [d[key] for d in dicts if key in d] for key in common_keys}

    return common_elements_dict

def get_common_tracks(users: List[UserAudios], count_to_add):
    all_user_audios = []
    for user in users:
        all_user_audios.append(user.tracks)

    common_dict = common_elements(all_user_audios, count_to_add)
    tracks_to_add = [track[0] for track in common_dict.values()]
    return tracks_to_add

def get_user(user_id) -> UserAudios:
    if str(user_id) in users_cache:
        user = users_cache.get(str(user_id))
        print(f"{user_id} from cache!")
    else:
        print(f"{user_id} not from cache!")
        user = UserAudios(str(user_id))
        users_cache[str(user_id)] = user
    return user

def send_playlist_message(to, owner_id, playlist_id):
    return api.send_community_message(
        to, f"https://vk.com/music/playlist/{owner_id}_{playlist_id}"
    )

def get_new_playlist(user_ids, occurences_to_track_add, title):
    validated_users = [get_user(user) for user in user_ids if not get_user(user).denied]
    
    tracks = get_common_tracks(validated_users, occurences_to_track_add)
    playlist_id = api.create_playlist(title)
    api.save_playlist(playlist_id, tracks, title)
    new_playlist_info = api.get_playlist_info(playlist_id)

    return new_playlist_info

if __name__ == '__main__':
    ids = [403139993, 494109318, 476389050]
    validated_users = []
    for id in ids:
        if str(id) in users_cache:
            user = users_cache.get(str(id))
        else:
            user = UserAudios(id)
            if not user.user_denied:
                users_cache[str(id)] = user
                validated_users.append(user)
    
    tracks = get_common_tracks(validated_users, 2)
    api.create_playlist("ТЕСТ 5", tracks)