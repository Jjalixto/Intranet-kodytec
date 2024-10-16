import { UserIcon } from "@heroicons/react/16/solid";
import { FC, useEffect, useState } from "react";

const MiProfile: FC = () => {

    const [user, setUser] = useState<{ codigo?: string; nombre?: string; apellido?: string; categoria?: string } | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    return (
        <div className="flex justify-between items-center max-w-md mx-auto my-28 bg-[#F2F4FE] shadow-md rounded-lg overflow-hidden p-10 dark:bg-gray-800">
            <div>
                <UserIcon className="h-20 w-20 text-gray-500" />
            </div>
            <div className="font-mono dark:text-white">
                <p>Codigo de Alumno: <span>{user?.codigo}</span></p>
                <p>Nombre: <span>{user?.nombre}</span></p>
                <p>Apellido: <span>{user?.apellido}</span></p>
                <p>Categoría: <span>{user?.categoria}</span></p>
            </div>
        </div>
    );
};

export default MiProfile;