import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Configurações básicas e estáveis do pool de conexões
const connectionOptions = {
  maxPoolSize: 5, // Máximo de 5 conexões simultâneas
  minPoolSize: 1, // Mínimo de 1 conexão
  maxIdleTimeMS: 60000, // 60 segundos
  serverSelectionTimeoutMS: 10000, // 10 segundos
  socketTimeoutMS: 45000, // 45 segundos
  connectTimeoutMS: 10000, // 10 segundos
};

// Variável global para controlar o estado da conexão
let isConnected = false;
let connectionPromise: Promise<typeof mongoose> | null = null;

async function dbConnect() {
  try {
    // Se já estiver conectado, retornar a conexão existente
    if (isConnected && mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    // Se a conexão estiver ativa, usar ela
    if (mongoose.connection.readyState === 1) {
      isConnected = true;
      return mongoose.connection;
    }

    // Se já existe uma conexão em andamento, aguardar
    if (connectionPromise) {
      return await connectionPromise;
    }

    // Configurações básicas do Mongoose
    mongoose.set('strictQuery', false);
    mongoose.set('autoIndex', false);
    
    // Criar nova conexão
    connectionPromise = mongoose.connect(MONGODB_URI!, connectionOptions);
    
    const connection = await connectionPromise;
    
    // Configurar listeners de eventos
    mongoose.connection.on('connected', () => {
      isConnected = true;
      connectionPromise = null;
    });

    mongoose.connection.on('error', () => {
      isConnected = false;
      connectionPromise = null;
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      connectionPromise = null;
    });

    return connection;
  } catch (error) {
    isConnected = false;
    connectionPromise = null;
    throw error;
  }
}

export default dbConnect;
