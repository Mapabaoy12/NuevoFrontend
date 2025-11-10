export interface Producto {
    id: number;
    titulo: string;
    imagen: string;
    forma: string; // "Circulares" o "Cuadrada"
    tamanio: string; // "Grande" o "Pequenia"
    precio: number;
    descripcion: string;
    stock?: number;
}



export const productos: Producto[] = [
    {
        id: 1,
        titulo: "Torta Chocolate Especial",
        imagen: "./img/circulares/tortacircular1.webp",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 10000,
        descripcion: "Deliciosa torta de chocolate con cobertura cremosa y decoración elegante",
        stock: 15
    },
    {
        id: 2,
        titulo: "Torta Celebración",
        imagen: "/img/circulares/tortacircular2.gif",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 7500,
        descripcion: "Torta perfecta para celebraciones especiales con decoración colorida",
        stock: 12
    },
    {
        id: 3,
        titulo: "Torta Vainilla Premium",
        imagen: "/img/circulares/tortacircular3.jpg",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 7500,
        descripcion: "Suave torta de vainilla con frosting cremoso y frutas frescas",
        stock: 8
    },
    {
        id: 4,
        titulo: "Torta Red Velvet",
        imagen: "/img/circulares/tortacircular4.webp",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 11990,
        descripcion: "Clásica torta red velvet con queso crema y acabado aterciopelado",
        stock: 6
    },
    {
        id: 5,
        titulo: "Torta Frutas Tropicales",
        imagen: "/img/circulares/tortacircular5.jpg",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 10000,
        descripcion: "Refrescante torta con frutas tropicales y crema chantilly",
        stock: 10
    },
    {
        id: 6,
        titulo: "Mini Torta Chocolate",
        imagen: "/img/circulares/tortacircularpeque1.jpeg",
        forma: "Circulares",
        tamanio: "Pequenia",
        precio: 5000,
        descripcion: "Pequeña torta de chocolate ideal para ocasiones íntimas",
        stock: 20
    },
    {
        id: 7,
        titulo: "Mini Torta Vainilla",
        imagen: "/img/circulares/tortacircularpeque3.webp",
        forma: "Circulares",
        tamanio: "Pequenia",
        precio: 3490,
        descripcion: "Delicada mini torta de vainilla con decoración sencilla",
        stock: 25
    },
    {
        id: 8,
        titulo: "Mini Torta Fresa",
        imagen: "/img/circulares/tortacircularpeque5.webp",
        forma: "Circulares",
        tamanio: "Pequenia",
        precio: 4990,
        descripcion: "Mini torta con sabor a fresa y cobertura rosada",
        stock: 18
    },
    {
        id: 9,
        titulo: "Torta Cuadrada Chocolate",
        imagen: "/img/cuadradas/tortacuadrada1.jpg",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 9990,
        descripcion: "Elegante torta cuadrada de chocolate con ganache brillante",
        stock: 7
    },
    {
        id: 10,
        titulo: "Torta Cuadrada Caramelo",
        imagen: "/img/cuadradas/tortacuadrada2.jpg",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 8990,
        descripcion: "Torta cuadrada con delicioso sabor a caramelo y nueces",
        stock: 5
    },
    {
        id: 11,
        titulo: "Torta Cuadrada Limón",
        imagen: "/img/cuadradas/tortacuadrada3.jpg",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 8500,
        descripcion: "Refrescante torta cuadrada de limón con merengue",
        stock: 12
    },
    {
        id: 12,
        titulo: "Torta Especial Navideña",
        imagen: "/img/cuadradas/tortacuadrada4.jpg",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 12990,
        descripcion: "Torta especial para celebraciones navideñas con decoración festiva",
        stock: 8
    },
    {
        id: 13,
        titulo: "Torta Cumpleaños Infantil",
        imagen: "/img/cuadradas/tortacuadrada5.jpg",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 9990,
        descripcion: "Torta colorida perfecta para cumpleaños infantiles",
        stock: 10
    },
    {
        id: 14,
        titulo: "Mini Torta Cuadrada Chocolate",
        imagen: "/img/cuadradas/tortacuadradapeque1.jpg",
        forma: "Cuadrada",
        tamanio: "Pequenia",
        precio: 4990,
        descripcion: "Pequeña torta cuadrada de chocolate para ocasiones especiales",
        stock: 15
    },
    {
        id: 15,
        titulo: "Mini Torta Cuadrada Vainilla",
        imagen: "/img/cuadradas/tortacuadradapeque2.jpg",
        forma: "Cuadrada",
        tamanio: "Pequenia",
        precio: 4490,
        descripcion: "Mini torta cuadrada de vainilla con decoración elegante",
        stock: 20
    },
    {
        id: 16,
        titulo: "Mini Torta Cuadrada Fresa",
        imagen: "/img/cuadradas/tortacuadradapeque3.webp",
        forma: "Cuadrada",
        tamanio: "Pequenia",
        precio: 4990,
        descripcion: "Deliciosa mini torta cuadrada con sabor a fresa",
        stock: 18
    },
    {
        id: 17,
        titulo: "Mini Torta Cuadrada Caramelo",
        imagen: "/img/cuadradas/tortacuadradapeque4.jpg",
        forma: "Cuadrada",
        tamanio: "Pequenia",
        precio: 5490,
        descripcion: "Mini torta cuadrada con irresistible sabor a caramelo",
        stock: 12
    },
    {
        id: 18,
        titulo: "Mini Torta Cuadrada Especial",
        imagen: "/img/cuadradas/tortacuadradapeque5.jpg",
        forma: "Cuadrada",
        tamanio: "Pequenia",
        precio: 5990,
        descripcion: "Mini torta cuadrada con decoración especial para eventos",
        stock: 10
    },
    {
        id: 19,
        titulo: "Mini Torta Cuadrada Premium",
        imagen: "/img/cuadradas/tortacuadradapeque6.png",
        forma: "Cuadrada",
        tamanio: "Pequenia",
        precio: 6990,
        descripcion: "Mini torta cuadrada premium con ingredientes de alta calidad",
        stock: 8
    }
];


