import mongoose from 'mongoose';

// Configurações globais do Mongoose para otimizar performance
export function configureMongoose() {
  // Configurações básicas e compatíveis
  mongoose.set('strictQuery', false);
  mongoose.set('runValidators', true);
  mongoose.set('autoIndex', true);
  
  // Configurações aplicadas silenciosamente
}

// Função para fechar todas as conexões
export async function closeAllConnections() {
  try {
    await mongoose.disconnect();
    // Conexões fechadas silenciosamente
  } catch (error) {
    // Erro tratado silenciosamente
  }
}

// Função para verificar o estado das conexões
export function getConnectionStatus() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    readyState: mongoose.connection.readyState,
    stateName: states[mongoose.connection.readyState as keyof typeof states],
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name,
    isConnected: mongoose.connection.readyState === 1
  };
}
