'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Ops! Algo deu errado
              </h1>
              <p className="text-gray-600 mb-4">
                Encontramos um erro inesperado. Nossa equipe foi notificada.
              </p>
              {this.state.error && (
                <details className="mt-4 text-left bg-red-50 border border-red-200 rounded-lg p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-red-800 mb-2">
                    Detalhes técnicos
                  </summary>
                  <pre className="text-xs text-red-700 overflow-auto whitespace-pre-wrap">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleReset}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Voltar para Home
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Recarregar Página
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 mb-2">
                  Precisa de ajuda?
                </p>
                <a
                  href="/contact"
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Entre em contato com suporte
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
