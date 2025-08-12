import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar a variável de ambiente
    const isUnderConstruction = process.env.SITE_UNDER_CONSTRUCTION === 'true';
    
    return NextResponse.json({
      isUnderConstruction,
      message: isUnderConstruction 
        ? 'Site está em construção' 
        : 'Site está ativo'
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
