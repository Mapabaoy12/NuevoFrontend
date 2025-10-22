import { Destacadas } from "../home/Destacado"
import { ProductosGrid } from "../home/ProductosGrid"
import { Categoria } from "../home/Categorias"
import { productos } from "../data/productos"
export const HomePage = () => {
    return (
    <div>
        <Destacadas/>
        <ProductosGrid
            title="Nuevos Productos" productos={productos}
        />
        <ProductosGrid
            title="Productos destacados" productos={[{id:1, title:'Producto Destacado 1'}]}
        />

        <Categoria/>
    </div>
    )
}