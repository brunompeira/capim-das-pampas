import mongoose from 'mongoose';

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
    isConnected: mongoose.connection.readyState === 1
  };
}

// Função para verificar se há muitas conexões ativas
export function checkConnectionHealth() {
  return {
    timestamp: new Date().toISOString(),
    connectionStatus: getConnectionStatus()
  };
}
