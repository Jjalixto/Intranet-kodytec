'use client';

import { FC, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

interface SidebarProps {
    onSelectTable: (table: string) => void;
}

const Navbar: FC<SidebarProps> = ({onSelectTable}) => {
    const [user, setUser] = useState<{ nombre?: string; apellido?: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleItemClick = (table: string) => {
        onSelectTable(table);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-4 dark:bg-slate-800">
            <div className="relative flex justify-end items-center">
                <div className="text-2xl px-1">
                    <FaUserCircle />
                </div>

                {/* Contenedor del nombre y apellido */}
                <div className="relative group">
                    <div className="text-lg px-1 cursor-pointer">
                        {/* Solo el nombre y apellido aquí */}
                        {user?.nombre} {user?.apellido}
                    </div>

                    {/* Menú desplegable */}
                    <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg dark:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ul className="py-1">
                            <li className="cursor-pointer">
                                <a
                                    onClick={() => handleItemClick("perfil")}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Mi perfil
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
