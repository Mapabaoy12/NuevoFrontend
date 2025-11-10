import { MdLocalShipping, MdSecurity, MdSupport, MdPayment } from "react-icons/md";
import type { ElementType } from "react";

interface Destacado {
    id: number;
    icon: ElementType;
    title: string;
    description: string;
}

const destacados: Destacado[] = [
    {
        id: 1,
        icon: MdLocalShipping,
        title: "Envio gratis",
        description: "En todos los productos"
    },
    {
        id: 2,
        icon: MdSecurity,
        title: "Compra segura",
        description: "Pagos protegidos"
    },
    {
        id: 3,
        icon: MdSupport,
        title: "Soporte 24/7",
        description: "Estamos para ayudarte"
    },
    {
        id: 4,
        icon: MdPayment,
        title: "Pago flexible",
        description: "Multiples opciones"
    }
];

export const Destacadas = () => {
    return (
        <div className="grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5">
            {destacados.map((item) => {
                const Icon = item.icon;
                return (
                    <div key={item.id} className="flex items-center gap-6">
                        <Icon size={40} className="text-slate-600" />
                        <div className="space-y-1">
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};