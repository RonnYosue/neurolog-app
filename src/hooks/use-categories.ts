// src/hooks/use-categories.ts
// Hook actualizado para gestión de categorías con Supabase v2

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface Category {
  id: string
  name: string
  description: string | null
  color: string
  icon: string
  is_active: boolean
  sort_order: number
  created_at: string
}

interface UseCategoriesReturn {
  categories: Category[]
  loading: boolean
  error: string | null
  fetchCategories: () => Promise<void>
  refreshCategories: () => Promise<void>
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchCategories = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📚 Fetching categories...')
      }
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Error fetching categories:', error)
        }
        throw error
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Categories fetched successfully:', data?.length || 0)
      }
      setCategories(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar las categorías'
      setError(errorMessage)
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error in fetchCategories:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  const refreshCategories = async (): Promise<void> => {
    await fetchCategories()
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return {
    categories,
    loading,
    error,
    fetchCategories,
    refreshCategories
  }
}