import { useState } from 'react';
import type { Pedido } from '../../../interfaces/pedidoInterface';
import { formatPrice } from '../../../utils/formatters';

interface PedidoItemProps {
    pedido: Pedido;
    onEdit: (pedido: Pedido) => void;
    onDelete: (id: string) => void;
}

export const PedidoItem = ({ pedido, onEdit, onDelete }: PedidoItemProps) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleDelete = () => {
        onDelete(pedido.id);
        setShowDeleteConfirm(false);
    };

    // Obtener email del usuario desde el ID del pedido
    const userEmail = pedido.id.split('-')[0];

    // Determinar color del estado
    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case 'completado':
                return 'bg-green-100 text-green-700';
            case 'pendiente':
                return 'bg-yellow-100 text-yellow-700';
            case 'cancelado':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-3">
                {/* Header del pedido */}
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">Pedido #{pedido.id.slice(-8)}</h3>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getEstadoColor(pedido.estado)}`}>
                                {pedido.estado.toUpperCase()}
                            </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {userEmail}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(pedido.fecha).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {pedido.items.length} producto{pedido.items.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>

                    {/* Total y acciones */}
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-xl font-bold text-rose-600">{formatPrice(pedido.total)}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => onEdit(pedido)}
                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                            >
                                Editar Estado
                            </button>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                            >
                                {showDetails ? 'Ocultar' : 'Ver Detalles'}
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

                {/* Detalles expandibles */}
                {showDetails && (
                    <div className="border-t pt-3 mt-2">
                        <h4 className="font-semibold mb-3">Productos del pedido:</h4>
                        <div className="space-y-2">
                            {pedido.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded">
                                    <img 
                                        src={item.imagen} 
                                        alt={item.titulo} 
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.titulo}</p>
                                        <p className="text-sm text-gray-600">
                                            {item.forma} - {item.tamanio}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">x{item.quantity}</p>
                                        <p className="text-sm text-gray-600">{formatPrice(item.precio)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-rose-600">
                                            {formatPrice(item.precio * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resumen de totales */}
                        <div className="mt-4 border-t pt-3 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal:</span>
                                <span>{formatPrice(pedido.subtotal)}</span>
                            </div>
                            {pedido.descuentoCodigo > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Descuento por codigo:</span>
                                    <span>-{formatPrice(pedido.descuentoCodigo)}</span>
                                </div>
                            )}
                            {pedido.descuentoUsuario > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Descuento de usuario:</span>
                                    <span>-{formatPrice(pedido.descuentoUsuario)}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total:</span>
                                <span className="text-rose-600">{formatPrice(pedido.total)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de confirmacion de eliminacion */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
                        <h3 className="text-xl font-bold mb-4">Confirmar eliminacion</h3>
                        <p className="text-gray-600 mb-6">
                            ¿Estas seguro de que deseas eliminar este pedido? Esta accion no se puede deshacer.
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
