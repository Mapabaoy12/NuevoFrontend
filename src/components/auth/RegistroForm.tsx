import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiMail, HiLockClosed, HiUser, HiPhone, HiCalendar, HiLocationMarker, HiTag } from "react-icons/hi";
import { InputField } from "./InputField";
import { TermsCheckbox } from "./TermsCheckbox";
import { useUser } from "../../context/UserContext";

interface RegistroFormData {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    fechaNacimiento: string;
    direccion: string;
    codigoPromocional: string;
    password: string;
    confirmPassword: string;
}

// Helper functions
const calcularEdad = (fechaNacimiento: string): number => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
};

const esDuocEmail = (email: string): boolean => {
    const emailLower = email.toLowerCase();
    return emailLower.endsWith('@duoc.cl') || emailLower. endsWith('@duocuc.cl');
};

export const RegistroForm = () => {
    const [formData, setFormData] = useState<RegistroFormData>({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        fechaNacimiento: "",
        direccion: "",
        codigoPromocional: "",
        password: "",
        confirmPassword: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { register, loading, error } = useUser();

    const handleChange = (e: React. ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target. value
        });
    };

    const handleSubmit = async (e: React. FormEvent) => {
        e.preventDefault();

        // Validaciones
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (formData.password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setIsSubmitting(true);

        // Calcular beneficios
        const edad = formData.fechaNacimiento ? calcularEdad(formData. fechaNacimiento) : 0;
        const esDuoc = esDuocEmail(formData. email);
        const esMayorDe50 = edad >= 50;
        const tieneCodigoFelices50 = formData.codigoPromocional. toUpperCase() === 'FELICES50';

        let descuentoPorcentaje = 0;
        const beneficios: string[] = [];

        if (esMayorDe50) {
            descuentoPorcentaje = 50;
            beneficios.push("50% de descuento por ser mayor de 50 años");
        } else if (tieneCodigoFelices50) {
            descuentoPorcentaje = 10;
            beneficios.push("10% de descuento de por vida con código FELICES50");
        }

        if (esDuoc) {
            beneficios.push("Torta gratis en tu cumpleaños como estudiante Duoc UC");
        }

        try {
            const success = await register({
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                contrasenia: formData.password,
                tipoUsuario: 'Cliente',
                datosExtra: {
                    telefono: formData. telefono,
                    fechaNacimiento: formData.fechaNacimiento,
                    direccion: formData.direccion,
                    codigoPromocional: formData.codigoPromocional,
                    esDuocUC: esDuoc,
                    esMayorDe50: esMayorDe50,
                    tieneDescuentoFelices50: tieneCodigoFelices50,
                    descuentoPorcentaje: descuentoPorcentaje,
                    tortaGratisCumpleanosDisponible: esDuoc,
                    tortaGratisCumpleanosUsada: false,
                }
            });

            if (success) {
                let mensaje = "¡Cuenta creada exitosamente!";
                if (beneficios.length > 0) {
                    mensaje += "\n\nTus beneficios:\n• " + beneficios. join("\n• ");
                }
                alert(mensaje);
                navigate("/account");
            } else {
                alert("Error al crear la cuenta. El email podría ya estar registrado.");
            }
        } catch (err) {
            console.error('Error en registro:', err);
            alert("Error al crear la cuenta.  Intenta nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Nombre"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        icon={HiUser}
                    />
                    <InputField
                        label="Apellido"
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        placeholder="Tu apellido"
                        icon={HiUser}
                    />
                </div>

                <InputField
                    label="Correo electrónico"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    icon={HiMail}
                />

                <InputField
                    label="Teléfono"
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+56 9 1234 5678"
                    icon={HiPhone}
                />

                <InputField
                    label="Fecha de Nacimiento"
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    placeholder=""
                    icon={HiCalendar}
                />

                <InputField
                    label="Dirección"
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Tu dirección"
                    icon={HiLocationMarker}
                />

                <InputField
                    label="Código Promocional (opcional)"
                    type="text"
                    name="codigoPromocional"
                    value={formData.codigoPromocional}
                    onChange={handleChange}
                    placeholder="Ej: FELICES50"
                    icon={HiTag}
                />

                <InputField
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    icon={HiLockClosed}
                />

                <InputField
                    label="Confirmar Contraseña"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    icon={HiLockClosed}
                />

                <TermsCheckbox />

                <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        isSubmitting || loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-rose-500 text-white hover:bg-rose-600'
                    }`}
                >
                    {isSubmitting || loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Creando cuenta...
                        </span>
                    ) : (
                        'Crear Cuenta'
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    ¿Ya tienes cuenta? {" "}
                    <Link to="/login" className="text-rose-600 hover:text-rose-700 font-medium">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};