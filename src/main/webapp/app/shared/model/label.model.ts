import { ITicket } from 'app/shared/model/ticket.model';

export interface ILabel {
  id?: number;
  label?: string;
  tickets?: ITicket[] | null;
}

export const defaultValue: Readonly<ILabel> = {};
