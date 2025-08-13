import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Verificar a variável de ambiente
    const isUnderConstruction = process.env.SITE_UNDER_CONSTRUCTION === 'true';
    
    // Se não estiver em construção, sempre permitir acesso
    if (!isUnderConstruction) {
      return NextResponse.json({
        isUnderConstruction: false,
        message: 'Site está ativo'
      });
    }

    // Se estiver em construção, verificar se tem acesso autorizado
    // Nota: Esta verificação é feita no frontend através do localStorage
    // A API sempre retorna que está em construção, mas o frontend pode ignorar
    // baseado no estado de autenticação local
    
    return NextResponse.json({
      isUnderConstruction: true,
      message: 'Site está em construção',
      requiresAuth: true
    });
  } catch (error) {
    console.error('Erro ao verificar status de construção:', error);
    return NextResponse.json(
      { 
        isUnderConstruction: false, 
        message: 'Erro ao verificar status, assumindo site ativo' 
      },
      { status: 500 }
    );
  }
}
