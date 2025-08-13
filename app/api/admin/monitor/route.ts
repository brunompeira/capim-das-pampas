import { NextResponse } from 'next/server';
import { getConnectionStatus } from '@/config/mongoConfig';

// GET - Monitorizar estado das conexões MongoDB
export async function GET() {
  try {
    const status = getConnectionStatus();
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      mongodb: status,
      recommendations: getRecommendations(status)
    });
  } catch (error) {
    console.error('Erro ao monitorizar MongoDB:', error);
    return NextResponse.json(
      { error: 'Erro ao monitorizar MongoDB' },
      { status: 500 }
    );
  }
}

function getRecommendations(status: any) {
  const recommendations = [];
  
  if (!status.isConnected) {
    recommendations.push('❌ MongoDB não está conectado - verificar configuração');
  }
  
  if (status.readyState === 2) {
    recommendations.push('⏳ MongoDB está a conectar - aguardar estabilização');
  }
  
  if (status.readyState === 3) {
    recommendations.push('🔄 MongoDB está a desconectar - verificar se há problemas');
  }
  
  if (status.isConnected) {
    recommendations.push('✅ MongoDB está estável e conectado');
    recommendations.push('💡 Monitorizar uso de conexões no painel MongoDB Atlas');
  }
  
  return recommendations;
}
