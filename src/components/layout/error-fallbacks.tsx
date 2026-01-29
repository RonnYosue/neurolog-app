'use client';

/**
 * Componente de fallback para errores en el layout principal
 */
export function LayoutErrorFallback() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-600 text-2xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Error en la aplicación
        </h1>
        <p className="text-gray-600 mb-4">
          Ocurrió un problema al cargar NeuroLog
        </p>
        <button 
          onClick={handleReload}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Recargar página
        </button>
      </div>
    </div>
  );
}

/**
 * Componente de fallback para errores de autenticación
 */
export function AuthErrorFallback() {
  const handleGoToLogin = () => {
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-yellow-600 text-2xl">🔐</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Error de autenticación
        </h2>
        <p className="text-gray-600 mb-4">
          Problema al cargar la sesión de usuario
        </p>
        <button 
          onClick={handleGoToLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Ir a Login
        </button>
      </div>
    </div>
  );
}
