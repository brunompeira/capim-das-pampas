import mongoose from 'mongoose';
import { configureMongoose } from './mongooseConfig';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Configurações do pool de conexões (apenas as essenciais)
const connectionOptions = {
  maxPoolSize: 10, // Máximo de 10 conexões simultâneas
  minPoolSize: 2,  // Mínimo de 2 conexões sempre ativas
  maxIdleTimeMS: 30000, // Fechar conexões inativas após 30 segundos
  serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos para seleção de servidor
  socketTimeoutMS: 45000, // Timeout de socket de 45 segundos
};

// Variável global para controlar o estado da conexão
let isConnected = false;

async function dbConnect() {
  try {
    // Aplicar configurações globais do Mongoose
    configureMongoose();
    
    // Se já estiver conectado, retornar a conexão existente
    if (isConnected && mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    // Se a conexão estiver ativa, usar ela
    if (mongoose.connection.readyState === 1) {
      isConnected = true;
      return mongoose.connection;
    }

    // Conectar com as opções otimizadas
    const connection = await mongoose.connect(MONGODB_URI!, connectionOptions);
    
    // Configurar listeners de eventos (sem logs)
    mongoose.connection.on('connected', () => {
      isConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
    });

    // Processo de graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

    return connection;
  } catch (error) {
    isConnected = false;
    throw error;
  }
}

export default dbConnect;
