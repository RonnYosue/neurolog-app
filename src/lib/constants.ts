/**
 * @fileoverview Constantes centralizadas para la aplicación NeuroLog
 * @description Este archivo contiene todas las constantes utilizadas en la aplicación
 * para evitar valores hardcodeados y facilitar el mantenimiento.
 */

// ================================================================
// ROLES Y TIPOS DE USUARIO
// ================================================================

/**
 * Roles de usuario disponibles en el sistema
 */
export const USER_ROLES = {
  PARENT: 'parent',
  TEACHER: 'teacher',
  SPECIALIST: 'specialist',
  ADMIN: 'admin',
} as const;

/**
 * Traducciones de roles de usuario
 */
export const USER_ROLE_LABELS = {
  [USER_ROLES.PARENT]: 'Padre/Madre',
  [USER_ROLES.TEACHER]: 'Docente',
  [USER_ROLES.SPECIALIST]: 'Especialista',
  [USER_ROLES.ADMIN]: 'Administrador',
} as const;

/**
 * Tipos de relación entre usuarios y niños
 */
export const RELATIONSHIP_TYPES = {
  PARENT: 'parent',
  TEACHER: 'teacher',
  SPECIALIST: 'specialist',
  OBSERVER: 'observer',
  FAMILY: 'family',
} as const;

// ================================================================
// NIVELES DE INTENSIDAD Y RIESGO
// ================================================================

/**
 * Niveles de intensidad para registros diarios
 */
export const INTENSITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

/**
 * Traducciones de niveles de intensidad
 */
export const INTENSITY_LEVEL_LABELS = {
  [INTENSITY_LEVELS.LOW]: 'Baja',
  [INTENSITY_LEVELS.MEDIUM]: 'Media',
  [INTENSITY_LEVELS.HIGH]: 'Alta',
} as const;

/**
 * Niveles de riesgo
 */
export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/**
 * Traducciones de niveles de riesgo
 */
export const RISK_LEVEL_LABELS = {
  [RISK_LEVELS.LOW]: 'Bajo',
  [RISK_LEVELS.MEDIUM]: 'Medio',
  [RISK_LEVELS.HIGH]: 'Alto',
  [RISK_LEVELS.CRITICAL]: 'Crítico',
} as const;

// ================================================================
// OPERACIONES DE AUDITORÍA
// ================================================================

/**
 * Tipos de operaciones para auditoría
 */
export const AUDIT_OPERATIONS = {
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  SELECT: 'SELECT',
} as const;

// ================================================================
// CONFIGURACIÓN DE CACHÉ
// ================================================================

/**
 * Duración del caché en milisegundos (5 minutos)
 */
export const CACHE_DURATION_MS = 5 * 60 * 1000;

/**
 * Configuración de timeouts
 */
export const TIMEOUTS = {
  /** Timeout para peticiones HTTP (30 segundos) */
  HTTP_REQUEST: 30 * 1000,
  /** Timeout para operaciones de base de datos (10 segundos) */
  DATABASE: 10 * 1000,
  /** Debounce para búsquedas (300ms) */
  SEARCH_DEBOUNCE: 300,
} as const;

// ================================================================
// CONFIGURACIÓN DE PAGINACIÓN
// ================================================================

/**
 * Configuración de paginación por defecto
 */
export const PAGINATION = {
  /** Número de elementos por página por defecto */
  DEFAULT_PAGE_SIZE: 20,
  /** Número máximo de elementos por página */
  MAX_PAGE_SIZE: 100,
  /** Página inicial */
  INITIAL_PAGE: 0,
} as const;

// ================================================================
// LÍMITES DE CAMPOS
// ================================================================

/**
 * Límites de longitud para campos de texto
 */
