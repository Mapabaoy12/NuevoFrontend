import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { Producto } from "../../data/productos";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";

interface Props {
    producto : Producto
}


export const CardProduct = ({producto}:Props) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Evita que el Link se active
        addToCart(producto);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // Reset después de 2 segundos
    };

    return(
        <div className="flex flex-col gap-6 relative">
            <Link to={`/pasteles/${producto.id}`} className="flex relative group overflow-hidden">
                <div className="flex h-[350px] w-full items-center justify-center py-2 lg:h-[250px]">
                    <img src={producto.imagen} alt={producto.titulo}
                    className="object-contain h-full w-full" />
                </div>
                <button 
                    onClick={handleAddToCart}
                    className={`${added ? 'bg-green-500 text-white border-green-500' : 'bg-white text-black border-slate-200'} border absolute w-full bottom-0 py-3 rounded-3xl flex items-center justify-center gap-1 text-sm font-medium hover:bg-stone-100 translate-y-full transition-all duration-300 group-hover:translate-y-0`}
                >
                    <FiPlus/>
                    {added ? 'Aniadido' : 'Aniadir'}
                </button>
            </Link>
                <div className="flex flex-col gap-1 items-center">
                    <p className="text-[15px] font-medium">
                        {producto.titulo}
                    </p>
                    <p className="text-[15px] font-medium">
                        {formatPrice(producto.precio)}
                    </p>

                    
                </div>
                <div className="absolute top-2 left-2">
                    {
                        producto.stock ===  0 && <span>Agotado</span>
                    }
                </div>
            </div>
    )
}