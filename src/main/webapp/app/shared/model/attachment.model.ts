import { ITicket } from 'app/shared/model/ticket.model';

export interface IAttachment {
  id?: number;
  name?: string;
  fileContentType?: string | null;
  file?: string | null;
  ticket?: ITicket | null;
}

export const defaultValue: Readonly<IAttachment> = {};
