import { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { formatPrice } from '../../../utils/formatters';
import { HiRefresh } from 'react-icons/hi';

export const PedidoList = () => {
    const { 
        pedidos, 
        loadingPedidos, 
        errorPedidos,
        cargarPedidos 
    } = useAdmin();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState<string>('todos');
    const [sortBy, setSortBy] = useState<'fecha' | 'total'>('fecha');

    // Filtrar y ordenar pedidos
    let pedidosFiltrados = pedidos. filter(pedido => {
        const matchesSearch = pedido.id?.toLowerCase(). includes(searchTerm.toLowerCase()) ||
                            pedido. usuarioId?.toString().includes(searchTerm);
        const matchesEstado = filterEstado === 'todos' || pedido. estado === filterEstado;
        return matchesSearch && matchesEstado;
    });

    // Ordenar
    pedidosFiltrados = [... pedidosFiltrados].sort((a, b) => {
        if (sortBy === 'fecha') {
            return new Date(b.fecha). getTime() - new Date(a.fecha).getTime();
        }
        return b.total - a. total;
    });

    // Estadísticas
    const totalPedidos = pedidos. length;
    const pedidosCompletados = pedidos.filter(p => p.estado === 'completado').length;
    const pedidosPendientes = pedidos.filter(p => p.estado === 'pendiente').length;
    const pedidosCancelados = pedidos.filter(p => p.estado === 'cancelado').length;
    const totalVentas = pedidos
        .filter(p => p.estado === 'completado')
        .reduce((sum, p) => sum + p.total, 0);

    // Loading state
    if (loadingPedidos && pedidos.length === 0) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
                <span className="ml-3 text-gray-600">Cargando pedidos...</span>
            </div>
        );
    }

    return (
        <div>
            {/* Error message */}
            {errorPedidos && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center">
                    <span>{errorPedidos}</span>
                    <button onClick={() => cargarPedidos()} className="text-red-700 hover:text-red-900">
                        <HiRefresh size={20} />
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">Gestión de Pedidos</h2>
                        <button
                            onClick={() => cargarPedidos()}
                            disabled={loadingPedidos}
                            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                            title="Recargar pedidos"
                        >
                            <HiRefresh size={20} className={loadingPedidos ? 'animate-spin' : ''} />
                        </button>
                    </div>
                    <div className="text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full">
                        🔗 Boletas del backend
                    </div>
                </div>

                {/* Búsqueda */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por ID o usuario..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e. target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Filtros */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <select
                            value={filterEstado}
                            onChange={(e) => setFilterEstado(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="todos">Todos</option>
                            <option value="completado">Completado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'fecha' | 'total')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="fecha">Fecha (más reciente)</option>
                            <option value="total">Total (mayor a menor)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Pedidos</p>
                    <p className="text-2xl font-bold text-blue-600">{totalPedidos}</p>
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

            {/* Total de ventas */}
            <div className="bg-linear-to-r from-rose-50 to-pink-50 p-6 rounded-lg mb-6 border border-rose-200">
                <p className="text-sm text-gray-600 mb-1">Total de Ventas (Completadas)</p>
                <p className="text-3xl font-bold text-rose-600">{formatPrice(totalVentas)}</p>
            </div>

            {/* Lista de pedidos */}
            <div className="space-y-4">
                {pedidosFiltrados.length > 0 ? (
                    pedidosFiltrados.map(pedido => (
                        <div key={pedido.id} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold">Pedido #{pedido.idBackend || pedido.id}</h3>
                                    <p className="text-sm text-gray-500">
                                        Usuario ID: {pedido.usuarioId}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(pedido.fecha).toLocaleDateString('es-CL', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-rose-600">{formatPrice(pedido.total)}</p>
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                        pedido.estado === 'completado' ? 'bg-green-100 text-green-700' :
                                        pedido.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {pedido.estado}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Items del pedido */}
                            <div className="border-t pt-3">
                                <p className="text-sm font-medium text-gray-700 mb-2">Items ({pedido.items?.length || 0}):</p>
                                <div className="space-y-1">
                                    {pedido.items?.slice(0, 3).map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between text-sm text-gray-600">
                                            <span>Producto #{item.productoId} x{item.cantidad}</span>
                                            <span>{formatPrice(item.subtotal)}</span>
                                        </div>
                                    ))}
                                    {pedido.items?.length > 3 && (
                                        <p className="text-xs text-gray-400">... y {pedido.items.length - 3} más</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No se encontraron pedidos</p>
                    </div>
                )}
            </div>
        </div>
    );
};