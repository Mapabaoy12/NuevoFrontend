export interface Usuario {
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
}

// Funcion helper para calcular edad
export const calcularEdad = (fechaNacimiento: string): number => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
};

// Funcion helper para verificar si es correo Duoc
export const esDuocEmail = (email: string): boolean => {
  const emailLower = email.toLowerCase();
  return emailLower.endsWith('@duoc.cl') || emailLower.endsWith('@duocuc.cl');
};

// Funcion helper para verificar si es cumpleanios hoy
export const esCumpleanosHoy = (fechaNacimiento: string): boolean => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  
  return hoy.getMonth() === nacimiento.getMonth() && 
         hoy.getDate() === nacimiento.getDate();
};