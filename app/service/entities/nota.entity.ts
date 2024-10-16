export interface NotaResponse {
    isSuccess:    boolean;
    message:        string;
    data:           Nota[];
}

export interface Nota {
    id:             string;
    nombreCurso:    string;
    nota:           number;
    grado:          string;
    profesor:       string;
    estado:         string;
}