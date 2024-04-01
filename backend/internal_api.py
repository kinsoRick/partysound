from requests import get
import logging
from typing import List, Dict, Union
import json

ERROR_HTTP_CODES = list(range(400, 512))
GROUP_ID = '-216897464'

class VKAPI:
    def __init__(self, token: str, group_token: str, user_agent: str) -> None:
        self.token = token
        self.group_token = group_token
        self.user_agent = user_agent

    def __call(self, v: str, method: str, additional_params: Dict[str, Union[str, int]], is_group = False) -> Union[int, List[Dict[str, Union[str, int]]]]:
        url = 'https://api.vk.com/method/' + method

        if is_group:
            params = {
                'access_token': self.group_token,
                'v': v,
                **additional_params
            }
        else: 
            params = {
                'access_token': self.token,
                'v': v,
                **additional_params
            }

        headers = {
            'User-Agent': self.user_agent,
        }

        response = get(url, params=params, headers=headers)
        if response.status_code in ERROR_HTTP_CODES:
            self.__process_error({
                'data': response.json()['error'],
                'method': method,
            })

        response = response.json()
        if 'error' in response:
            return self.__process_error({
                'data': response['error'],
                'method': method,
            })
        return response['response']

    def __process_error(self, error: Dict[str, Union[Dict[str, Union[str, int]], str]]) -> Union[int, None]:
        data = error['data']
        method = error['method']

        if method == 'audio.get':
            if data['error_code'] != 201:
                return logging.critical(f"[VKAPI -> {error['method']}]: {data}")
            return False
        
        if method == 'execute.savePlaylist':
            if data['error_code'] != 10:
                return logging.critical(f"[VKAPI -> {error['method']}]: {data}")
            return False

        return logging.critical(f"[VKAPI -> {error['method']}]: {data}")

    def get_tracks(self, id: int) -> List[Dict[str, Union[str, int]]]:
        params = {
            'count': 3000,
            'owner_id': id
        }

        tracks = self.__call('5.131', 'audio.get', params)
        if tracks:
            return tracks['items']
        else:
            return None
        
    def create_playlist(self, title):
        params = {
            'title': title,
            'description': 'PARTYSOUND - VK MINI APP. Создано в мини приложении PARTYSOUND',
            'owner_id': GROUP_ID,
        }
        playlist_info = self.__call('5.131', 'audio.createPlaylist', params)

        return playlist_info['id']

    def get_playlist_info(self, playlist_id: int) -> Dict[str, Union[str, int]]:
        params = {
            'owner_id': GROUP_ID,
            'playlist_id': playlist_id
        }

        playlist = self.__call('5.131', 'audio.getPlaylistById', params)
        with open('a.json', 'w', encoding='UTF-8') as file:
            json.dump(playlist, file, indent=4)
        return {
            'id': playlist['id'],
            'owner_id': playlist['owner_id'],
            'create_time': playlist['create_time'],
            'description': playlist['description'],
            'count': playlist['count'],
            'title': playlist['title'],
            'thumbs': playlist['thumbs']
        }

    def save_playlist(self, id: int, tracks: List[str], title) -> None:
        params = {
            'playlist_id': str(id),
            'owner_id': GROUP_ID,
            'title': title,
            'audio_ids_to_add': ','.join(tracks)
        }
        self.__call('5.131', 'execute.savePlaylist', params)
    
    def send_community_message(self, user_id: int, message: str) -> None:
        params = {
            'user_id': user_id,
            'random_id': 0,
            'message': message,
        }

        self.__call('5.131', 'messages.send', params, is_group=True)


if __name__ == '__main__':
    api = VKAPI('vk1.a.EVxdG8BWZvZd_2MJSMMmbesNzKArbu1L9HGNLuI7ecRcC627jejGZB9k6_atBVtKk4KZGMSW-okIRbu9whCUOLqIDhCX8XRzw2cHiSC__qRveRAvnwAV6DQaURijlZhc2T2HRE3_7B94mU9lvWoFj4vY3YsDDJYPgV4P2WwjsckrEhKMUSZYLx6804-f3S8n',
                'VKAndroidApp/5.52-4543 (Android 5.1.1; SDK 22; x86_64; unknown Android SDK built for x86_64; en; 320x240)')
    
    response = api.get_tracks(476389050)
    with open("476389050.json", "w", encoding='utf-8') as file:
        json.dump(response, file, indent=4)