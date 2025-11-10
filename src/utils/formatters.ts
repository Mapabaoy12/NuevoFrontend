/*
  Utilidades para formateo de datos
 */

/*
 Formatea un numero como precio en pesos chilenos (CLP)
 @param price - El precio numérico a formatear
 @returns El precio formateado como string con formato de moneda chilena
 @example formatPrice(10000) // "$10.000"
 */
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
};

/*
* Formatea una fecha en formato legible en espaniol
* @param date - La fecha a formatear
* @returns La fecha formateada en espaniol
* @example formatDate(new Date()) // "7 de noviembre de 2025"
*/
export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

/*
  Formatea una fecha con hora
  @param date - La fecha a formatear
  @returns La fecha y hora formateada
  @example formatDateTime(new Date()) // "7/11/2025, 20:30"
 */
export const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('es-CL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};
