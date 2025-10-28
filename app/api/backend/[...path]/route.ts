import { NextRequest, NextResponse } from 'next/server';

// URL do backend
// Em produção na Vercel, aponta para a própria função serverless
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const DELETE = handle;
export const PATCH = handle;

async function handle(request: NextRequest, context: { params: { path: string[] } }) {
  const { params } = context;
  return handleRequest(request, params.path, request.method);
}

async function handleRequest(request: NextRequest, pathSegments: string[], method: string) {
  try {
    const url = request.nextUrl;
    const searchParams = url.searchParams.toString();
    
    // Construir path do backend
    const backendPath = `/api/${pathSegments.join('/')}`;
    const backendUrl = `${BACKEND_URL}${backendPath}${searchParams ? `?${searchParams}` : ''}`;
    
    console.log(`🔄 Proxying ${method} ${backendUrl}`);
    
    // Preparar headers
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
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
    
    // Tentar parsear como JSON, se falhar retornar texto
    try {
      return NextResponse.json(JSON.parse(data), { status: response.status });
    } catch {
      return new NextResponse(data, { status: response.status });
    }
  } catch (error: any) {
    console.error('❌ Error proxying request:', error);
    return NextResponse.json(
      { error: 'Backend request failed', message: error.message },
      { status: 500 }
    );
  }
}

