import { NextResponse } from 'next/server';

// Simula distribuição de aluguel via Escrow
export async function POST(request: Request) {
  try {
    const { propertyId, totalRent, totalTokens } = await request.json();
    
    console.log('Distribuindo aluguel via Escrow:', { propertyId, totalRent });
    
    // Cálculo proporcional
    const rentPerToken = totalRent / totalTokens;
    
    // Em produção:
    // 1. Buscar todos os holders de tokens
    // 2. Calcular distribuição proporcional
    // 3. Criar transações Escrow time-locked
    // 4. Release automático no dia X do mês
    
    const mockDistribution = {
      propertyId,
      totalRent,
      totalTokens,
      rentPerToken,
      distributedAt: new Date().toISOString(),
      distributions: [
        { holder: 'rAddress1', tokens: 625, payment: 3.75 },
        { holder: 'rAddress2', tokens: 1333, payment: 8.0 },
      ],
    };
    
    return NextResponse.json({ 
      success: true,
      distribution: mockDistribution,
      message: 'Aluguel distribuído automaticamente via Escrow'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao distribuir aluguel' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  
  // Busca histórico de distribuições
  const mockHistory = [
    {
      date: '2024-06-05',
      amount: 6000,
      rentPerToken: 0.006,
      distributed: true,
    },
    {
      date: '2024-05-05',
      amount: 6000,
      rentPerToken: 0.006,
      distributed: true,
    },
  ];
  
  return NextResponse.json({ history: mockHistory });
}

