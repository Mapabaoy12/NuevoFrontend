import { useState } from "react";
import { HiTag, HiX } from "react-icons/hi";
import { VALIDATION_MESSAGES } from "../../constants/messages";

interface PromoCodeInputProps {
    onApply: (code: string) => boolean;
    onRemove: () => void;
    currentPromoCode: string | null;
}

export const PromoCodeInput = ({ onApply, onRemove, currentPromoCode }: PromoCodeInputProps) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleApply = () => {
        if (!code.trim()) {
            setError(VALIDATION_MESSAGES.ENTER_CODE);
            return;
        }

        const success = onApply(code);
        if (success) {
            setCode("");
            setError("");
        } else {
            setError(VALIDATION_MESSAGES.INVALID_CODE);
        }
    };

    const handleRemove = () => {
        onRemove();
        setCode("");
        setError("");
    };

    if (currentPromoCode) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <HiTag className="text-green-600" size={20} />
                    <div>
                        <p className="text-sm font-medium text-green-800">Codigo aplicado</p>
                        <p className="text-xs text-green-600">{currentPromoCode}</p>
                    </div>
                </div>
                <button
                    onClick={handleRemove}
                    className="text-green-600 hover:text-green-700 transition-colors"
                    aria-label="Remover codigo"
                >
                    <HiX size={20} />
                </button>
            </div>
        );
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Codigo promocional
            </label>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <HiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value.toUpperCase());
                            setError("");
                        }}
                        placeholder="Ej: FELICES50"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    />
                </div>
                <button
                    onClick={handleApply}
                    className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium text-sm"
                >
                    Aplicar
                </button>
            </div>
            {error && (
                <p className="text-xs text-red-600 mt-1">{error}</p>
            )}
        </div>
    );
};
