import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductoService, { type ProductoFrontend} from "../service/producto.service";
import { ProductImage } from "../components/product/ProductImage";
import { ProductInfo } from "../components/product/ProductInfo";
import { ProductActions } from "../components/product/ProductActions";
import { ProductNotFound } from "../components/product/ProductNotFound";
import { HiArrowLeft } from "react-icons/hi";

export const ProductDetailPage = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState<ProductoFrontend | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                const data = await ProductoService.obtener(Number(id));
                setProducto(data);
            } catch (error) {
                console.error('Error al cargar producto:', error);
                setProducto(null);
            } finally {
                setLoading(false);
            }
        };
        
        if (id) {
            void cargarProducto();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    if (!producto) {
        return <ProductNotFound />;
    }

    return (
        <div className="py-8 px-4">
            <Link 
                to="/pasteles"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors"
            >
                <HiArrowLeft size={20} />
                Volver a pasteles
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                <ProductImage imagen={producto.imagen} titulo={producto.titulo} />
                <div className="space-y-6">
                    <ProductInfo producto={producto} />
                    <ProductActions producto={producto} />
                </div>
            </div>
        </div>
    );
};