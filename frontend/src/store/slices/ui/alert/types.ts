export enum EAlertType {
  ERROR = 'ERROR',
  DEFAULT = 'DEFAULT',
}

export interface IAlertState {
  visible: boolean;
  header: string;
  description: string | null;
  type: EAlertType;
  isCloseable: boolean
}

export type TCreateAlertPayload = {
  description: string | null;
  header: string;
  type?: EAlertType;
  isCloseable?: boolean;
};