export const FIELD_LIMITS = {
  /** Longitud máxima para nombres */
  NAME_MAX_LENGTH: 100,
  /** Longitud máxima para títulos */
  TITLE_MAX_LENGTH: 200,
  /** Longitud máxima para descripciones cortas */
  SHORT_DESCRIPTION_MAX_LENGTH: 500,
  /** Longitud máxima para contenido largo */
  LONG_CONTENT_MAX_LENGTH: 5000,
  /** Longitud máxima para emails */
  EMAIL_MAX_LENGTH: 255,
  /** Longitud máxima para teléfonos */
  PHONE_MAX_LENGTH: 20,
} as const;

// ================================================================
// CONFIGURACIÓN DE ARCHIVOS
// ================================================================

/**
 * Tamaños máximos de archivos en bytes
 */
export const FILE_SIZES = {
  /** 5MB para avatares */
  AVATAR_MAX_SIZE: 5 * 1024 * 1024,
  /** 10MB para adjuntos */
  ATTACHMENT_MAX_SIZE: 10 * 1024 * 1024,
  /** 20MB para documentos */
  DOCUMENT_MAX_SIZE: 20 * 1024 * 1024,
} as const;

/**
 * Tipos MIME aceptados
 */
export const ACCEPTED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALL: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
} as const;

// ================================================================
// BUCKETS DE STORAGE
// ================================================================

/**
 * Nombres de buckets de Supabase Storage
 */
export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  ATTACHMENTS: 'attachments',
  DOCUMENTS: 'documents',
} as const;

// ================================================================
// RANGOS DE VALORES
// ================================================================

/**
 * Rangos de puntuación de ánimo (mood score)
 */
export const MOOD_SCORE_RANGE = {
  MIN: 1,
  MAX: 10,
  DEFAULT: 5,
} as const;

/**
 * Rangos de edad
 */
export const AGE_RANGE = {
  MIN: 0,
  MAX: 18,
} as const;

// ================================================================
// ESTADOS DE REVISIÓN
// ================================================================

/**
 * Estados de revisión de registros
 */
export const REVIEW_STATUS = {
  ALL: 'all',
  REVIEWED: 'reviewed',
  PENDING: 'pending',
} as const;

/**
 * Estados de seguimiento
 */
export const FOLLOW_UP_STATUS = {
  ALL: 'all',
  REQUIRED: 'required',
  COMPLETED: 'completed',
} as const;

// ================================================================
// FORMATOS DE EXPORTACIÓN
// ================================================================

/**
 * Formatos disponibles para exportación
 */
export const EXPORT_FORMATS = {
  CSV: 'csv',
  PDF: 'pdf',
  JSON: 'json',
} as const;

// ================================================================
// CONFIGURACIÓN REGIONAL
// ================================================================

/**
 * Zona horaria por defecto
 */
export const DEFAULT_TIMEZONE = 'America/Guayaquil';

/**
 * Locale por defecto (español)
 */
export const DEFAULT_LOCALE = 'es';

/**
 * Formatos de fecha comunes
 */
export const DATE_FORMATS = {
  /** dd/MM/yyyy */
  SHORT: 'dd/MM/yyyy',
  /** dd/MM/yyyy HH:mm */
  MEDIUM: 'dd/MM/yyyy HH:mm',
  /** EEEE, d 'de' MMMM 'de' yyyy */
  LONG: "EEEE, d 'de' MMMM 'de' yyyy",
  /** yyyy-MM-dd (ISO) */
  ISO: 'yyyy-MM-dd',
  /** HH:mm */
  TIME: 'HH:mm',
} as const;

// ================================================================
// MENSAJES DE ERROR
// ================================================================

/**
 * Mensajes de error estandarizados
 */
export const ERROR_MESSAGES = {
  GENERIC: 'Ha ocurrido un error inesperado',
  NETWORK: 'Error de conexión. Por favor, verifica tu conexión a internet',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción',
  NOT_FOUND: 'El recurso solicitado no fue encontrado',
  VALIDATION: 'Por favor, verifica los datos ingresados',
  SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente',
  FILE_TOO_LARGE: 'El archivo es demasiado grande',
  INVALID_FILE_TYPE: 'Tipo de archivo no válido',
  REQUIRED_FIELD: 'Este campo es obligatorio',
} as const;

