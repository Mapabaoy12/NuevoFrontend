import { HiLogout } from "react-icons/hi";
import { calcularEdad, type Usuario } from "../../data/Usuario";
import { ActiveBenefits } from "./ActiveBenefits";

interface UserProfileProps {
    user: Usuario;
    onLogout: () => void;
}

export const UserProfile = ({ user, onLogout }: UserProfileProps) => {
    const iniciales = user.nombre
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {iniciales}
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">{user.nombre}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">{calcularEdad(user.fechaNacimiento)} años</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-rose-600 transition-colors"
                >
                    <HiLogout size={20} />
                    <span>Cerrar Sesion</span>
                </button>
            </div>
            <ActiveBenefits user={user} />
        </div>
    );
};
