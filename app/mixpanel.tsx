'use client';

import { useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';

declare global {
  interface Window {
    mixpanel: any;
  }
}

export default function MixpanelAnalytics() {
  const { isConnected, address } = useWallet();

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.mixpanel) {
      // Mock Mixpanel para desenvolvimento
      window.mixpanel = {
        init: () => {},
        track: (event: string, props?: any) => {
          console.log('Mixpanel track:', event, props);
        },
        identify: (id: string) => {
          console.log('Mixpanel identify:', id);
        },
      };
    }

    if (isConnected && address && window.mixpanel) {
      window.mixpanel.identify(address);
      window.mixpanel.track('Wallet Connected');
    }
  }, [isConnected, address]);

  return null;
}
