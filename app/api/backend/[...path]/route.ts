import { NextRequest, NextResponse } from 'next/server';

// Em produção/Vercel, usar backend serverless diretamente
// Em desenvolvimento, fazer proxy para o backend local
const isProd = process.env.NODE_ENV === 'production';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const DELETE = handle;
export const PATCH = handle;

async function handle(request: NextRequest, context: { params: { path: string[] } }) {
  const { params } = context;
  const method = request.method;
  
  // Em produção, redirecionar para handler serverless
  if (isProd) {
    // Importar e executar o handler serverless do NestJS
    try {
      const { handler } = await import('@/../api/backend/serverless');
      
      // Converter request do Next.js para formato AWS Lambda
      const event = {
        httpMethod: method,
        path: `/api/${params.path.join('/')}`,
        pathParameters: params.path,
        queryStringParameters: Object.fromEntries(request.nextUrl.searchParams),
        headers: Object.fromEntries(request.headers.entries()),
        body: method !== 'GET' && method !== 'HEAD' ? await request.text() : null,
        isBase64Encoded: false,
      };
      
      const result = await handler(event, {
        callbackWaitsForEmptyEventLoop: false,
      });
      
      return new NextResponse(result.body, {
        status: result.statusCode,
        headers: result.headers as HeadersInit,
      });
    } catch (error: any) {
      console.error('Serverless handler error:', error);
      return NextResponse.json(
        { error: 'Backend error', message: error.message },
        { status: 500 }
      );
    }
  }
  
  // Em desenvolvimento, fazer proxy para backend local
  return handleRequest(request, params.path, method);
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

