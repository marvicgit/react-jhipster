import dayjs from 'dayjs';
import { IAttachment } from 'app/shared/model/attachment.model';
import { IProject } from 'app/shared/model/project.model';
import { IUser } from 'app/shared/model/user.model';
import { ILabel } from 'app/shared/model/label.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { Priority } from 'app/shared/model/enumerations/priority.model';

export interface ITicket {
  id?: number;
  title?: string;
  description?: string | null;
  dueDate?: string | null;
  date?: string | null;
  status?: keyof typeof Status | null;
  type?: keyof typeof Type | null;
  priority?: keyof typeof Priority | null;
  attachments?: IAttachment[] | null;
  project?: IProject | null;
  assignedTo?: IUser | null;
  reportedBy?: IUser | null;
  labels?: ILabel[] | null;
}

export const defaultValue: Readonly<ITicket> = {};
