export interface LoginInterface {
  email: string;
  password: string;
}

export interface CambiarContrasenaInterface {
  password: string;
  confirmPassword: string;
}

export interface RecuperarContrasenaInteface {
  email: string;
}

export interface RegisterInterface {
  nombres: string;
  apellidos: string;
  celular: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type UserInterface = {
  id: string;
  email: string;
  nombres: string;
  apellidos: string;
  celular: string;
  rol: RolesInterface;
  rolId: number | 1 | 2 | 3;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserInterfaceEdit = {
  nombres: string;
  apellidos: string;
  celular: string;
};

export interface RolesInterface {
  id: number;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}
