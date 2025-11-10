import { Link } from "react-router-dom";

interface RestrictedAccessProps {
    title?: string;
    message?: string;
    buttonText?: string;
    redirectTo?: string;
}

export const RestrictedAccess = ({ 
    title = "Acceso Restringido",
    message = "Debes iniciar sesion para ver esta pagina",
    buttonText = "Iniciar Sesion",
    redirectTo = "/login"
}: RestrictedAccessProps) => {
    return (
        <div className="text-center py-16 px-4">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link 
                to={redirectTo}
                className="inline-block bg-rose-500 text-white px-8 py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium"
            >
                {buttonText}
            </Link>
        </div>
    );
};
