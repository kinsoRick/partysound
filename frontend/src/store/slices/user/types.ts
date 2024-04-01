export interface IPlaylist {
  id: number;
  owner_id: string;
  title: string;
  track_count: number;
  user_id: string;
  playlist_id: string;
};

export interface IUserState {
  id: number;
  accessToken: string;
  firstName: string;
  lastName: string;
  photo: string;
  scopes: string[];
  closed: boolean;
  playlists: IPlaylist[];
  currentPlaylist: IPlaylist | null;
}
