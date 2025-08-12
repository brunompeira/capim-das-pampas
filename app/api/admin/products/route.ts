import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/config/dbConnect';
import Product from '@/models/Product';

// GET - Ler produtos
export async function GET() {
  try {
    await dbConnect();
    
    // Buscar produtos existentes ou criar padrões
    let products = await Product.find({});
    
    if (products.length === 0) {
      // Criar produtos padrão se não existirem
      const defaultProducts = [
        {
          name: 'Ramalhete de Rosas Vermelhas',
          description: 'Ramalhete elegante com 12 rosas vermelhas, perfeito para ocasiões especiais.',
          price: 25.90,
          category: 'flores',
          images: [],
          featured: true,
          inStock: true,
          tags: ['rosas', 'vermelhas', 'ramalhete'],
          specifications: {
            dimensions: '30x20 cm',
            material: 'Flores naturais',
            weight: '500g',
            care: 'Manter em água fresca'
          }
        },
        {
          name: 'Vaso de Cerâmica Artesanal',
          description: 'Vaso feito à mão com design único, ideal para plantas ou decoração.',
          price: 15.00,
          category: 'ceramica',
          images: [],
          featured: true,
          inStock: true,
          tags: ['vaso', 'cerâmica', 'artesanal'],
          specifications: {
            dimensions: '15x15 cm',
            material: 'Cerâmica',
            weight: '800g',
            care: 'Lavar com água morna'
          }
        },
        {
          name: 'Arranjo de Flores do Campo',
          description: 'Arranjo natural com flores do campo, cores vibrantes e cheiro delicioso.',
          price: 18.50,
          category: 'flores',
          images: [],
          featured: false,
          inStock: true,
          tags: ['campo', 'natural', 'colorido'],
          specifications: {
            dimensions: '25x18 cm',
            material: 'Flores naturais',
            weight: '400g',
            care: 'Manter em água fresca'
          }
        }
      ];

      // Criar e guardar produtos padrão
      for (const productData of defaultProducts) {
        const product = new Product(productData);
        await product.save();
      }
      
      products = await Product.find({});
    }

    // Converter para o formato esperado pelo frontend
    const formattedProducts = products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.images.length > 0 ? product.images[0].url : '/images/default.jpg',
      available: product.inStock,
      featured: product.featured
    }));

    return NextResponse.json(formattedProducts, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Erro ao ler produtos:', error);
    return NextResponse.json(
      { error: 'Erro ao ler produtos' },
      { status: 500 }
    );
  }
}

// POST - Guardar produtos (apenas para admin autenticado)
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

    const { products } = await request.json();
    
    console.log('🔍 API recebeu produtos:', JSON.stringify(products, null, 2));
    
    await dbConnect();
    
    // Limpar produtos existentes
    await Product.deleteMany({});
    
    // Criar novos produtos
    for (const productData of products) {
      console.log('🔍 Processando produto:', productData.name);
      console.log('🔍 Imagens recebidas:', productData.images);
      console.log('🔍 Tipo de images:', typeof productData.images);
      console.log('🔍 É array?', Array.isArray(productData.images));
      
      const product = new Product({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        images: productData.images || [], // Usar as imagens enviadas pelo admin
        featured: productData.featured,
        inStock: productData.inStock, // Usar inStock em vez de available
        tags: productData.tags || [],
        specifications: productData.specifications || {}
      });
      
      console.log('🔍 Criando produto:', productData.name);
      console.log('🔍 Com imagens:', productData.images);
      
      await product.save();
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Produtos guardados com sucesso',
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao guardar produtos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
