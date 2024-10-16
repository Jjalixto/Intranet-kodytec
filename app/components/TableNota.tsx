'use client';

import React, { FC, useCallback, useEffect, useState } from "react";
import { Nota } from "../service/entities/nota.entity";
import { getAllCursos, getFilteredCursos } from "../service/nota.service";

const TableNota: FC = () => {

    const [cursos, setCursos] = useState<Nota[]>([]);
    const [error, setError] = useState('');
    const [estado, setEstado] = useState('todos');
    const [ordenarPorNota, setOrdenarPorNota] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                setLoading(true);
                const response = await getAllCursos();
                if (response && response.isSuccess) {
                    setCursos(response.data);
                } else {
                    setError("No se encontraron cursos");
                }
            } catch (error) {
                setError('Error al obtener los cursos');
            } finally {
                setLoading(false);
            }
        };
        fetchCursos();
    }, []);

    const handleFilterChange = useCallback(async (event? : React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEstado = event ? event.target.value : estado;
        setEstado(selectedEstado);
        try {
            setLoading(true);
            const response = await getFilteredCursos(selectedEstado, ordenarPorNota ? 'True' : 'False');
            setCursos(response?.data || []);
        } catch (error) {
            setError('Error al aplicar el filtro');
        } finally {
            setLoading(false);
        }
    },[estado, ordenarPorNota]);

    useEffect(() => {
        handleFilterChange();
    },[handleFilterChange]);

    return (
        <div>

            {/* Filtros */}
            <div className="mb-6 flex items-center justify-between space-x-4">
                <div>
                    <label htmlFor="filter" className="block text-sm font-medium text-gray-700 dark:text-white">Estado:</label>
                    <select
                        id="filter"
                        value={estado}
                        onChange={handleFilterChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:text-black"
                    >
                        <option value="todos">Todos</option>
                        <option value="aprobado">Aprobado</option>
                        <option value="desaprobado">Desaprobado</option>
                    </select>
                </div>

                {/* Filtro ordenar por nota (Switch) */}
                <div className="flex">
                    <span className="text-sm font-medium text-gray-700 mr-2 dark:text-white">Ordenar nota de mayor a menor:</span>
                    <label className="flex items-center cursor-pointer">
                        <div className="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                id="ordenarPorNota"
                                checked={ordenarPorNota}
                                onChange={() => setOrdenarPorNota(!ordenarPorNota)}
                                className="sr-only peer"
                            />
                            <div className={`block w-full h-6 rounded-full transition-colors duration-200 ease-in-out ${ordenarPorNota ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <div
                                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${ordenarPorNota ? 'translate-x-6' : ''}`}
                            ></div>
                        </div>
                    </label>
                </div>
            </div>

            {/* Spinner de carga */}
            {loading ? (
                <div className="flex justify-center items-center py-42">
                    <div className="w-10 h-10 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                    <span className="ml-4 text-blue-500 font-medium">Cargando...</span>
                </div>
            ) : (
                <div className="mb-[30px] shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-y-auto max-h-96">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Curso
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Nota
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Grado
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Profesor
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                                {cursos.length > 0 ? (
                                    cursos.map((curso) => (
                                        <tr key={curso.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                                {curso.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                {curso.nombreCurso}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                {curso.nota}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                {curso.grado}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                {curso.profesor}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                {curso.estado}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="px-6 py-6 whitespace-nowrap text-center text-sm font-medium text-gray-500"
                                            colSpan={6}
                                        >
                                            <div className="flex justify-center items-center py-20 bg-red-100 text-red-600 rounded-lg mt-6 p-4">
                                                <div className="text-2xl mr-4">😔</div>
                                                <span className="font-medium">Ups!... {error}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableNota;
