import { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { ProductItem } from './ProductItem';
import { ProductForm } from './ProductForm';
import type { Producto } from '../../../data/productos';
import { HiRefresh } from 'react-icons/hi';

export const ProductList = () => {
    const { 
        productos, 
        loadingProductos, 
        errorProductos,
        cargarProductos,
        agregarProducto, 
        actualizarProducto, 
        eliminarProducto 
    } = useAdmin();
    
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Producto | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterForma, setFilterForma] = useState<string>('todas');
    const [filterTamanio, setFilterTamanio] = useState<string>('todos');

    // Filtrar productos
    const productosFiltrados = productos.filter(producto => {
        const matchesSearch = producto. titulo?. toLowerCase().includes(searchTerm.toLowerCase()) ||
                            producto.descripcion?. toLowerCase().includes(searchTerm.toLowerCase());
        const matchesForma = filterForma === 'todas' || producto.forma === filterForma;
        const matchesTamanio = filterTamanio === 'todos' || producto.tamanio === filterTamanio;
        
        return matchesSearch && matchesForma && matchesTamanio;
    });

    const handleAddProduct = () => {
        setEditingProduct(undefined);
        setShowForm(true);
    };

    const handleEditProduct = (producto: Producto) => {
        setEditingProduct(producto);
        setShowForm(true);
    };

    const handleSubmit = async (producto: Omit<Producto, 'id'> | Producto) => {
        try {
            if ('id' in producto) {
                await actualizarProducto(producto.id, producto);
            } else {
                await agregarProducto(producto);
            }
            setShowForm(false);
            setEditingProduct(undefined);
        } catch (err) {
            alert('Error al guardar el producto');
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await eliminarProducto(id);
            } catch (err) {
                alert('Error al eliminar el producto');
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProduct(undefined);
    };

    // Loading state
    if (loadingProductos && productos.length === 0) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
                <span className="ml-3 text-gray-600">Cargando productos...</span>
            </div>
        );
    }

    return (
        <div>
            {/* Error message */}
            {errorProductos && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center">
                    <span>{errorProductos}</span>
                    <button 
                        onClick={() => cargarProductos()}
                        className="text-red-700 hover:text-red-900"
                    >
                        <HiRefresh size={20} />
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">Gestión de Productos</h2>
                        <button
                            onClick={() => cargarProductos()}
                            disabled={loadingProductos}
                            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                            title="Recargar productos"
                        >
                            <HiRefresh size={20} className={loadingProductos ? 'animate-spin' : ''} />
                        </button>
                    </div>
                    <button
                        onClick={handleAddProduct}
                        disabled={loadingProductos}
                        className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium disabled:opacity-50"
                    >
                        + Agregar Producto
                    </button>
                </div>

                {/* Barra de búsqueda */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                </div>

                {/* Filtros */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                        <select
                            value={filterForma}
                            onChange={(e) => setFilterForma(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="todas">Todas</option>
                            <option value="Circulares">Circulares</option>
                            <option value="Cuadrada">Cuadrada</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño</label>
                        <select
                            value={filterTamanio}
                            onChange={(e) => setFilterTamanio(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="todos">Todos</option>
                            <option value="Grande">Grande</option>
                            <option value="Pequenia">Pequeña</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Productos</p>
                    <p className="text-2xl font-bold text-blue-600">{productos.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">En Stock</p>
                    <p className="text-2xl font-bold text-green-600">
                        {productos. filter(p => (p.stock || 0) > 0).length}
                    </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Sin Stock</p>
                    <p className="text-2xl font-bold text-red-600">
                        {productos.filter(p => (p.stock || 0) === 0). length}
                    </p>
                </div>
            </div>

            {/* Lista de productos */}
            <div className="space-y-4">
                {productosFiltrados. length > 0 ?  (
                    productosFiltrados. map(producto => (
                        <ProductItem
                            key={producto.id}
                            producto={producto}
                            onEdit={handleEditProduct}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No se encontraron productos</p>
                    </div>
                )}
            </div>

            {/* Formulario modal */}
            {showForm && (
                <ProductForm
                    producto={editingProduct}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};