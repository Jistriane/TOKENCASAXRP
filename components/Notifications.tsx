'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';

interface Notification {
  id: string;
  type: 'rent' | 'purchase' | 'sale' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function Notifications() {
  const { isConnected, address } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'rent',
      title: 'Aluguel Recebido! 🎉',
      message: 'Você recebeu R$ 3,75 de aluguel do Apartamento - Copacabana',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      type: 'purchase',
      title: 'Investimento Confirmado ✅',
      message: 'Compra de 625 tokens do Apartamento - Copacabana confirmada',
      timestamp: new Date(Date.now() - 86400000),
      read: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'Novo Imóvel Disponível 🏠',
      message: 'Loja Comercial - Vila Madalena agora disponível para investimento',
      timestamp: new Date(Date.now() - 172800000),
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  if (!isConnected) return null;

  return (
    <>
      {/* Botão de Notificações */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Painel de Notificações */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed right-6 top-20 bg-white rounded-xl shadow-2xl w-96 max-h-[600px] flex flex-col z-50">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Notificações</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Marcar todas como lidas
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Lista de Notificações */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>Nenhuma notificação</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          notification.type === 'rent' ? 'bg-green-100 text-green-600' :
                          notification.type === 'purchase' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'sale' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {notification.type === 'rent' && '💰'}
                          {notification.type === 'purchase' && '✅'}
                          {notification.type === 'sale' && '💸'}
                          {notification.type === 'info' && 'ℹ️'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.timestamp.toLocaleString('pt-BR')}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

