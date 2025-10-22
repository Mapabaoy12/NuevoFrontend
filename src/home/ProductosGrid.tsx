import { CardProduct } from "../components/productos/CardProduct";

{/*Creacion de propiedades para los productos */}
interface Props {
    title:string;
    productos:any[];
}

export const ProductosGrid = ({title, productos}: Props) => {
    return (
    <div className="my-32">
        <h2 className="text-3x1 font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
            {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-8  lg:grid-cols-4">
            {productos.map((product) =>(
                <CardProduct 
                    key={product.id}
                    nombre = {product.nombre}
                    precio={product.precio}
                    colors={product.colors}
                    img={product.img[0]}
                    slug={product.slug}
                    variants={product.variants}
                    
                />
            ))
            }
        </div>
    </div>
    )
}

