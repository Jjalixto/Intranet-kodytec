import React, { FC, useEffect, useState } from "react";

import { Pago } from "../service/entities/pago.entity";
import { getAllPayments, getFilteredPayments } from "../service/pago.service";
import ModalPago from "./shared/ModalPago";

const TablePago: FC = () => {
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [error, setError] = useState('');
    const [estado, setEstado] = useState('todos');
    const [loading, setLoading] = useState(true);
    const [fecha, setFecha] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedMonto, setSelectedMonto] = useState<number | null>(null);
    const [selectedPago, setSelectedPago] = useState<Pago | null>(null);

    useEffect(() => {
        const fetchPagos = async () => {
            try {
                setLoading(true);
                const response = await getAllPayments();
                if (response.isSuccess) {
                    setPagos(response.data);
                } else {
                    setError("No se encontraron cursos");
                }
            } catch (error) {
                setError('Error al obtener los cursos');
            } finally {
                setLoading(false);
            }
        };
        fetchPagos();
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { id, value } = event.target;
        if (id === 'filter') {
            setEstado(value);
        } else if (id === 'fecha-filter') {
            setFecha(value);
        }
    };

    // Nueva función para aplicar filtros
    useEffect(() => {
        const applyFilters = async () => {
            try {
                setLoading(true);
                const response = await getFilteredPayments(estado, fecha);
                setPagos(response?.data || []);
            } catch (error) {
                setError('Error al aplicar el filtro');
            } finally {
                setLoading(false);
            }
        };

        applyFilters();
    }, [estado, fecha]); // Ejecuta cuando 'estado' o 'fecha' cambian

    const handleOpenModal = (pago: Pago) => {
        setSelectedMonto(pago.monto);
        setSelectedPago(pago);
        setOpenModal(true);
    };

    const handlePago = () => {
        if (selectedPago) {
            // Cambiamos el estado a 'pagado'
            const updatedPagos = pagos.map(pago =>
                pago.id === selectedPago.id ? { ...pago, estado: 'pagado' } : pago
            );
    
            setPagos(updatedPagos);
    
            // Guardamos el estado en localStorage
            localStorage.setItem('pagos', JSON.stringify(updatedPagos));
        }
        setOpenModal(false);
    };

    return (
        <div className="pt-2">
            {/* Filtros */}
            <div className="flex justify-between">
                <div className="mb-4">
                    <label htmlFor="filter" className="block text-sm font-medium text-gray-700 dark:text-white">
                        Estado:
                    </label>
                    <select
                        id="filter"
                        value={estado}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-lg p-2 dark:text-black">
                        <option value="todos">Todos</option>
                        <option value="pagado">Pagado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="vencido">Vencido</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="fecha-filter" className="block text-sm font-medium text-gray-700 dark:text-white">
                        Fecha:
                    </label>
                    <input type="date"
                        id="fecha-filter"
                        value={fecha}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-lg p-2 dark:text-black" />
                </div>
            </div>

            {/* Spinner de carga */}
            {loading ? (
                <div className="flex justify-center items-center py-42">
                    <div className="w-10 h-10 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                    <span className="ml-4 text-blue-500 font-medium">Cargando...</span>
                </div>
            ) : (
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-y-auto max-h-96">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
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
                                        Concepto
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Descripcion
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Fecha
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Monto
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Estado
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-400 dark:text-gray-100"
                                    >
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="min-h-screen bg-white divide-y divide-gray-200 dark:bg-gray-800">
                                {pagos.length > 0 ? (
                                    pagos.map((pago) => (
                                        <tr key={pago.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                                {pago.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                {pago.concepto}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                {pago.descripcion}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                {new Date(pago.fecha).toLocaleDateString('en-CA')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                <span className={pago.estado === 'pagado' ? 'line-through' : ''}>
                                                    {pago.monto.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                <span className={`
                                                    ${pago.estado === 'vencido' ? 'text-red-600' : ''}
                                                    ${pago.estado === 'pagado' ? 'text-green-600' : ''}
                                                    ${pago.estado === 'pendiente' ? 'text-yellow-600' : ''}
                                                    uppercase font-semibold
                                                `}>
                                                    {pago.estado}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                                {pago.estado === "pendiente" || pago.estado === "vencido" ? (
                                                    <button onClick={() => handleOpenModal(pago)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                                                        Pagar
                                                    </button>
                                                ) : (
                                                    <button className="bg-gray-300 disabled  text-white font-bold py-2 px-4 rounded-lg">
                                                        Pagar
                                                    </button>
                                                )}
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

            {/* Modal de pago */}
            <ModalPago openModal={openModal} onClose={() => setOpenModal(false)} monto={selectedMonto} onPago={handlePago} />
        </div>
    );
};
export default TablePago;