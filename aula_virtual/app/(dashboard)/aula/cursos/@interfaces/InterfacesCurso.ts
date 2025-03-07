import { MaterialInterface } from "../../materiales/@interfaces/InterfacesMaterial";

export interface CursoMaterial {
  id: string;
  nombre: string;
  profesor: string;
  materiales: MaterialInterface[];
}
