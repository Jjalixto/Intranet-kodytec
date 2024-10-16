import { axiosClient } from "../configs/axios.config";
import { PagoResponse } from "./entities/pago.entity";

export const getAllPayments = async () => {
    try {
        // Recuperar el codigo almacenado en localStorage
        const storedUser = localStorage.getItem('usuario');
        if (!storedUser) {
            throw new Error("No se encontró el código de usuario en localStorage");
        }
        const { codigo } = JSON.parse(storedUser); // Obtener el codigo del usuario
        // Hacer la petición con el codigo
        const { data } = await axiosClient.get<PagoResponse>(`/payments/${codigo}`);
        return data;
    } catch (error) {   
        console.error('Error fetching courses:', error);
        throw error; // Propagar el error para manejarlo en el componente
    }
};

export const getFilteredPayments = async (estado: string, desde: string) => {
    try {
        const storedUser = localStorage.getItem('usuario');
        if(!storedUser) {
            throw new Error("No se encontro el codigo de usuario en localStorage");
        }
        const { codigo } = JSON.parse(storedUser);
        const response  = await axiosClient.get<PagoResponse>(`/payments/${codigo}`,{
            params: {
                estado,
                desde
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered', error);
        throw error;
    }
}