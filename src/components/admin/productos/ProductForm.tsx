import { useState, useEffect } from 'react';
import type { Producto } from '../../../data/productos';

interface ProductFormProps {
    producto?: Producto;
    onSubmit: (producto: Omit<Producto, 'id'> | Producto) => void;
    onCancel: () => void;
}

export const ProductForm = ({ producto, onSubmit, onCancel }: ProductFormProps) => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        precio: 0,
        imagen: '',
        forma: 'Circulares',
        tamanio: 'Grande',
        stock: 0,
    });

    useEffect(() => {
        if (producto) {
            setFormData({
                titulo: producto.titulo,
                descripcion: producto.descripcion,
                precio: producto.precio,
                imagen: producto.imagen,
                forma: producto.forma,
                tamanio: producto.tamanio,
                stock: producto.stock || 0,
            });
        }
    }, [producto]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (producto) {
            // Editar producto existente
            onSubmit({ ...formData, id: producto.id });
        } else {
            // Crear nuevo producto
            onSubmit(formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'precio' || name === 'stock' ? Number(value) : value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">
                        {producto ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Titulo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Titulo *
                            </label>
                            <input
                                type="text"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                placeholder="Ej: Torta Chocolate Especial"
                            />
                        </div>

                        {/* Descripcion */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Descripcion *
                            </label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                placeholder="Describe el producto..."
                            />
                        </div>

                        {/* Precio y Stock */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Precio (CLP) *
                                </label>
                                <input
                                    type="number"
                                    name="precio"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    placeholder="10000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Stock *
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Forma y Tamanio */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Forma *
                                </label>
                                <select
                                    name="forma"
                                    value={formData.forma}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                >
                                    <option value="Circulares">Circulares</option>
                                    <option value="Cuadrada">Cuadrada</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tamanio *
                                </label>
                                <select
                                    name="tamanio"
                                    value={formData.tamanio}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                >
                                    <option value="Grande">Grande</option>
                                    <option value="Pequenia">Pequeña</option>
                                </select>
                            </div>
                        </div>

                        {/* URL de la imagen */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL de la Imagen *
                            </label>
                            <input
                                type="text"
                                name="imagen"
                                value={formData.imagen}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                placeholder="/img/circulares/tortacircular1.webp"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Ruta relativa o URL completa de la imagen
                            </p>
                        </div>

                        {/* Vista previa de la imagen */}
                        {formData.imagen && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Vista previa
                                </label>
                                <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                                    <img
                                        src={formData.imagen}
                                        alt="Vista previa"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error';
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Botones */}
                        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                            >
                                {producto ? 'Actualizar' : 'Crear'} Producto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
