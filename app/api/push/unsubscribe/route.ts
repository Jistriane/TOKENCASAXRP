import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const subscription = await request.json();
    
    // Em produção, removeria do database
    console.log('Unsubscribe:', subscription.endpoint);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao remover subscription' },
      { status: 500 }
    );
  }
}

