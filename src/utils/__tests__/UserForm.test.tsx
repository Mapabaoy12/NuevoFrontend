/*export interface Usuario {
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: string; // formato ISO
  direccion: string;
  codigoPromocional?: string; // Codigo usado en el registro
  esDuocUC: boolean; // Si se registro con correo @duoc.cl o @duocuc.cl
  esMayorDe50: boolean; // Si tiene 50 anios o más
  tieneDescuentoFelices50: boolean; // Si uso código FELICES50
  descuentoPorcentaje: number; // Porcentaje de descuento aplicable 
  tortaGratisCumpleanosDisponible: boolean; // Si puede usar torta gratis
  tortaGratisCumpleanosUsada: boolean; // Si ya uso la torta gratis
  añoTortaGratisCumpleanos?: number; // Anio en que uso la torta gratis
}*/

import { UserForm } from "../../components/admin/usuarios/UserForm";


describe('Pruebas de componente UserForm', () => {
    it("Renderiza los campos del formulario correctamente", () => {
        const usuario = {
            nombre: 'Gustavo Alvial',
            email: 'gu.alvial@duocuc.cl',
            telefono: '979136263',
            fechaNacimiento: '2002-12-30',
            direccion: 'Freire 1780',
            esDuocUC: true,
            esMayorDe50: false,
            tieneDescuentoFelices50: false,
            descuentoPorcentaje: 0,
            tortaGratisCumpleanosDisponible: true,
            tortaGratisCumpleanosUsada: false
        };
        render(<UserForm usuario={usuario} onSubmit={jest.fn()} onCancel={jest.fn()}/>);

        expect(screen.getByDisplayValue("Gustavo Alvial")).toBeInTheDocument();
        expect(screen.getByDisplayValue("gu.alvial@duocuc.cl")).toBeInTheDocument();
        expect(screen.getByDisplayValue("979136263")).toBeInTheDocument();
    });
});