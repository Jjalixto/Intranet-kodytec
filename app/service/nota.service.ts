import { axiosClient } from "../configs/axios.config";
import { NotaResponse } from "./entities/nota.entity";

export const getAllCursos = async () => {
    try {
        // Recuperar el codigo almacenado en localStorage
        const storedUser = localStorage.getItem('usuario');
        if (!storedUser) {
            throw new Error("No se encontró el código de usuario en localStorage");
        }
        const { codigo } = JSON.parse(storedUser); // Obtener el codigo del usuario
        
        // Hacer la petición con el codigo
        const { data } = await axiosClient.get<NotaResponse>(`/courses/${codigo}`);
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error; // Propagar el error para manejarlo en el componente
    }
};

export const getFilteredCursos = async (estado: string, ordenarPorNota:string ) => {
    try {
        const storedUser = localStorage.getItem('usuario');
        if(!storedUser) {
            throw new Error("No se encontro el codigo de usuario en localStorage");
        }
        const { codigo } = JSON.parse(storedUser);
        const response  = await axiosClient.get<NotaResponse>(`/courses/${codigo}`,{
            params: {
                estado,
                ordenarPorNota
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered', error);
        throw error;
    }
}