import { AbsenceAction, MembersAction } from './absence';
import { ConfigAction } from './config';

export * from './config';
export * from './absence';

export type Action = ConfigAction | AbsenceAction | MembersAction;