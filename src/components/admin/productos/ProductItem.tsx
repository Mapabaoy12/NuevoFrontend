import { useState } from 'react';
import type { Producto } from '../../../data/productos';
import { formatPrice } from '../../../utils/formatters';

interface ProductItemProps {
    producto: Producto;
    onEdit: (producto: Producto) => void;
    onDelete: (id: number) => void;
}

export const ProductItem = ({ producto, onEdit, onDelete }: ProductItemProps) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = () => {
        onDelete(producto.id);
        setShowDeleteConfirm(false);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
                {/* Imagen del producto */}
                <div className="w-24 h-24 shrink-0">
                    <img
                        src={producto.imagen}
                        alt={producto.titulo}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Informacion del producto */}
                <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{producto.titulo}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{producto.descripcion}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {producto.forma}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {producto.tamanio}
                        </span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            Stock: {producto.stock || 0}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-rose-600">
                            {formatPrice(producto.precio)}
                        </span>

                        {/* Botones de accion */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(producto)}
                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de confirmacion de eliminacion */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
                        <h3 className="text-xl font-bold mb-4">Confirmar eliminacion</h3>
                        <p className="text-gray-600 mb-6">
                            ¿Estas seguro de que deseas eliminar "{producto.titulo}"? Esta accion no se puede deshacer.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
