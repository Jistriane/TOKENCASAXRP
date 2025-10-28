'use client';

import { useEffect, useState } from 'react';

export function usePushNotifications() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
          .getSubscription()
          .then((sub) => setSubscription(sub));
      });
    }
  }, []);

  const subscribe = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push notifications não suportadas');
      return;
    }

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
      
      console.log('Push subscription criada');
    } catch (error) {
      console.error('Erro ao criar push subscription:', error);
    }
  };

  return { subscription, subscribe };
}

