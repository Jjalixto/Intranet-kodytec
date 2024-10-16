"use client";

import { FC, useState } from "react";
import Navbar from "../components/shared/Navbar";
import Sidbar from "../components/shared/SidBar";
import TableNota from "../components/TableNota";
import TablePago from "../components/TablePago";
import TableProxim from "../components/TableProxim";
import MiProfile from "../components/shared/MiProfile";

const PagePrueba: FC = () => {
    const [activeTable, setActiveTable] = useState('notas');

    const handleSelectTable = (table: string) => {
        setActiveTable(table);
    };
    return (
        <div className="flex">
            <Sidbar onSelectTable={handleSelectTable} />
            <div className="flex-1 bg-[#F2F4FE] dark:bg-slate-800">
                <nav className="bg-white shadow">
                    <Navbar onSelectTable={handleSelectTable} />
                </nav>
                <div className={`p-6 bg-[#F2F4FE] pt-10 transition-all duration-500 dark:bg-slate-800 ${activeTable === 'notas' ? '' : ''}`}>
                    {activeTable === "notas" && <TableNota />}
                    {activeTable === "pagos" && <TablePago />}
                    {activeTable === "proxim" && <TableProxim />}
                    {activeTable === "perfil" && <MiProfile />}
                </div>
            </div>
        </div>
    );
};

export default PagePrueba;
