'use client';

import { useEffect, useState } from 'react';

export default function PushNotificationsManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      checkPermission();
      checkSubscription();
    }
  }, []);

  const checkPermission = async () => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  };

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error('Erro ao verificar subscription:', error);
    }
  };

  const requestPermission = async () => {
    if (!isSupported) {
      alert('Push notifications não são suportadas neste navegador.');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        await subscribe();
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
    }
  };

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      setSubscription(sub);

      // Enviar subscription para o backend
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub),
      });

      alert('Notificações push ativadas! ✅');
    } catch (error) {
      console.error('Erro ao criar subscription:', error);
    }
  };

  const unsubscribe = async () => {
    if (!subscription) return;

    try {
      await subscription.unsubscribe();
      setSubscription(null);

      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      alert('Notificações push desativadas.');
    } catch (error) {
      console.error('Erro ao remover subscription:', error);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
      <h3 className="font-bold text-gray-900 mb-2">🔔 Notificações Push</h3>
      
      {permission === 'granted' && subscription ? (
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Você receberá notificações sobre seus investimentos!
          </p>
          <button
            onClick={unsubscribe}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Desativar notificações
          </button>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Ative notificações para receber alertas sobre seus investimentos!
          </p>
          <button
            onClick={requestPermission}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Ativar Notificações
          </button>
        </div>
      )}
    </div>
  );
}

