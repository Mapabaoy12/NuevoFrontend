import type { CartState } from "../../interfaces/cartInterface";
import { formatPrice } from "../../utils/formatters";
import { PromoCodeInput } from "./PromoCodeInput";
import { UserDiscountInfo } from "./UserDiscountInfo";
import { useUser } from "../../context/UserContext";
import { usePedidos } from "../../context/PedidosContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FEATURE_MESSAGES } from "../../constants/messages";

interface CartSummaryProps {
    cart: CartState;
    onApplyPromoCode: (code: string) => boolean;
    onRemovePromoCode: () => void;
}

export const CartSummary = ({ cart, onApplyPromoCode, onRemovePromoCode }: CartSummaryProps) => {
    const { user, isAuthenticated } = useUser();
    const { agregarPedido } = usePedidos();
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    
    const envio = 0; // Envio gratis 

    // Calcular descuento de usuario
    const userDiscount = user && user.descuentoPorcentaje > 0 
        ? Math.round(cart.subtotal * (user.descuentoPorcentaje / 100))
        : 0;

    // Total con descuentos de usuario y codigo promocional
    const totalConDescuentos = cart.total - userDiscount;

    const handleProcederPago = () => {
        // Verificar que el usuario esté logueado
        if (!isAuthenticated || !user) {
            alert("Debes iniciar sesion para realizar una compra");
            navigate("/login");
            return;
        }

        // Verificar que haya items en el carrito
        if (cart.items.length === 0) {
            alert("Tu carrito esta vacio");
            return;
        }

        setIsProcessing(true);

        // Simular procesamiento de pago
        setTimeout(() => {
            // Crear el pedido
            agregarPedido({
                items: cart.items,
                subtotal: cart.subtotal,
                descuentoCodigo: cart.discount,
                descuentoUsuario: userDiscount,
                total: totalConDescuentos,
                codigoPromoAplicado: cart.promoCode?.code
            });

            // Vaciar el carrito
            clearCart();

            setIsProcessing(false);

            // Mostrar mensaje de exito
            alert("Compra realizada exitosamente \n\nPuedes ver tu pedido en tu perfil.");

            // Redirigir a la página de cuenta
            navigate("/account");
        }, 1500);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow border border-slate-200 h-fit sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
            
            {user && user.descuentoPorcentaje > 0 && (
                <UserDiscountInfo 
                    descuentoPorcentaje={user.descuentoPorcentaje}
                    esMayorDe50={user.esMayorDe50}
                    tieneDescuentoFelices50={user.tieneDescuentoFelices50}
                />
            )}
            
            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cart.itemCount} {cart.itemCount === 1 ? 'producto' : 'productos'})</span>
                    <span className="font-medium">{formatPrice(cart.subtotal)}</span>
                </div>

                {cart.promoCode && cart.discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-green-600">Descuento codigo ({cart.promoCode.discount}%)</span>
                        <span className="font-medium text-green-600">-{formatPrice(cart.discount)}</span>
                    </div>
                )}

                {userDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-rose-600">Descuento usuario ({user!.descuentoPorcentaje}%)</span>
                        <span className="font-medium text-rose-600">-{formatPrice(userDiscount)}</span>
                    </div>
                )}
                
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envio</span>
                    <span className="font-medium text-green-600">
                        {envio === 0 ? 'Gratis' : formatPrice(envio)}
                    </span>
                </div>
                
                <div className="border-t border-slate-200 pt-3 mt-3">
                    <div className="flex justify-between">
                        <span className="font-semibold text-lg">Total</span>
                        <span className="font-bold text-lg text-rose-600">{formatPrice(totalConDescuentos)}</span>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <PromoCodeInput
                    onApply={onApplyPromoCode}
                    onRemove={onRemovePromoCode}
                    currentPromoCode={cart.promoCode?.code || null}
                />
            </div>
            
            <button 
                onClick={handleProcederPago}
                disabled={isProcessing || cart.items.length === 0}
                className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isProcessing ? 'Procesando...' : 'Proceder al pago'}
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-3">
                {FEATURE_MESSAGES.FREE_SHIPPING_ALL}
            </p>
        </div>
    );
};
