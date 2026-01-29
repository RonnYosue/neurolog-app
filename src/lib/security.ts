/**
 * @fileoverview Utilidades de seguridad para la aplicación NeuroLog
 * @description Funciones para sanitización, validación y prevención de ataques
 */

import { ERROR_MESSAGES } from './constants';

// ================================================================
// SANITIZACIÓN DE INPUTS
// ================================================================

/**
 * Sanitiza un string removiendo caracteres peligrosos
 * Previene XSS y SQL Injection
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    // Remover caracteres nulos
    .replace(/\0/g, '')
    // Remover scripts potencialmente peligrosos
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remover event handlers inline
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Remover javascript: protocols
    .replace(/javascript:/gi, '')
    // Remover data: protocols (excepto images)
    .replace(/data:(?!image\/)/gi, '');
}

/**
 * Sanitiza HTML permitiendo solo tags seguros
 */
export function sanitizeHTML(html: string): string {
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'];
  const allowedAttributes = ['href', 'title', 'alt'];

  let sanitized = sanitizeString(html);

  // Remover todos los tags excepto los permitidos
  sanitized = sanitized.replace(/<(\/?)([\w-]+)([^>]*)>/g, (_match, slash, tag, attrs) => {
    if (!allowedTags.includes(tag.toLowerCase())) {
      return '';
    }

    // Sanitizar atributos
    const sanitizedAttrs = attrs.replace(
      /(\w+)\s*=\s*["']([^"']*)["']/g,
      (_attrMatch: string, name: string, value: string) => {
        if (!allowedAttributes.includes(name.toLowerCase())) {
          return '';
        }
        return `${name}="${sanitizeString(value)}"`;
      }
    );

    return `<${slash}${tag}${sanitizedAttrs}>`;
  });

  return sanitized;
}

/**
 * Sanitiza un email
 */
export function sanitizeEmail(email: string): string {
  const sanitized = sanitizeString(email).toLowerCase();
  // Validar formato básico de email
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  
  if (!emailRegex.test(sanitized)) {
    throw new Error(ERROR_MESSAGES.VALIDATION);
  }
  
  return sanitized;
}

/**
 * Sanitiza un UUID
 */
export function sanitizeUUID(uuid: string): string {
  const sanitized = sanitizeString(uuid);
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (!uuidRegex.test(sanitized)) {
    throw new Error('Invalid UUID format');
  }
  
  return sanitized;
}

/**
 * Sanitiza un número
 */
export function sanitizeNumber(input: string | number, min?: number, max?: number): number {
  const num = typeof input === 'number' ? input : parseFloat(input);
  
  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid number');
  }
  
  if (min !== undefined && num < min) {
    throw new Error(`Number must be at least ${min}`);
  }
  
  if (max !== undefined && num > max) {
    throw new Error(`Number must be at most ${max}`);
  }
  
  return num;
}

/**
 * Sanitiza una URL
 */
export function sanitizeURL(url: string): string {
  const sanitized = sanitizeString(url);
  
  try {
    const urlObj = new URL(sanitized);
    
    // Solo permitir protocolos seguros
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('Invalid URL protocol');
    }
    
    return urlObj.href;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.VALIDATION);
  }
}

// ================================================================
// VALIDACIÓN DE INPUTS
// ================================================================

/**
 * Valida longitud de string
 */
export function validateLength(
  input: string,
  minLength: number,
  maxLength: number,
  fieldName: string = 'Field'
): void {
  if (input.length < minLength) {
    throw new Error(`${fieldName} must be at least ${minLength} characters`);
  }
  
  if (input.length > maxLength) {
    throw new Error(`${fieldName} must be at most ${maxLength} characters`);
  }
}

/**
 * Valida formato de email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Valida fortaleza de contraseña
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valida que un string no contenga SQL injection patterns
 */
export function validateNoSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|DECLARE)\b)/i,
    /(--|;|\/\*|\*\/|xp_|sp_)/i,
    /(\bOR\b.*=.*|1\s*=\s*1)/i
  ];
  
  return !sqlPatterns.some(pattern => pattern.test(input));
}

// ================================================================
// RATE LIMITING HELPERS
// ================================================================

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Implementa rate limiting simple en memoria
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60000 // 1 minuto
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  // Si no hay registro o el tiempo expiró, crear nuevo
  if (!record || record.resetTime < now) {
    const resetTime = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: maxAttempts - 1, resetTime };
  }
  
  // Incrementar contador
  record.count += 1;
  
  // Verificar si excedió el límite
  if (record.count > maxAttempts) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }
  
  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    resetTime: record.resetTime
  };
}

/**
 * Limpia registros expirados del rate limiter
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (record.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

// Limpiar cada 5 minutos
if (typeof window === 'undefined') {
  // Solo en servidor
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

// ================================================================
// PROTECCIÓN CONTRA CSRF
// ================================================================

/**
 * Genera un token CSRF
 */
export function generateCSRFToken(): string {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Fallback para servidor
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Valida un token CSRF
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken && token.length > 0;
}

// ================================================================
// PROTECCIÓN DE DATOS SENSIBLES
// ================================================================

/**
 * Enmascara un email para logs
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return '***';
  
  const maskedLocal = local.length > 2
    ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
    : '***';
  
  return `${maskedLocal}@${domain}`;
}

/**
 * Enmascara un nombre para logs
 */
export function maskName(name: string): string {
  const words = name.split(' ');
  return words.map(word => {
    if (word.length <= 2) return word;
    return word[0] + '*'.repeat(word.length - 1);
  }).join(' ');
}

/**
 * Enmascara datos sensibles en objetos para logging
 */
export function maskSensitiveData<T extends Record<string, any>>(
  data: T,
  sensitiveFields: string[] = ['password', 'token', 'secret', 'apiKey', 'privateKey']
): Partial<T> {
  const masked: any = { ...data };
  
  for (const field of sensitiveFields) {
    if (field in masked) {
      masked[field] = '***REDACTED***';
    }
  }
  
  return masked as Partial<T>;
}

// ================================================================
// VALIDACIÓN DE VARIABLES DE ENTORNO
// ================================================================

/**
 * Valida que todas las variables de entorno requeridas estén presentes
 */
export function validateEnvVariables(required: string[]): void {
  const missing: string[] = [];
  
  for (const varName of required) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

/**
 * Obtiene una variable de entorno de forma segura
 */
export function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  
  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${name} is not set`);
  }
  
  return value;
}

// ================================================================
// PROTECCIÓN CONTRA XSS
// ================================================================

/**
 * Escapa caracteres HTML
 */
export function escapeHTML(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Verifica si un string contiene HTML peligroso
 */
export function containsDangerousHTML(html: string): boolean {
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<form/i,
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(html));
}