// ================================================================
// MENSAJES DE ÉXITO
// ================================================================

/**
 * Mensajes de éxito estandarizados
 */
export const SUCCESS_MESSAGES = {
  CREATED: 'Creado exitosamente',
  UPDATED: 'Actualizado exitosamente',
  DELETED: 'Eliminado exitosamente',
  SAVED: 'Guardado exitosamente',
  SENT: 'Enviado exitosamente',
} as const;

// ================================================================
// COLORES Y TEMA
// ================================================================

/**
 * Colores por defecto para categorías
 */
export const DEFAULT_COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#8b5cf6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
} as const;

/**
 * Colores para niveles de intensidad
 */
export const INTENSITY_COLORS = {
  [INTENSITY_LEVELS.LOW]: '#10b981',    // verde
  [INTENSITY_LEVELS.MEDIUM]: '#f59e0b', // amarillo
  [INTENSITY_LEVELS.HIGH]: '#ef4444',   // rojo
} as const;

/**
 * Colores para niveles de riesgo
 */
export const RISK_COLORS = {
  [RISK_LEVELS.LOW]: '#10b981',      // verde
  [RISK_LEVELS.MEDIUM]: '#f59e0b',   // amarillo
  [RISK_LEVELS.HIGH]: '#f97316',     // naranja
  [RISK_LEVELS.CRITICAL]: '#ef4444', // rojo
} as const;

// ================================================================
// RUTAS DE LA APLICACIÓN
// ================================================================

/**
 * Rutas principales de la aplicación
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  CHILDREN: '/dashboard/children',
  LOGS: '/dashboard/logs',
  REPORTS: '/dashboard/reports',
  CALENDAR: '/dashboard/calendar',
  SETTINGS: '/dashboard/settings',
  EXPORT: '/dashboard/export',
} as const;

// ================================================================
// CONFIGURACIÓN DE VALIDACIÓN
// ================================================================

/**
 * Patrones de validación comunes
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  URL: /^https?:\/\/.+/,
} as const;

/**
 * Mensajes de validación
 */
export const VALIDATION_MESSAGES = {
  EMAIL_INVALID: 'Email no válido',
  PHONE_INVALID: 'Teléfono no válido',
  URL_INVALID: 'URL no válida',
  PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 8 caracteres',
  PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
} as const;

// ================================================================
// CONFIGURACIÓN DE PERMISOS
// ================================================================

/**
 * Roles que pueden ver reportes
 */
export const ROLES_CAN_VIEW_REPORTS = [
  USER_ROLES.ADMIN,
  USER_ROLES.SPECIALIST,
  USER_ROLES.TEACHER,
] as const;

/**
 * Roles que pueden editar niños
 */
export const ROLES_CAN_EDIT_CHILDREN = [
  USER_ROLES.ADMIN,
  USER_ROLES.PARENT,
  USER_ROLES.TEACHER,
] as const;

/**
 * Roles que pueden eliminar registros
 */
export const ROLES_CAN_DELETE_LOGS = [
  USER_ROLES.ADMIN,
  USER_ROLES.PARENT,
] as const;

// ================================================================
// TIPOS HELPER
// ================================================================

/**
 * Tipo helper para extraer valores de objetos const
 */
export type ValueOf<T> = T[keyof T];

/**
 * Tipo para roles de usuario
 */
export type UserRole = ValueOf<typeof USER_ROLES>;

/**
 * Tipo para tipos de relación
 */
export type RelationshipType = ValueOf<typeof RELATIONSHIP_TYPES>;

/**
 * Tipo para niveles de intensidad
 */
export type IntensityLevel = ValueOf<typeof INTENSITY_LEVELS>;

/**
 * Tipo para niveles de riesgo
 */
export type RiskLevel = ValueOf<typeof RISK_LEVELS>;
