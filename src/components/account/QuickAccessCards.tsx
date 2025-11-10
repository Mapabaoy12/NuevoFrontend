import { Link } from "react-router-dom";
import { HiShoppingBag, HiHeart, HiUser, HiCog } from "react-icons/hi";

export const QuickAccessCards = () => {
    const cards = [
        {
            id: 1,
            icon: HiShoppingBag,
            iconColor: "text-rose-600",
            bgColor: "bg-rose-100",
            title: "Mis Pedidos",
            description: "Ver historial de compras",
            link: "/cart"
        },
        {
            id: 2,
            icon: HiHeart,
            iconColor: "text-pink-600",
            bgColor: "bg-pink-100",
            title: "Favoritos",
            description: "Pasteles guardados",
            link: null
        },
        {
            id: 3,
            icon: HiUser,
            iconColor: "text-blue-600",
            bgColor: "bg-blue-100",
            title: "Perfil",
            description: "Editar informacion personal",
            link: null
        },
        {
            id: 4,
            icon: HiCog,
            iconColor: "text-gray-600",
            bgColor: "bg-gray-100",
            title: "Configuracion",
            description: "Ajustes de la cuenta",
            link: null
        }
    ];

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Accesos Rapidos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.map((card) => {
                    const Icon = card.icon;
                    const content = (
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${card.bgColor} rounded-full flex items-center justify-center`}>
                                <Icon className={card.iconColor} size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{card.title}</h3>
                                <p className="text-gray-600 text-sm">{card.description}</p>
                            </div>
                        </div>
                    );

                    return card.link ? (
                        <Link 
                            key={card.id}
                            to={card.link}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            {content}
                        </Link>
                    ) : (
                        <div 
                            key={card.id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            {content}
                        </div>
                    );
                })}
            </div>
        </>
    );
};
