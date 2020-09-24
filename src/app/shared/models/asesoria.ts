export class Asesoria{
  uid?: string
  curso: string
  dia: string //manejarlo por numeros 0-6
  hora: string
  nivel_enseñanza: string
  asesor: string //uid del usuario voluntario
  alumno: string //uid del usuario alumno
  tema_asesoria: string
  ruta_archivo_adjunto : string
  estado_asesoria: number
}