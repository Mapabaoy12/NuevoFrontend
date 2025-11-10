export const TermsCheckbox = () => {
    return (
        <div className="flex items-start">
            <input type="checkbox" className="mt-1 accent-rose-600" required />
            <label className="ml-2 text-sm text-gray-600">
                Acepto los{" "}
                <a href="#" className="text-rose-600 hover:text-rose-700">
                    terminos y condiciones
                </a>{" "}
                y la{" "}
                <a href="#" className="text-rose-600 hover:text-rose-700">
                    politica de privacidad
                </a>
            </label>
        </div>
    );
};
