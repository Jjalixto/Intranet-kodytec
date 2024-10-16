'use client';

import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { RiExchangeLine, RiLogoutBoxRFill, RiNotification2Line, RiSurveyLine } from "react-icons/ri";

interface SidebarProps {
    onSelectTable: (table: string) => void;
}

const Sidbar: FC<SidebarProps> = ({ onSelectTable }) => {

    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const handlerLogout = useCallback(async () => {
        try {
            localStorage.clear();
            router.push('/login');
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    }, [router]);

    const handleItemClick = (table: string) => {
        setSelectedItem(table);
        onSelectTable(table);
    };

    return (
        <aside className="w-56 text-white h-screen dark:bg-slate-800">
            <div className="px-6 pb-4 pt-3">
                <div className="border-2 border-slate-800 rounded-full dark:border-white shadow-lg transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center py-1 px-2 bg-white dark:bg-gray-800 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 pr-8">
                        <div className="cursor-pointer flex items-center space-x-3  border-indigo-500 pr-4 py-2">
                            <DarkThemeToggle className="text-xl text-blue-600 transition-transform duration-300 hover:scale-125 hover:text-blue-500" />
                            <RiNotification2Line className="text-xl text-black dark:text-white transition-transform duration-300 hover:scale-125 hover:text-blue-500" />
                        </div>
                        <span className="cursor-pointer text-md font-semibold text-white py-2 px-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 shadow-md transition duration-300 transform hover:scale-105">
                            Kodytec
                        </span>
                    </div>
                </div>

                <div>
                    <div>
                        <div className="py-8">
                            <h5 className="uppercase text-primary dark:text-cyan-500">Registro</h5>
                            <ul>
                                <li className="mb-2">
                                    <a
                                        onClick={() => handleItemClick("notas")}
                                        className={`cursor-pointer flex items-center gap-4 p-2 bg-gray-400 dark:bg-gray-800 transition hover:bg-gray-500 dark:hover:bg-gray-700 hover:translate-x-2 ease-out duration-300 rounded-lg 
                                        ${selectedItem === "notas" ? "bg-gray-600 dark:bg-gray-900 shadow-lg" : ""}`}
                                    >
                                        <RiSurveyLine className="text-[1.25rem]" />
                                        <span>Notas</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => handleItemClick("pagos")}
                                        className={`cursor-pointer flex items-center gap-4 p-2 bg-gray-400 dark:bg-gray-800 transition hover:bg-gray-500 dark:hover:bg-gray-700 hover:translate-x-2 ease-out duration-300 rounded-lg 
                                        ${selectedItem === "pagos" ? "bg-gray-600 dark:bg-gray-900 shadow-lg" : ""}`}
                                    >
                                        <RiExchangeLine className="text-[1.25rem]" />
                                        <span>Pagos</span>
                                    </a>
                                </li>

                            </ul>
                            <h5 className="uppercase pt-5 text-primary dark:text-cyan-500">Otros</h5>
                            <ul>
                                <li>
                                    <a
                                        onClick={() => handleItemClick("proxim")}
                                        className={`cursor-pointer flex items-center gap-4 p-2 bg-gray-400 dark:bg-gray-800 transition hover:bg-gray-500 dark:hover:bg-gray-700 hover:translate-x-2 ease-out duration-300 rounded-lg 
                                        ${selectedItem === "proxim" ? "bg-gray-600 dark:bg-gray-900 shadow-lg" : ""}`}
                                    >
                                        <RiSurveyLine className="text-[1.25rem]" />
                                        <span>Próximan...</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="pt-12">
                            <Image src="/images/sidebar.svg" className="my-2" alt="sidebar image" width={400} height={200} priority />
                            <button onClick={handlerLogout} className="flex justify-center items-center text-black rounded-lg p-2 mx-5 my-0 font-semibold transition transform hover:bg-primary scale-105 ease-out duration-500 dark:text-white">
                                <RiLogoutBoxRFill />
                                <span className="">Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidbar;
