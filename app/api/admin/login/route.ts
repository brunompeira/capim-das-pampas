import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Verificar a palavra-passe no servidor
    const correctPassword = process.env.ADMIN_PASSWORD;
    
    if (!correctPassword) {
      return NextResponse.json(
        { success: false, error: 'Configuração de administração não encontrada' },
        { status: 500 }
      );
    }
    
    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Palavra-passe incorreta' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
