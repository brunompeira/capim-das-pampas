import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/config/cloudinary';

// POST - Upload de imagem
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

    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhuma imagem fornecida' },
        { status: 400 }
      );
    }

    // Verificar tipo de ficheiro
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Ficheiro deve ser uma imagem' },
        { status: 400 }
      );
    }

    // Verificar tamanho (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Imagem deve ter menos de 10MB' },
        { status: 400 }
      );
    }

    // Converter File para Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload para Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'capim-das-pampas',
          resource_type: 'image',
          transformation: [
            { width: 800, height: 600, crop: 'limit' }, // Redimensionar
            { quality: 'auto:good' } // Otimizar qualidade
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
        alt: file.name
      }
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
