import { useState } from 'react';
import { usePedidos } from '../../../context/PedidosContext';
import { PedidoItem } from './PedidoItem';
import { PedidoForm } from './PedidoForm';
import type { Pedido } from '../../../interfaces/pedidoInterface';

export const PedidoList = () => {
    const { pedidos, actualizarEstadoPedido, eliminarPedido } = usePedidos();
    const [showForm, setShowForm] = useState(false);
    const [editingPedido, setEditingPedido] = useState<Pedido | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState<string>('todos');
    const [sortBy, setSortBy] = useState<'fecha' | 'total'>('fecha');

    // Filtrar y ordenar pedidos
    let pedidosFiltrados = pedidos.filter(pedido => {
        const matchesSearch = pedido.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesEstado = filterEstado === 'todos' || pedido.estado === filterEstado;
        
        return matchesSearch && matchesEstado;
    });

    // Ordenar pedidos
    pedidosFiltrados = [...pedidosFiltrados].sort((a, b) => {
        if (sortBy === 'fecha') {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        } else {
            return b.total - a.total;
        }
    });

    const handleEditPedido = (pedido: Pedido) => {
        setEditingPedido(pedido);
        setShowForm(true);
    };

    const handleSubmit = (pedidoId: string, nuevoEstado: 'completado' | 'pendiente' | 'cancelado') => {
        actualizarEstadoPedido(pedidoId, nuevoEstado);
        setShowForm(false);
        setEditingPedido(undefined);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingPedido(undefined);
    };

    // Calcular estadisticas
    const totalVentas = pedidos.reduce((sum, pedido) => 
        pedido.estado === 'completado' ? sum + pedido.total : sum, 0
    );
    const pedidosCompletados = pedidos.filter(p => p.estado === 'completado').length;
    const pedidosPendientes = pedidos.filter(p => p.estado === 'pendiente').length;
    const pedidosCancelados = pedidos.filter(p => p.estado === 'cancelado').length;

    return (
        <div>
            {/* Header con busqueda y filtros */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Gestion de Pedidos</h2>
                </div>

                {/* Barra de busqueda */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar pedidos por ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                </div>

                {/* Filtros y ordenamiento */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estado
                        </label>
                        <select
                            value={filterEstado}
                            onChange={(e) => setFilterEstado(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        >
                            <option value="todos">Todos</option>
                            <option value="completado">Completado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ordenar por
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'fecha' | 'total')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        >
                            <option value="fecha">Fecha (mas reciente)</option>
                            <option value="total">Total (mayor a menor)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Estadisticas */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Pedidos</p>
                    <p className="text-2xl font-bold text-blue-600">{pedidos.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Completados</p>
                    <p className="text-2xl font-bold text-green-600">{pedidosCompletados}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Pendientes</p>
                    <p className="text-2xl font-bold text-yellow-600">{pedidosPendientes}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Cancelados</p>
                    <p className="text-2xl font-bold text-red-600">{pedidosCancelados}</p>
                </div>
            </div>

            {/* Estadistica de ventas */}
            <div className="bg-linear-to-r from-rose-50 to-pink-50 p-6 rounded-lg mb-6 border border-rose-200">
                <p className="text-sm text-gray-600 mb-1">Total de Ventas (Completadas)</p>
                <p className="text-3xl font-bold text-rose-600">
                    ${totalVentas.toFixed(2)}
                </p>
            </div>

            {/* Lista de pedidos */}
            <div className="space-y-4">
                {pedidosFiltrados.length > 0 ? (
                    pedidosFiltrados.map(pedido => (
                        <PedidoItem
                            key={pedido.id}
                            pedido={pedido}
                            onEdit={handleEditPedido}
                            onDelete={eliminarPedido}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No se encontraron pedidos</p>
                    </div>
                )}
            </div>

            {/* Formulario modal */}
            {showForm && editingPedido && (
                <PedidoForm
                    pedido={editingPedido}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};
