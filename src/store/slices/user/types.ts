export interface IUserState {
  id: number;
  accessToken: string;
  firstName: string;
  lastName: string;
  photo: string;
  scopes: string[];
  closed: boolean;
}
