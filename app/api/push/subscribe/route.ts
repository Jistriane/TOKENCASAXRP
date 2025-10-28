import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const subscription = await request.json();
    
    // Em produção, salvaria no database
    console.log('Subscription recebida:', subscription.endpoint);
    
    // Salvar no backend/PostgreSQL
    // await backend.savePushSubscription(subscription);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao salvar subscription' },
      { status: 500 }
    );
  }
}
