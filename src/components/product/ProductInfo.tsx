import { formatPrice } from "../../utils/formatters";
import type { Producto } from "../../data/productos";

interface ProductInfoProps {
    producto: Producto;
}

export const ProductInfo = ({ producto }: ProductInfoProps) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{producto.titulo}</h1>
                <p className="text-3xl font-semibold text-rose-600">
                    {formatPrice(producto.precio)}
                </p>
            </div>

            <div className="border-t border-b border-slate-200 py-6">
                <h3 className="font-semibold text-lg mb-2">Descripcion</h3>
                <p className="text-gray-700 leading-relaxed">{producto.descripcion}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold text-sm text-gray-600 mb-1">Forma</h3>
                    <p className="text-black font-medium">{producto.forma}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-sm text-gray-600 mb-1">Tamanio</h3>
                    <p className="text-black font-medium">{producto.tamanio}</p>
                </div>
            </div>

            {producto.stock !== undefined && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Disponibilidad:</span>
                    {producto.stock > 0 ? (
                        <span className="text-green-600 font-medium">
                            {producto.stock} en stock
                        </span>
                    ) : (
                        <span className="text-red-600 font-medium">Agotado</span>
                    )}
                </div>
            )}
        </div>
    );
};
