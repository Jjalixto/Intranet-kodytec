"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { Button, Modal } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { SiMastercard, SiVisa } from "react-icons/si";

interface ModalPagoProps {
    openModal: boolean;
    onClose: () => void;
    monto: number | null;
    onPago: () => void;
}

const ModalPago: FC<ModalPagoProps> = ({ openModal, onClose, monto, onPago }) => {

    const [user, setUser] = useState<{ categoria?: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Modal show={openModal} onClose={onClose} size="md" className="backdrop-blur-sm backdrop-opacity-80">
            <Modal.Body>
                <div>
                    <div onClick={onClose} className="flex justify-end items-center p-0">
                        <XMarkIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                    </div>
                    <p className="font-mono text-blue-500 mb-2">MEDIO DE PAGO:</p>
                    <div className="flex items-center border-2 border-gray-300 justify-between px-2.5 font-mono">
                        <p className="text-gray-400">**** **** **** 1234</p>
                        <div className="flex">
                            <span ><SiVisa size={38} className="text-blue-600" /></span>
                            <span><SiMastercard size={38} /></span>
                        </div>
                    </div>
                </div>
                <div className="font-mono">
                    <p className="text-blue-500 my-2">DETALLES:</p>
                    <div className="flex items-center justify-between">
                        <p>Categoria</p>
                        <p>{user?.categoria || 'No disponible'}</p>
                    </div>
                    <div className="w-full h-0.5 bg-gray-200 my-1.5"></div>
                    <div className="flex items-center justify-between">
                        <p>Cuota de Ingreso</p>
                        <p>S/{monto?.toFixed(2)}</p>
                    </div>
                    <div className="w-full h-0.5 bg-gray-200 my-1.5"></div>
                    <div className="flex items-center justify-between">
                        <p>Descuento Aplicado</p>
                        <p>50%</p>
                    </div>
                </div>
                <div className="flex font-mono items-center justify-between bg-sky-400 mt-4 rounded-b-2xl p-1">
                    <p>Total :</p>
                    <p>S/{monto ? monto * 0.50 : 0}</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-center px-6 py-1 font-mono pb-4">
                <Button onClick={() => {
                    onClose();
                    onPago();
                }} className="text-white mr-2 w-full bg-black">Pagar S/{monto ? monto * 0.50 : '0.00'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalPago;