import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";

interface EmptyCartProps {
    title?: string;
    message?: string;
    buttonText?: string;
    redirectTo?: string;
}

export const EmptyCart = ({ 
    title = "Tu carrito esta vacio",
    message = "Agrega algunos productos deliciosos a tu carrito",
    buttonText = "Ver Pasteles",
    redirectTo = "/pasteles"
}: EmptyCartProps) => {
    return (
        <div className="text-center py-16 px-4">
            <HiShoppingCart size={80} className="mx-auto text-gray-300 mb-4" />
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
