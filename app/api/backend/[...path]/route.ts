import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const isProd = process.env.NODE_ENV === 'production';

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const DELETE = handle;
export const PATCH = handle;
export const OPTIONS = handle;

async function handle(request: NextRequest, context: { params: { path: string[] } }) {
  const { params } = context;
  const method = request.method;
  
  // Em produção na Vercel, usar serverless function
  if (isProd) {
    // Construir URL do serverless function
    const url = request.nextUrl;
    const baseUrl = `https://${url.host}`;
    const apiUrl = `${baseUrl}/api${url.pathname}${url.search}`;
    
    // Fazer requisição para o serverless function
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
    let body = null;
    if (method !== 'GET' && method !== 'HEAD') {
      try {
        body = await request.text();
      } catch (e) {
        // No body
      }
    }
    
    const response = await fetch(apiUrl, {
      method,
      headers,
      body,
    });
    
    const data = await response.text();
    
    try {
      return NextResponse.json(JSON.parse(data), { status: response.status });
    } catch {
      return new NextResponse(data, { status: response.status });
    }
  }
  
  // Em desenvolvimento, fazer proxy para backend local
  return handleRequest(request, params.path, method);
}

async function handleRequest(request: NextRequest, pathSegments: string[], method: string) {
  try {
    const url = request.nextUrl;
    const searchParams = url.searchParams.toString();
    
    const backendPath = `/api/${pathSegments.join('/')}`;
    const backendUrl = `${BACKEND_URL}${backendPath}${searchParams ? `?${searchParams}` : ''}`;
    
    console.log(`🔄 Proxying ${method} ${backendUrl}`);
    
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
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
    
    const response = await fetch(backendUrl, {
      method,
      headers,
      body,
    });
    
    const data = await response.text();
    
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

