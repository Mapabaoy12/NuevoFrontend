import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import React from 'react';
import { formatPrice, formatDate, formatDateTime } from '../formatters';
import { calcularEdad } from '../../data/Usuario';
import { CartProvider, useCart } from '../../context/CartContext';

//Prueba unitaria 1
describe('formatPrice', () => {
  it('debe formatear números normales correctamente', () => {
    expect(formatPrice(1000)).toBe('$1.000');
    expect(formatPrice(25000)).toBe('$25.000');
    expect(formatPrice(1500000)).toBe('$1.500.000');
  });

});
//Prueba unitaria 2
describe('formatDate', () => {
  it('debe formatear fechas correctamente', () => {
    const date = new Date('2024-01-15');
    const formatted = formatDate(date);
    // El formato es "14 de enero de 2024" debido a la zona horaria
    expect(formatted).toContain('enero');
    expect(formatted).toContain('2024');
  });
});
//Prueba unitaria 3
describe('formatDateTime', () => {
  it('debe formatear fechas con hora correctamente', () => {
    const date = new Date('2024-01-15T14:30:00');
    const formatted = formatDateTime(date);
    // El formato es "15-01-2024, 02:30 p. m."
    expect(formatted).toContain('15-01-2024');
    expect(formatted).toContain(':');
    expect(formatted).toContain('30');
  });
});

//Prueba unitaria 4
describe('calcularEdad', () => {
    it('Calcula si el usuario es mayor de 50 años', () => {
        // calcularEdad recibe string en formato 'YYYY-MM-DD'
        const fechaNacimiento = '1970-01-01';
        expect(calcularEdad(fechaNacimiento)).toBeGreaterThanOrEqual(50);
    })

    it('Debe calcular si es menor de 50 años', () => {
        const fechaNacimiento = '2014-04-27';
        expect(calcularEdad(fechaNacimiento)).toBeLessThan(50);
    });
});

//prueba unitaria 5
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe inicializar con carrito vacio', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    expect(result.current.cart.items).toHaveLength(0);
    expect(result.current.cart.total).toBe(0);
    expect(result.current.cart.itemCount).toBe(0);
  });
});