export const pastelesRecientes = [

    {
        id: 16,
        titulo: "Mini Torta Cuadrada Fresa",
        imagen: "/img/cuadradas/tortacuadradapeque3.webp",
        forma: "Cuadrada",
        tamanio: "Pequenia",
        precio: 4990,
        descripcion: "Deliciosa mini torta cuadrada con sabor a fresa",
        stock: 18
    },
    {
        id: 17,
        titulo: "Mini Torta Cuadrada Caramelo",
        imagen: "/img/cuadradas/tortacuadradapeque4.jpg",
        forma: "Cuadrada",
        tamanio: "Pequenia",
        precio: 5490,
        descripcion: "Mini torta cuadrada con irresistible sabor a caramelo",
        stock: 12
    },
    {
        id: 18,
        titulo: "Mini Torta Cuadrada Especial",
        imagen: "/img/cuadradas/tortacuadradapeque5.jpg",
        forma: "Cuadrada",
        tamanio: "Pequenia",
        precio: 5990,
        descripcion: "Mini torta cuadrada con decoración especial para eventos",
        stock: 10
    },
    {
        id: 19,
        titulo: "Mini Torta Cuadrada Premium",
        imagen: "/img/cuadradas/tortacuadradapeque6.png",
        forma: "Cuadrada",
        tamanio: "Pequenia",
        precio: 6990,
        descripcion: "Mini torta cuadrada premium con ingredientes de alta calidad",
        stock: 8
    }

]

export const productosDestacados = [

    {
        id: 1,
        titulo: "Torta Chocolate Especial",
        imagen: "./img/circulares/tortacircular1.webp",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 10000,
        descripcion: "Deliciosa torta de chocolate con cobertura cremosa y decoración elegante",
        stock: 15
    },
    {
        id: 2,
        titulo: "Torta Celebración",
        imagen: "/img/circulares/tortacircular2.gif",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 7500,
        descripcion: "Torta perfecta para celebraciones especiales con decoración colorida",
        stock: 12
    },
    {
        id: 3,
        titulo: "Torta Vainilla Premium",
        imagen: "/img/circulares/tortacircular3.jpg",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 7500,
        descripcion: "Suave torta de vainilla con frosting cremoso y frutas frescas",
        stock: 8
    },
    {
        id: 4,
        titulo: "Torta Red Velvet",
        imagen: "/img/circulares/tortacircular4.webp",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 11990,
        descripcion: "Clásica torta red velvet con queso crema y acabado aterciopelado",
        stock: 6
    }

]



