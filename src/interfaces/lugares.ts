export interface PlacesResponse {
    message: string;
    lugares: Lugares[];
}

export interface Lugares {
    CLEE:                string;
    Id:                  string;
    Nombre:              string;
    Razon_social:        string;
    Clase_actividad:     string;
    Estrato:             string;
    Tipo_vialidad:       string;
    Calle:               string;
    Num_Exterior:        string;
    Num_Interior:        string;
    Colonia:             string;
    CP:                  string;
    Ubicacion:           string;
    Telefono:            string;
    Correo_e:            string;
    Sitio_internet:      string;
    Tipo:                string;
    Longitud:            string;
    Latitud:             string;
    CentroComercial:     string;
    TipoCentroComercial: string;
    NumLocal:            string;
}