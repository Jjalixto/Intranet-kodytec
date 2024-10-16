export interface PagoResponse {
    isSuccess: boolean;
    message: string;
    data: Pago[];
}

export interface Pago {
    id: string;
    fecha: Date;
    monto: number;
    estado: string;
    concepto: string,
    descripcion: string
}