import { Injectable } from "@angular/core";

const GRADOS_ACADEMICOS = [
  "Técnico en curso",
  "Técnico concluido",
  "Universitario en curso",
  "Universitario concluido",
];

const GRADOS_DE_INTERES = [
  "4to, 5to o 6to PRIMARIA",
  "1ro, 2do o 3ro SECUNDARIA",
  "4to y 5to SECUNDARIA",
];

const AREAS_ASESORIA = [
  "Ciencias",
  "Letras",
  "Matemáticas",
  "Idiomas y Cómputo",
];

const HORAS_SEMANA = [
  "2 horas",
  "3 horas",
  "4 horas",
  "5 horas",
  "Más de 5 horas",
];

const ESTADOS_CIVILES = ["Solter@", "Casad@", "Viud@", "Divorciad@"];
const NUMERO_HIJOS = ["0", "1", "2", "3", "Más de 3"];

const TIPOS_COLEGIO = ["Nacional", "Particular", "Parroquial"];
const NIVELES_EDUCATIVOS = ["Primaria", "Secundaria"];

const GRADOS_PRIMARIA = ["Tercer año", "Cuarto año", "Quinto año", "Sexto año"];

const GRADOS_SECUNDARIA = [
  "Primer año",
  "Segundo año",
  "Tercer año",
  "Cuarto año",
  "Quinto año",
];

const NIVELES_ENSENANZA = [
  "Primaria (3ro-6to)",
  "Secundaria Basica (1ro-3ro)",
  "Secundaria Avanzada (4to-5to)",
];

@Injectable({ providedIn: "root" })
export class CommonItems {
  getGrAcademicos(): string[] {
    return GRADOS_ACADEMICOS;
  }
  getGrDeInteres(): string[] {
    return GRADOS_DE_INTERES;
  }
  getAreasAsesoria(): string[] {
    return AREAS_ASESORIA;
  }
  getHorasSemana(): string[] {
    return HORAS_SEMANA;
  }
  getEstadosCiviles(): string[] {
    return ESTADOS_CIVILES;
  }
  getNumeroHijos(): string[] {
    return NUMERO_HIJOS;
  }
  //----------------------------------------------------------------------------
  getTiposColegio(): string[] {
    return TIPOS_COLEGIO;
  }
  getNivelesEducativos(): string[] {
    return NIVELES_EDUCATIVOS;
  }
  getGradosPrim(): string[] {
    return GRADOS_PRIMARIA;
  }
  getGradosSecu(): string[] {
    return GRADOS_SECUNDARIA;
  }
  //Omito Ñ o ñ en nombres de variables o metodos
  getNivelesEnsenanza(): string[] {
    return NIVELES_ENSENANZA;
  }
}
