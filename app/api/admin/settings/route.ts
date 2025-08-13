import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/config/dbConnect';
import SiteSettings from '@/models/SiteSettings';
import Address from '@/models/Address';

// GET - Ler configurações
export async function GET() {
  try {
    await dbConnect();
    
    // Buscar configurações gerais do site
    let siteSettings = await SiteSettings.findOne({});
    
    if (!siteSettings) {
      // Criar configurações padrão se não existirem
      siteSettings = new SiteSettings({
        name: 'Capim das Pampas',
        email: 'capimdaspampas@gmail.com',
        phone: '+351 934 305 372',
        whatsapp: '+351 934 305 372',
        team: [
          { id: '1', name: 'Maria Silva', photo: '' },
          { id: '2', name: 'João Santos', photo: '' },
          { id: '3', name: 'Ana Costa', photo: '' }
        ]
      });
      
      await siteSettings.save();
    }

    // Buscar endereços
    let addresses = await Address.find({ active: true });
    
    if (addresses.length === 0) {
      // Criar endereço padrão se não existir
      const defaultAddress = new Address({
        name: 'Loja Principal',
        address: 'Rua das Flores, 123 - 1000-001 Lisboa, Portugal',
        coordinates: [38.7223, -9.1393],
        openingHours: {
          monday: { open: '08:00', close: '18:00', closed: false },
          tuesday: { open: '08:00', close: '18:00', closed: false },
          wednesday: { open: '08:00', close: '18:00', closed: false },
          thursday: { open: '08:00', close: '18:00', closed: false },
          friday: { open: '08:00', close: '18:00', closed: false },
          saturday: { open: '08:00', close: '16:00', closed: false },
          sunday: { open: '10:00', close: '16:00', closed: true }
        }
      });
      
      await defaultAddress.save();
      addresses = [defaultAddress];
    }

    // Converter para o formato esperado pelo frontend
    const formattedSettings = {
      siteSettings: {
        name: siteSettings.name,
        email: siteSettings.email,
        phone: siteSettings.phone,
        whatsapp: siteSettings.whatsapp,
        team: siteSettings.team
      },
      contactSettings: {
        phone: siteSettings.phone,
        email: siteSettings.email,
        addresses: addresses.map(addr => ({
          id: addr._id.toString(),
          name: addr.name,
          address: addr.address,
          coordinates: addr.coordinates,
          openingHours: addr.openingHours
        }))
      }
    };

    return NextResponse.json(formattedSettings, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Erro ao ler configurações:', error);
    return NextResponse.json(
      { error: 'Erro ao ler configurações' },
      { status: 500 }
    );
  }
}

// POST - Guardar configurações (apenas para admin autenticado)
export async function POST(request: NextRequest) {
  try {
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

    const { siteSettings, contactSettings } = await request.json();
    
    await dbConnect();
    
    // Atualizar configurações gerais do site
    let siteConfig = await SiteSettings.findOne({});
    
    if (!siteConfig) {
      siteConfig = new SiteSettings();
    }

    siteConfig.name = siteSettings.name;
    siteConfig.email = siteSettings.email;
    siteConfig.phone = siteSettings.phone;
    siteConfig.whatsapp = siteSettings.whatsapp;
    siteConfig.team = siteSettings.team;

    await siteConfig.save();

    // Obter IDs dos endereços que devem permanecer
    const remainingAddressIds = contactSettings.addresses
      .filter((addr: { id: string }) => addr.id && addr.id.length === 24 && /^[0-9a-fA-F]{24}$/.test(addr.id))
      .map((addr: { id: string }) => addr.id);

    // Apagar endereços que foram removidos no frontend
    if (remainingAddressIds.length > 0) {
      await Address.deleteMany({
        _id: { $nin: remainingAddressIds }
      });
      
    }

    // Atualizar ou criar endereços restantes
    for (const addressData of contactSettings.addresses) {
      // Verificar se o ID é um ObjectId válido do MongoDB
      if (addressData.id && addressData.id.length === 24 && /^[0-9a-fA-F]{24}$/.test(addressData.id)) {
        // ID válido do MongoDB - atualizar endereço existente
        try {
          await Address.findByIdAndUpdate(addressData.id, {
            name: addressData.name,
            address: addressData.address,
            coordinates: addressData.coordinates,
            openingHours: addressData.openingHours
          });
        } catch (error) {
          console.error('Erro ao atualizar endereço:', error);
          // Se falhar, criar novo endereço
          const newAddress = new Address({
            name: addressData.name,
            address: addressData.address,
            coordinates: addressData.coordinates,
            openingHours: addressData.openingHours
          });
          await newAddress.save();
        }
      } else {
        // ID inválido ou novo endereço - criar novo
        const newAddress = new Address({
          name: addressData.name,
          address: addressData.address,
          coordinates: addressData.coordinates,
          openingHours: addressData.openingHours
        });
        await newAddress.save();
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Configurações guardadas com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao guardar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
