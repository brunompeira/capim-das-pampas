# Capim das Pampas - Site de Flores e Cerâmica

Site profissional para florista/vendedor de peças de cerâmica com sistema de gestão integrado.

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Sistema de Gestão**: Interface simples para adicionar/editar produtos
- **Catálogo de Produtos**: Filtros por categoria e busca
- **Formulário de Contato**: Integração com WhatsApp e email
- **SEO Otimizado**: Meta tags e estrutura semântica
- **Performance**: Carregamento rápido e otimizado

## 📋 Páginas Disponíveis

- **Home** (`/`): Página inicial com produtos em destaque
- **Produtos** (`/produtos`): Catálogo completo com filtros
- **Sobre** (`/sobre`): Informações da empresa e equipe
- **Contato** (`/contato`): Formulário de contato e informações
- **Admin** (`/admin`): Sistema de gestão de produtos

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd CapimDasPampas
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 📝 Como Usar

### Gestão de Produtos

1. Acesse `/admin` no navegador
2. Use a interface para:
   - **Adicionar produtos**: Clique em "Adicionar Produto"
   - **Editar produtos**: Clique no ícone de editar
   - **Excluir produtos**: Clique no ícone de lixeira
   - **Marcar como destaque**: Use o checkbox "Destaque"

### Personalização

#### Alterar Informações da Empresa

Edite o arquivo `data/siteConfig.ts`:

```typescript
export const siteConfig: SiteConfig = {
  name: 'Sua Empresa',
  description: 'Sua descrição',
  contact: {
    phone: 'Seu telefone',
    whatsapp: 'Seu WhatsApp',
    email: 'seu@email.com',
    address: 'Seu endereço',
    instagram: '@seuinstagram',
    facebook: 'Sua página do Facebook',
  },
  about: {
    title: 'Sobre Nós',
    content: 'Sua história...',
  },
};
```

#### Adicionar Produtos

Edite o arquivo `data/products.ts` ou use a interface de admin:

```typescript
export const products: Product[] = [
  {
    id: '1',
    name: 'Nome do Produto',
    description: 'Descrição do produto',
    price: 99.90,
    category: 'flores', // ou 'ceramica'
    image: '/images/produto.jpg',
    available: true,
    featured: true, // para produtos em destaque
  },
];
```

### Imagens

1. Adicione suas imagens na pasta `public/images/`
2. Referencie no código como `/images/nome-da-imagem.jpg`

## 🎨 Personalização de Cores

Edite o arquivo `tailwind.config.js` para alterar as cores:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        // ... outras tonalidades
        600: '#0ea5e9', // cor principal
      },
      secondary: {
        // ... cores secundárias
      }
    },
  },
},
```

## 📱 Funcionalidades Mobile

- Menu responsivo
- Cards de produtos otimizados
- Formulários adaptados
- Botões de contato direto

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificar código
```

## 📞 Integrações

- **WhatsApp**: Links diretos para consulta de produtos
- **Email**: Formulário de contato funcional
- **Telefone**: Links para ligação direta
- **Redes Sociais**: Instagram e Facebook

## 📧 Configuração de Email (Netlify Forms)

O formulário de contacto usa **Netlify Forms** - 100% gratuito e ilimitado!

### Como configurar:

1. **Faça deploy no Netlify** (gratuito)
2. **Configure o email** onde quer receber as mensagens:
   - Vá para o dashboard do Netlify
   - Selecione o seu site
   - Vá para "Forms" > "contact"
   - Clique em "Settings" > "Notifications"
   - Adicione o seu email

### Vantagens:
- ✅ **Totalmente gratuito** (sem limites)
- ✅ **Sem configuração técnica** 
- ✅ **Proteção anti-spam** automática
- ✅ **Recebe emails** diretamente na sua caixa
- ✅ **Dashboard** para ver todas as mensagens

### O que acontece:
- Alguém preenche o formulário
- **Você recebe um email** com todos os dados
- Pode responder diretamente à pessoa
- Todas as mensagens ficam guardadas no Netlify

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático a cada push

### Outras Plataformas

O projeto é compatível com:
- Netlify
- Railway
- Heroku
- Qualquer servidor Node.js

## 📄 Estrutura do Projeto

```
CapimDasPampas/
├── app/                    # Páginas Next.js
│   ├── page.tsx           # Home
│   ├── produtos/          # Catálogo
│   ├── sobre/             # Sobre
│   ├── contato/           # Contato
│   └── admin/             # Gestão
├── components/            # Componentes reutilizáveis
├── data/                 # Dados mockados
├── types/                # Tipos TypeScript
├── public/               # Arquivos estáticos
└── README.md
```

## 🤝 Suporte

Para dúvidas ou suporte:
- Email: contato@capimdaspampas.com.br
- WhatsApp: (11) 99999-9999

## 📄 Licença

Este projeto é de uso livre para fins comerciais e pessoais.

---

**Desenvolvido com ❤️ para pequenos negócios**
