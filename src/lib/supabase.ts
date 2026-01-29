// src/lib/supabase.ts
// Configuración de Supabase separada para Client y Server Components

import { createBrowserClient } from '@supabase/ssr'
import { sanitizeUUID } from './security'

// ================================================================
// CONFIGURACIÓN DE ENVIRONMENT
// ================================================================

// Obtener variables de entorno (funcionan en el cliente con NEXT_PUBLIC_)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validación de variables requeridas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables')
}

// Validación adicional de formato de URL
if (!supabaseUrl.startsWith('https://')) {
  throw new Error('Supabase URL must use HTTPS protocol')
}

// ================================================================
// CLIENTE PARA COMPONENTES DEL CLIENTE (Browser)
// ================================================================

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// ================================================================
// FUNCIONES HELPER DE AUTENTICACIÓN
// ================================================================

/**
 * Verifica si el usuario puede acceder a un niño específico
 * @param childId - UUID del niño (será sanitizado)
 * @param userId - UUID del usuario opcional (será sanitizado)
 */
export async function userCanAccessChild(childId: string, userId?: string): Promise<boolean> {
  if (!childId) {
    return false
  }
  
  try {
    // Sanitizar UUIDs para prevenir injection
    const sanitizedChildId = sanitizeUUID(childId);
    const sanitizedUserId = userId ? sanitizeUUID(userId) : null;
    
    const supabase = createClient()
    
    const { data } = await supabase.rpc('user_can_access_child', {
      child_id: sanitizedChildId,
      user_id: sanitizedUserId
    })
    
    return data === true
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error checking child access:', error)
    }
    return false
  }
}

/**
 * Verifica si el usuario puede editar un niño específico
 * @param childId - UUID del niño (será sanitizado)
 * @param userId - UUID del usuario opcional (será sanitizado)
 */
export async function userCanEditChild(childId: string, userId?: string): Promise<boolean> {
  if (!childId) {
    return false
  }
  
  try {
    // Sanitizar UUIDs para prevenir injection
    const sanitizedChildId = sanitizeUUID(childId);
    const sanitizedUserId = userId ? sanitizeUUID(userId) : null;
    
    const supabase = createClient()
    
    const { data } = await supabase.rpc('user_can_edit_child', {
      child_id: sanitizedChildId,
      user_id: sanitizedUserId
    })
    
    return data === true
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error checking child edit permissions:', error)
    }
    return false
  }
}

/**
 * Registra acceso sensible para auditoría
 */
export async function auditSensitiveAccess(
  action: string,
  resourceId: string,
  details?: string
): Promise<void> {
  if (!action || !resourceId) {
    return
  }
  
  const supabase = createClient()
  
  try {
    await supabase.rpc('audit_sensitive_access', {
      action_type: action,
      resource_id: resourceId,
      action_details: details ?? null
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logging sensitive access:', error)
    }
    // No fallar por errores de auditoría
  }
}

// ================================================================
// MANEJO DE ERRORES
// ================================================================

export interface SupabaseError {
  message: string
  details?: string
  hint?: string
  code?: string
}

// ================================================================
// STORAGE HELPERS
// ================================================================

export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  ATTACHMENTS: 'attachments',
  DOCUMENTS: 'documents'
} as const

/**
 * Sube un archivo al storage de Supabase
 */
export async function uploadFile(
  bucket: keyof typeof STORAGE_BUCKETS,
  file: File,
  path?: string
): Promise<{ url: string; path: string }> {
  if (!file) {
    throw new Error('File is required')
  }
  
  const supabase = createClient()
  const fileName = path || `${Date.now()}-${file.name}`
  
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKETS[bucket])
    .upload(fileName, file)
  
  if (error) {
    throw new Error(`Error uploading file: ${error.message}`)
  }
  
  if (!data) {
    throw new Error('Upload failed: no data returned')
  }
  
  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKETS[bucket])
    .getPublicUrl(data.path)
  
  return {
    url: urlData.publicUrl,
    path: data.path
  }
}

/**
 * Obtiene URL pública de un archivo
 */
export function getPublicUrl(bucket: keyof typeof STORAGE_BUCKETS, path: string): string {
  if (!path) {
    return ''
  }
  
  const supabase = createClient()
  
  const { data } = supabase.storage
    .from(STORAGE_BUCKETS[bucket])
    .getPublicUrl(path)
  
  return data.publicUrl
}

/**
 * Elimina un archivo del storage
 */
export async function deleteFile(
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string
): Promise<void> {
  if (!path) {
    throw new Error('Path is required')
  }
  
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS[bucket])
    .remove([path])
  
  if (error) {
    throw new Error(`Error deleting file: ${error.message}`)
  }
}

// Export default client instance for backwards compatibility
export const supabase = createClient()
