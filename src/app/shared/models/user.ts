export interface User {
  uid: string;
  dni?: string;
  nombres?: string;
  apellidos?: string;
  displayName?: string;
  email: string;
  password?: string;
  fecha_nacimiento?: any;
  photoURL?: string,
  emailVerified?: boolean;
  numero_celular?: string;
  fecha_registro?: any;
  rol?: string;
  activo?: boolean;
}


export class Roles  {
  static ALUMNO = "Alumno";
  static VOLUNTARIO = "Voluntario";
  static ADMIN = "Administrador";
 }