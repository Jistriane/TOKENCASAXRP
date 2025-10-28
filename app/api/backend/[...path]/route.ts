import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// URL do backend local para desenvolvimento
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const isDev = process.env.NODE_ENV === 'development';

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const DELETE = handle;
export const PATCH = handle;
export const OPTIONS = handle;

async function handle(request: NextRequest, context: { params: { path: string[] } }) {
  const { params } = context;
  const method = request.method;
  
  // Em desenvolvimento, fazer proxy para backend local
  if (isDev) {
    return handleRequest(request, params.path, method);
  }
  
  // Em produção (Vercel), executar serverless function
  try {
    const serverlessHandler = await import('@/api/backend.js');
    
    // Converter NextRequest para formato Express/Node.js
    const url = new URL(request.url);
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
    // Obter body
    let body = null;
    if (method !== 'GET' && method !== 'HEAD') {
      try {
        body = await request.text();
      } catch (e) {
        // No body
      }
    }
    
    // Criar mock do req/res
    const req = {
      method,
      url: url.pathname + url.search,
      headers,
      body,
      query: Object.fromEntries(url.searchParams),
    };
    
    const chunks: any[] = [];
    let statusCode = 200;
    const resHeaders: Record<string, string> = {};
    
    const res = {
      status: (code: number) => {
        statusCode = code;
        return res;
      },
      setHeader: (name: string, value: string) => {
        resHeaders[name] = value;
      },
      header: (name: string, value: string) => {
        resHeaders[name] = value;
      },
      send: (data: any) => {
        chunks.push(data);
      },
      json: (data: any) => {
        chunks.push(JSON.stringify(data));
        resHeaders['Content-Type'] = 'application/json';
      },
      end: () => {},
    };
    
    await serverlessHandler.default(req, res);
    
    const responseBody = chunks.join('');
    
    return new NextResponse(responseBody, {
      status: statusCode,
      headers: resHeaders,
    });
  } catch (error: any) {
    console.error('❌ Serverless handler error:', error);
    return NextResponse.json(
      { error: 'Backend error', message: error.message },
      { status: 500 }
    );
  }
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

