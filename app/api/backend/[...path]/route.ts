import { NextRequest, NextResponse } from 'next/server';

// Configuração da URL do backend
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, params.path, 'GET');
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, params.path, 'POST');
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, params.path, 'PUT');
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, params.path, 'DELETE');
}

async function handleRequest(request: NextRequest, pathSegments: string[], method: string) {
  try {
    const url = request.nextUrl;
    const searchParams = url.searchParams.toString();
    
    // Construir path do backend
    const backendPath = `/api/${pathSegments.join('/')}`;
    const backendUrl = `${BACKEND_URL}${backendPath}${searchParams ? `?${searchParams}` : ''}`;
    
    // Preparar headers
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      headers.set(key, value);
    });
    headers.set('Content-Type', 'application/json');
    
    // Preparar body (se aplicável)
    let body = undefined;
    if (method !== 'GET' && method !== 'HEAD') {
      try {
        const text = await request.text();
        if (text) {
          body = text;
        }
      } catch (e) {
        // No body
      }
    }
    
    // Fazer requisição para o backend
    const response = await fetch(backendUrl, {
      method,
      headers,
      body,
    });
    
    const data = await response.text();
    
    return NextResponse.json(JSON.parse(data), { status: response.status });
  } catch (error: any) {
    console.error('Error proxying request:', error);
    return NextResponse.json(
      { error: 'Backend request failed', message: error.message },
      { status: 500 }
    );
  }
}

