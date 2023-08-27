import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IComment {
  id?: number;
  date?: string | null;
  text?: string | null;
  parents?: IComment[] | null;
  login?: IUser | null;
  child?: IComment | null;
}

export const defaultValue: Readonly<IComment> = {};
