import { useState } from 'react';
import type { Pedido } from '../../../interfaces/pedidoInterface';

interface PedidoFormProps {
    pedido: Pedido;
    onSubmit: (pedidoId: string, nuevoEstado: 'completado' | 'pendiente' | 'cancelado') => void;
    onCancel: () => void;
}

export const PedidoForm = ({ pedido, onSubmit, onCancel }: PedidoFormProps) => {
    const [estado, setEstado] = useState<'completado' | 'pendiente' | 'cancelado'>(pedido.estado);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(pedido.id, estado);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Actualizar Estado del Pedido</h2>

                    {/* Informacion del pedido */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">ID del Pedido</p>
                        <p className="font-semibold">#{pedido.id.slice(-8)}</p>
                        <p className="text-sm text-gray-600 mt-2 mb-1">Cliente</p>
                        <p className="font-medium">{pedido.id.split('-')[0]}</p>
                        <p className="text-sm text-gray-600 mt-2 mb-1">Total</p>
                        <p className="font-bold text-rose-600">${pedido.total.toFixed(2)}</p>
                    </div>

                    {/* Selector de estado */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estado del Pedido *
                        </label>
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value as 'completado' | 'pendiente' | 'cancelado')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            required
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="completado">Completado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>

                    {/* Descripcion de estados */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg text-sm">
                        <p className="font-semibold mb-2">Descripcion de estados:</p>
                        <ul className="space-y-1 text-gray-700">
                            <li><span className="font-medium text-yellow-700">Pendiente:</span> El pedido esta en proceso</li>
                            <li><span className="font-medium text-green-700">Completado:</span> El pedido fue entregado</li>
                            <li><span className="font-medium text-red-700">Cancelado:</span> El pedido fue cancelado</li>
                        </ul>
                    </div>

                    {/* Botones de accion */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
                        >
                            Actualizar Estado
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
