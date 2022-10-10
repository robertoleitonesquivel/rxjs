export interface Padron {
  nombre:             string;
  tipoIdentificacion: string;
  regimen:            Regimen;
  situacion:          Situacion;
  actividades:        any[];
}

export interface Regimen {
  codigo:      number;
  descripcion: string;
}

export interface Situacion {
  moroso:                   string;
  omiso:                    string;
  estado:                   string;
  administracionTributaria: string;
  mensaje:                  string;
}
