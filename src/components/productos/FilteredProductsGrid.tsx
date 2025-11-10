import { CardProduct } from "../productos/CardProduct";
import type { Producto } from "../../data/productos";

interface FilteredProductsGridProps {
    productos: Producto[];
    hasActiveFilters: boolean;
}

export const FilteredProductsGrid = ({ productos, hasActiveFilters }: FilteredProductsGridProps) => {
    return (
        <div className="md:col-span-1 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
            {/* Contador de resultados */}
            <div className="flex items-center justify-between">
                <p className="text-gray-600">
                    {productos.length} {productos.length === 1 ? 'producto' : 'productos'}
                    {hasActiveFilters && ' encontrado(s)'}
                </p>
            </div>

            {/* Grid de productos */}
            {productos.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
                    {productos.map(producto => (
                        <CardProduct key={producto.id} producto={producto} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-600 text-lg mb-4">
                        No se encontraron productos con los filtros seleccionados
                    </p>
                    <p className="text-gray-500">
                        Intenta ajustar tus filtros para ver mas resultados
                    </p>
                </div>
            )}
        </div>
    );
};
