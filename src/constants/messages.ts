/*
  Constantes de mensajes de la aplicación
  
  Centraliza todos los mensajes de texto para facilitar mantenimiento,
 traducción futura y consistencia en toda la aplicación.
*/

//  CARACTERÍSTICAS DEL SERVICIO 
export const FEATURE_MESSAGES = {
  FREE_SHIPPING: "Envio gratis",
  FREE_SHIPPING_ALL: "Envio gratis en todos los pedidos",
  SECURE_PURCHASE: "Compra segura",
  SUPPORT_24_7: "Soporte 24/7",
  FLEXIBLE_PAYMENT: "Pago flexible",
} as const;

// MENSAJES DE AUTENTICACIÓN
export const AUTH_MESSAGES = {
  EMAIL_ALREADY_REGISTERED: "Este email ya esta registrado. Por favor inicia sesion.",
  NO_USERS_REGISTERED: "No hay usuarios registrados. Por favor registrate primero.",
  EMAIL_NOT_REGISTERED: "Email no registrado. Por favor registrate primero.",
  LOGIN_ERROR: "Error al iniciar sesion. Por favor intenta de nuevo.",
} as const;

// MENSAJES DE VALIDACIÓN 
export const VALIDATION_MESSAGES = {
  ENTER_CODE: "Por favor ingresa un codigo",
  INVALID_CODE: "Codigo invalido",
} as const;

// MENSAJES GENERALES 
export const GENERAL_MESSAGES = {
  TRY_AGAIN: "Por favor intenta de nuevo",
} as const;
