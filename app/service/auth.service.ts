import { AxiosError } from "axios";
import { axiosClient } from "../configs/axios.config";
import { AuthResponse } from "./entities/auth.response";
import { ILogin } from "./types";

export const loginUser = async ({ codigo, clave }: ILogin): Promise<AuthResponse> => {
    try {
        const response = await axiosClient.post<AuthResponse>(`/login`, null, {
            params: { codigo, clave }
        });
        return response.data;
    } catch (error: unknown) { // Usa 'unknown' para el tipo del error
        if (error instanceof AxiosError && error.response) {
            // Verificamos si el error es una instancia de AxiosError
            throw new Error(error.response.data.message);
        }
        throw error; // Propaga el error para manejarlo en el componente
    }
};