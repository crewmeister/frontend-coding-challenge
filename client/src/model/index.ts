import { TodoAction } from './absence';
import { ConfigAction } from './config';

export * from './config';
export * from './absence';

export type Action =
    | ConfigAction | TodoAction;
