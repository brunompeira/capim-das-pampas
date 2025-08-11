import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const settingsFilePath = path.join(process.cwd(), 'data', 'adminSettings.json');

// Função para ler as configurações do ficheiro
async function readSettings() {
  try {
    const data = await fs.readFile(settingsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Se o ficheiro não existir, retorna as configurações padrão
    return {
      siteSettings: {
        name: 'Capim das Pampas',
        email: 'contacto@capimdaspampas.pt',
        phone: '+351 912 345 678',
        whatsapp: '+351 912 345 678',
        address: 'Rua das Flores, 123 - 1000-001 Lisboa, Portugal',
        openingHours: {
          monday: { open: '08:00', close: '18:00', closed: false },
          tuesday: { open: '08:00', close: '18:00', closed: false },
          wednesday: { open: '08:00', close: '18:00', closed: false },
          thursday: { open: '08:00', close: '18:00', closed: false },
          friday: { open: '08:00', close: '18:00', closed: false },
          saturday: { open: '08:00', close: '16:00', closed: false },
          sunday: { open: '10:00', close: '16:00', closed: true },
        },
        team: [
          { id: '1', name: 'Maria Silva', photo: '' },
          { id: '2', name: 'João Santos', photo: '' },
          { id: '3', name: 'Ana Costa', photo: '' }
        ]
      },
      contactSettings: {
        phone: '+351 912 345 678',
        email: 'contacto@capimdaspampas.pt',
        addresses: [
          {
            id: '1',
            name: 'Loja Principal',
            address: 'Rua das Flores, 123 - 1000-001 Lisboa, Portugal',
            coordinates: [38.7223, -9.1393], // Coordenadas de Lisboa
            openingHours: {
              monday: { open: '08:00', close: '18:00', closed: false },
              tuesday: { open: '08:00', close: '18:00', closed: false },
              wednesday: { open: '08:00', close: '18:00', closed: false },
              thursday: { open: '08:00', close: '18:00', closed: false },
              friday: { open: '08:00', close: '18:00', closed: false },
              saturday: { open: '08:00', close: '16:00', closed: false },
              sunday: { open: '10:00', close: '16:00', closed: true },
            }
          }
        ]
      }
    };
  }
}

// Função para guardar as configurações no ficheiro
async function writeSettings(settings: any) {
  try {
    // Garantir que o diretório existe
    const dir = path.dirname(settingsFilePath);
    await fs.mkdir(dir, { recursive: true });
    
    await fs.writeFile(settingsFilePath, JSON.stringify(settings, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao guardar configurações:', error);
    return false;
  }
}

// GET - Ler configurações
export async function GET() {
  try {
    const settings = await readSettings();
    return NextResponse.json(settings, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao ler configurações' },
      { status: 500 }
    );
  }
}

// Forçar revalidação a cada 0 segundos
export const revalidate = 0;

// POST - Guardar configurações (apenas para admin autenticado)
export async function POST(request: NextRequest) {
  try {
    const { siteSettings, contactSettings } = await request.json();
    
    // Verificar se o admin está autenticado
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const authenticated = token === 'admin-token'; // Simplificado para demo
    
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const settings = {
      siteSettings,
      contactSettings,
      lastUpdated: new Date().toISOString()
    };

    const success = await writeSettings(settings);
    
    if (success) {
      return NextResponse.json({ success: true, message: 'Configurações guardadas com sucesso' });
    } else {
      return NextResponse.json(
        { error: 'Erro ao guardar configurações' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
