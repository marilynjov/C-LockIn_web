import React, { useState } from 'react';


const CLockInApp = () => {
  const [currentView, setCurrentView] = useState('login'); 

  const LoginForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Log In</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario:</label>
              <input
                type="text"
                placeholder="usuario"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña:</label>
              <input
                type="password"
                placeholder="contraseña"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setCurrentView('calendar')}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setCurrentView('signup')}
              className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SignupForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Crear Cuenta</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario:</label>
              <input
                type="text"
                placeholder="usuario"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo:</label>
              <input
                type="email"
                placeholder="correo"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña:</label>
              <input
                type="password"
                placeholder="contraseña"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar contraseña:</label>
              <input
                type="password"
                placeholder="contraseña"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setCurrentView('calendar')}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              Crear Cuenta
            </button>
            <button
              onClick={() => setCurrentView('login')}
              className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-500 text-white">
        <div className="px-6 py-4">
          <h1 className="text-4xl font-bold text-center">C-Lock In</h1>
        </div>
      </header>

      {/* Content */}
      {currentView === 'login' && <LoginForm />}
      {currentView === 'signup' && <SignupForm />}
      
    </div>
  );
};

export default CLockInApp;