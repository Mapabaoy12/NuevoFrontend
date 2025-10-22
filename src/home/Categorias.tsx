const categorias = [
    {
        Image: '/img/circulares/tortacircular1.webp',
        alt: 'Torta Circular'
    },
    {
        Image: '/img/cuadradas/tortacuadrada1.jpg',
        alt: 'Torta Cuadrada'
    }
]



export const Categoria = () => {
    return (
        <div className="flex flex-col items-center gap-3 pt-16 pb-12">
            <h2 className="font-bold text-2xl">
                Categorias Disponibles
            </h2>
            <p className="w-2/3 text-center text-sm md:text-base">
                La PasteleriaMilSabores cuenta con tortas de diferentes tamanios y formas
            </p>

            <div className="grid grid-cols-3 gap-6 mt-8 items-center md:grid-cols-6" >
                {
                    categorias.map((cat, index) => (
                        <div key={(index)}>
                            <img src={cat.Image} alt={cat.alt} 
                            className="w-20 h-20 object-contain"/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}