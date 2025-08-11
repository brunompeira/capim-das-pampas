import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '@/types';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

// Função para ler os produtos do ficheiro
async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(productsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Se o ficheiro não existir, retorna os produtos padrão
    return [
      {
        id: '1',
        name: 'Ramalhete de Rosas Vermelhas',
        description: 'Ramalhete elegante com 12 rosas vermelhas, perfeito para ocasiões especiais.',
        price: 25.90,
        category: 'flores',
        image: '/images/roses.jpg',
        available: true,
        featured: true,
      },
      {
        id: '2',
        name: 'Vaso de Cerâmica Artesanal',
        description: 'Vaso feito à mão com design único, ideal para plantas ou decoração.',
        price: 15.00,
        category: 'ceramica',
        image: '/images/vase.jpg',
        available: true,
        featured: true,
      },
      {
        id: '3',
        name: 'Arranjo de Flores do Campo',
        description: 'Arranjo natural com flores do campo, cores vibrantes e cheiro delicioso.',
        price: 18.50,
        category: 'flores',
        image: '/images/wildflowers.jpg',
        available: true,
      },
      {
        id: '4',
        name: 'Chávena de Cerâmica Pintada',
        description: 'Chávena artesanal pintada à mão, cada peça é única.',
        price: 8.50,
        category: 'ceramica',
        image: '/images/cup.jpg',
        available: true,
      },
      {
        id: '5',
        name: 'Orquídea Phalaenopsis',
        description: 'Orquídea elegante em vaso decorativo, símbolo de beleza e sofisticação.',
        price: 35.00,
        category: 'flores',
        image: '/images/orchid.jpg',
        available: true,
        featured: true,
      },
      {
        id: '6',
        name: 'Prato de Cerâmica Decorativo',
        description: 'Prato artesanal com desenhos tradicionais, perfeito para servir ou decorar.',
        price: 12.00,
        category: 'ceramica',
        image: '/images/plate.jpg',
        available: true,
      },
    ];
  }
}

// GET - Ler produtos (público)
export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao ler produtos' },
      { status: 500 }
    );
  }
}

// Forçar revalidação a cada 0 segundos
export const revalidate = 0;
