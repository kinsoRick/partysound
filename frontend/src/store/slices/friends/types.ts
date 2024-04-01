export type TFriendItem = {
  id: number;
  photo_200_orig: string;
  first_name: string;
  last_name: string;
  is_closed: boolean;
};

export interface IFriendsState {
  status: 'pending' | 'fulfilled' | 'error' | 'idle',
  all: TFriendItem[];
  selected: TFriendItem[];
  filtered: TFriendItem[];
  closed: number[];
}
