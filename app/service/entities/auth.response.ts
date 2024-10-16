export interface AuthResponse {
    isSuccess: boolean;
    message: string;
    data: {
        codigo: string;
        nombre: string;
        apellido: string;
        categoria: string;
    };
}
