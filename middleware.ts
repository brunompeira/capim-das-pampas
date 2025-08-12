import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar se o site está em construção
  const isUnderConstruction = process.env.SITE_UNDER_CONSTRUCTION === 'true';
  
  // Se estiver em construção e não for a página de construção
  if (isUnderConstruction && request.nextUrl.pathname !== '/construcao') {
    // Permitir acesso a APIs
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.next();
    }
    
    // Redirecionar para página de construção
    return NextResponse.redirect(new URL('/construcao', request.url));
  }
  
  // Se não estiver em construção e for a página de construção
  if (!isUnderConstruction && request.nextUrl.pathname === '/construcao') {
    // Redirecionar para página inicial
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
