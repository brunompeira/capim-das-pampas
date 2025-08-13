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

async function dbConnect() {
  try {
    // Se a conexão estiver ativa, usar ela
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    // Configurações básicas do Mongoose
    mongoose.set('strictQuery', false);
    mongoose.set('autoIndex', false);
    
    // Criar nova conexão
    const connection = await mongoose.connect(MONGODB_URI!, connectionOptions);
    
    return connection;
  } catch (error) {
    throw error;
  }
}

export default dbConnect;
