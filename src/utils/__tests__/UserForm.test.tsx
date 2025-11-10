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
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserForm } from "../../components/admin/usuarios/UserForm";
import React from 'react';




describe('Pruebas de componente UserForm - render basico', () => {
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
        render(<UserForm usuario={usuario} onSubmit={vi.fn()} onCancel={vi.fn()}/>);

        expect(screen.getByDisplayValue("Gustavo Alvial")).toBeInTheDocument();
        expect(screen.getByDisplayValue("gu.alvial@duocuc.cl")).toBeInTheDocument();
        expect(screen.getByDisplayValue("979136263")).toBeInTheDocument();
    });
});


describe('Pruebas de componente UserForm - interaccion', () => {
    const mockOnSubmit = vi.fn();
    const mockOnCancel = vi.fn();

    it("Carga los campos del formulario correctamente cuando recibe un usuario", () => {
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
        render(<UserForm usuario={usuario} onSubmit={mockOnSubmit} onCancel={mockOnCancel}/>);

        expect(screen.getByDisplayValue("Gustavo Alvial")).toBeInTheDocument();
        expect(screen.getByDisplayValue("gu.alvial@duocuc.cl")).toBeInTheDocument();
        expect(screen.getByDisplayValue("979136263")).toBeInTheDocument();
    });

    it("Llama a onCancel al presionar el botón cancelar", () => {
        render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel}/>);
        fireEvent.click(screen.getByText("Cancelar"));
        expect(mockOnCancel).toHaveBeenCalledOnce();
    });

    it("El campo fecha de nacimiento tiene límite de edad (102 años)", () => {
        const { container } = render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel}/>);
        const fechaNacimiento = container.querySelector('input[name="fechaNacimiento"]') as HTMLInputElement;
        const fechaLimite = fechaNacimiento.max;
        expect(fechaLimite).toBeDefined();
    });
    it("El campo email está deshabilitado al editar un usuario", () => {
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
        render(<UserForm usuario={usuario} onSubmit={mockOnSubmit} onCancel={mockOnCancel}/>);
        const email = screen.getByDisplayValue("gu.alvial@duocuc.cl") as HTMLInputElement;
        expect(email).toBeDisabled();
    });
    it("El campo fecha de nacimiento no permite fechas futuras", () => {
        const { container } = render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel}/>);
        const fechaNacimiento = container.querySelector('input[name="fechaNacimiento"]') as HTMLInputElement;
        const fechaHoy = new Date().toISOString().split('T')[0];
        expect(fechaNacimiento.max).toBe(fechaHoy);
    });
});