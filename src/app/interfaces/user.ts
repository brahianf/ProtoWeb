export interface User {
  $key?: string;
  name: string;
  lastName: string;
  cc: number;
  role: Role;
  state: State;
  tel: number;
  email: string;
}

export enum Role {
  administrador = 'Administrador',
  coordinador = 'Coordinador',
  digitador = 'Digitador CG-UNO',
  recolector = 'Recolector',
}

export enum State {
  activo = 'Activo',
  inactivo = 'Inactivo',
}