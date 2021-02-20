import { User, Role } from './user';

export interface Roles {
  $key?: string;
  name: Role;
  users: User[],
}