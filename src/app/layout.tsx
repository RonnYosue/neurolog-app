// src/app/layout.tsx
// Layout principal CORREGIDO con Error Boundary para proteger el AuthProvider

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import ErrorBoundary from '@/components/layout/ErrorBoundary'
import { LayoutErrorFallback, AuthErrorFallback } from '@/components/layout/error-fallbacks'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NeuroLog - Seguimiento NEE',
  description: 'Sistema de registro diario para niños con necesidades educativas especiales',
  keywords: ['neurolog', 'NEE', 'educación especial', 'seguimiento', 'registro diario'],
  authors: [{ name: 'NeuroLog Team' }]
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* ✅ ERROR BOUNDARY PRINCIPAL QUE ENVUELVE TODO */}
        <ErrorBoundary fallback={<LayoutErrorFallback />}>
          {/* ✅ AUTH PROVIDER PROTEGIDO POR ERROR BOUNDARY */}
          <ErrorBoundary fallback={<AuthErrorFallback />}>
            <AuthProvider>
              {/* ✅ CONTENIDO PRINCIPAL TAMBIÉN PROTEGIDO */}
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
              
              {/* ✅ TOASTER PARA NOTIFICACIONES */}
              <Toaster />
            </AuthProvider>
          </ErrorBoundary>
        </ErrorBoundary>
      </body>
    </html>
  )
}