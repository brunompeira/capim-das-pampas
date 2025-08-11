'use client';

import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { Product } from '@/types';
import { Plus, Edit, Trash2, Eye, Save, X, Settings, Package, LogOut } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { defaultAdminSettings, defaultContactSettings, TeamMember } from '@/data/adminConfig';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [productList, setProductList] = useState<Product[]>(products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'flores',
    image: '/images/placeholder.jpg',
    available: true,
    featured: false,
  });

  // Configurações do site
  const [siteSettings, setSiteSettings] = useState({
    name: defaultAdminSettings.name,
    email: defaultAdminSettings.email,
    phone: defaultAdminSettings.phone,
    whatsapp: defaultAdminSettings.whatsapp,
    address: defaultAdminSettings.address,
    openingHours: defaultAdminSettings.openingHours
  });
  
  // Configurações de contacto
  const [contactSettings, setContactSettings] = useState({
    phone: defaultContactSettings.phone,
    email: defaultContactSettings.email,
    addresses: defaultContactSettings.addresses
  });

  // Configurações da equipa
  const [team, setTeam] = useState<TeamMember[]>(defaultAdminSettings.team);

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = localStorage.getItem('adminAuthenticated');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      if (!authenticated || !loginTime) {
        router.push('/admin/login');
        return;
      }

      // Verificar se o login não expirou (24 horas)
      const loginTimestamp = parseInt(loginTime);
      const currentTime = Date.now();
      const hoursSinceLogin = (currentTime - loginTimestamp) / (1000 * 60 * 60);
      
      if (hoursSinceLogin > 24) {
        // Login expirado
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminLoginTime');
        router.push('/admin/login');
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  // Carregar configurações e produtos guardados
  useEffect(() => {
    const loadData = async () => {
      try {
        // Carregar configurações
        const settingsResponse = await fetch('/api/admin/settings');
        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json();
          
          if (settingsData.siteSettings) {
            setSiteSettings(settingsData.siteSettings);
            // Carregar a equipa das configurações
            if (settingsData.siteSettings.team) {
              setTeam(settingsData.siteSettings.team);
            }
          }
          if (settingsData.contactSettings) {
            setContactSettings(settingsData.contactSettings);
          }
        }

        // Carregar produtos
        const productsResponse = await fetch('/api/admin/products');
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProductList(productsData);
        }
      } catch (error) {
        // Erro ao carregar dados
      }
    };

    // Só carregar dados se estiver autenticado
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const saveProductsToFile = async (products: Product[]) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token'
        },
        body: JSON.stringify({ products })
      });

      const data = await response.json();
      
      if (data.success) {
        // Produtos guardados com sucesso
      } else {
        alert('Erro ao guardar produtos. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao guardar produtos. Tente novamente.');
    }
  };

  const handleSave = (product: Product) => {
    const updatedProducts = productList.map(p => p.id === product.id ? product : p);
    setProductList(updatedProducts);
    setEditingProduct(null);
    saveProductsToFile(updatedProducts);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      const updatedProducts = productList.filter(p => p.id !== productId);
      setProductList(updatedProducts);
      saveProductsToFile(updatedProducts);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.price) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category as 'flores' | 'ceramica',
        image: newProduct.image || '/images/placeholder.jpg',
        available: newProduct.available || false,
        featured: newProduct.featured || false,
      };
      const updatedProducts = [...productList, product];
      setProductList(updatedProducts);
      saveProductsToFile(updatedProducts);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category: 'flores',
        image: '/images/placeholder.jpg',
        available: true,
        featured: false,
      });
      setIsAddingProduct(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token'
        },
        body: JSON.stringify({
          siteSettings: { ...siteSettings, team },
          contactSettings
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Configurações guardadas com sucesso!');
      } else {
        alert('Erro ao guardar configurações: ' + data.error);
      }
    } catch (error) {
      alert('Erro ao guardar configurações. Tente novamente.');
    }
  };



  const addNewAddress = () => {
    const newAddress = {
      id: Date.now().toString(),
      name: 'Nova Loja',
      address: 'Endereço da nova loja',
      coordinates: undefined as [number, number] | undefined,
      openingHours: defaultContactSettings.addresses[0].openingHours
    };
    setContactSettings(prev => ({
      ...prev,
      addresses: [...prev.addresses, newAddress]
    }));
  };

  const removeAddress = (addressId: string) => {
    if (contactSettings.addresses.length > 1) {
      setContactSettings(prev => ({
        ...prev,
        addresses: prev.addresses.filter(addr => addr.id !== addressId)
      }));
    }
  };

  const updateAddress = (addressId: string, field: string, value: any) => {
    setContactSettings(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => 
        addr.id === addressId ? { 
          ...addr, 
          [field]: field === 'coordinates' ? (value as [number, number] | undefined) : value 
        } : addr
      )
    }));
  };

  const updateAddressHours = (addressId: string, day: string, field: string, value: any) => {
    setContactSettings(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => 
        addr.id === addressId 
          ? { 
              ...addr, 
              openingHours: { 
                ...addr.openingHours, 
                [day]: { ...addr.openingHours[day as keyof typeof addr.openingHours], [field]: value }
              }
            } 
          : addr
      )
    }));
  };

  // Funções para gerir a equipa
  const addTeamMember = () => {
    const maxId = Math.max(...team.map(m => parseInt(m.id) || 0), 0);
    const newId = (maxId + 1).toString();
    setTeam(prev => [...prev, { id: newId, name: '', photo: '' }]);
  };

  const removeTeamMember = (id: string) => {
    if (team.length > 1) {
      setTeam(prev => prev.filter(member => member.id !== id));
    }
  };

  const updateTeamMember = (id: string, field: string, value: string) => {
    setTeam(prev => prev.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    router.push('/admin/login');
  };

  const daysOfWeek = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">A verificar autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // O router já redirecionou para /admin/login
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-4 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'products'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Package className="w-4 h-4 inline mr-2" />
                Produtos
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'settings'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Configurações
              </button>
              
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Gestão de Produtos</h2>
                  <button
                    onClick={() => setIsAddingProduct(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Adicionar Produto
                  </button>
                </div>

                {/* Add Product Form */}
                {isAddingProduct && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Adicionar Novo Produto</h3>
                      <button
                        onClick={() => setIsAddingProduct(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <input
                          type="text"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preço (€)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value as 'flores' | 'ceramica' }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="flores">Flores</option>
                          <option value="ceramica">Cerâmica</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                        <input
                          type="text"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                        <textarea
                          value={newProduct.description}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newProduct.available}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, available: e.target.checked }))}
                            className="mr-2"
                          />
                          Disponível
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newProduct.featured}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, featured: e.target.checked }))}
                            className="mr-2"
                          />
                          Destaque
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button
                        onClick={handleAddProduct}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Salvar Produto
                      </button>
                    </div>
                  </div>
                )}

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">Produto</th>
                        <th className="text-left py-3 px-4">Categoria</th>
                        <th className="text-left py-3 px-4">Preço</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.category === 'flores' 
                                ? 'bg-pink-100 text-pink-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {product.category === 'flores' ? 'Flores' : 'Cerâmica'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            € {product.price.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              <div className={`text-sm ${product.available ? 'text-green-600' : 'text-red-600'}`}>
                                {product.available ? 'Disponível' : 'Indisponível'}
                              </div>
                              {product.featured && (
                                <div className="text-xs text-primary-600">Destaque</div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Editar"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Excluir"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Edit Modal */}
                {editingProduct && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Editar Produto</h2>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                          <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct(prev => prev ? { ...prev, name: e.target.value } : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preço (€)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct(prev => prev ? { ...prev, price: parseFloat(e.target.value) } : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                          <select
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct(prev => prev ? { ...prev, category: e.target.value as 'flores' | 'ceramica' } : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="flores">Flores</option>
                            <option value="ceramica">Cerâmica</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                          <input
                            type="text"
                            value={editingProduct.image}
                            onChange={(e) => setEditingProduct(prev => prev ? { ...prev, image: e.target.value } : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                          <textarea
                            value={editingProduct.description}
                            onChange={(e) => setEditingProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editingProduct.available}
                              onChange={(e) => setEditingProduct(prev => prev ? { ...prev, available: e.target.checked } : null)}
                              className="mr-2"
                            />
                            Disponível
                          </label>
                          
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editingProduct.featured}
                              onChange={(e) => setEditingProduct(prev => prev ? { ...prev, featured: e.target.checked } : null)}
                              className="mr-2"
                            />
                            Destaque
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex space-x-4">
                        <button
                          onClick={() => editingProduct && handleSave(editingProduct)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4 inline mr-2" />
                          Salvar
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Configurações do Site</h2>
                  <button
                    onClick={handleSaveSettings}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Guardar Configurações
                  </button>
                </div>

                                 <div className="space-y-8">
                   {/* Informações de Contacto */}
                   <div className="bg-gray-50 rounded-lg p-6">
                     <h3 className="text-lg font-semibold mb-4">Informações de Contacto</h3>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
                         <input
                           type="text"
                           value={siteSettings.name}
                           onChange={(e) => setSiteSettings(prev => ({ ...prev, name: e.target.value }))}
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                         />
                       </div>
                       
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                         <input
                           type="email"
                           value={siteSettings.email}
                           onChange={(e) => setSiteSettings(prev => ({ ...prev, email: e.target.value }))}
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                         />
                       </div>
                       
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                         <input
                           type="tel"
                           value={siteSettings.phone}
                           onChange={(e) => setSiteSettings(prev => ({ ...prev, phone: e.target.value }))}
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                         />
                       </div>
                       
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                         <input
                           type="tel"
                           value={siteSettings.whatsapp}
                           onChange={(e) => setSiteSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                         />
                       </div>
                     </div>
                   </div>

                   {/* Múltiplos Endereços */}
                   <div className="bg-gray-50 rounded-lg p-6">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="text-lg font-semibold">Endereços e Horários</h3>
                       <button
                         onClick={addNewAddress}
                         className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition-colors text-sm"
                       >
                         <Plus className="w-4 h-4 inline mr-1" />
                         Adicionar Endereço
                       </button>
                     </div>
                     
                     <div className="space-y-6">
                       {contactSettings.addresses.map((address, index) => (
                         <div key={address.id} className="bg-white rounded-lg p-4 border">
                           <div className="flex justify-between items-start mb-4">
                             <h4 className="text-md font-medium">Endereço {index + 1}</h4>
                             {contactSettings.addresses.length > 1 && (
                               <button
                                 onClick={() => removeAddress(address.id)}
                                 className="text-red-600 hover:text-red-800 text-sm"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </button>
                             )}
                           </div>
                           
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                             {/* Dados do Endereço */}
                             <div>
                               <div className="mb-4">
                                 <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Endereço</label>
                                 <input
                                   type="text"
                                   value={address.name || ''}
                                   onChange={(e) => updateAddress(address.id, 'name', e.target.value)}
                                   placeholder="Ex: Loja Principal, Loja Centro, etc."
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                 />
                               </div>
                               <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                                 <textarea
                                   value={address.address}
                                   onChange={(e) => updateAddress(address.id, 'address', e.target.value)}
                                   rows={3}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                 />
                               </div>
                               
                               {/* Coordenadas */}
                               <div className="grid grid-cols-2 gap-4">
                                 <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                     Latitude (opcional)
                                   </label>
                                   <input
                                     type="number"
                                     step="0.0001"
                                     value={address.coordinates?.[0] || ''}
                                     onChange={(e) => {
                                       const lat = parseFloat(parseFloat(e.target.value).toFixed(4));
                                       const lng = address.coordinates?.[1] || 0;
                                       updateAddress(address.id, 'coordinates', [lat, lng] as [number, number]);
                                     }}
                                     placeholder="Ex: 38.7223"
                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                   />
                                 </div>
                                 <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                     Longitude (opcional)
                                   </label>
                                   <input
                                     type="number"
                                     step="0.0001"
                                     value={address.coordinates?.[1] || ''}
                                     onChange={(e) => {
                                       const lng = parseFloat(parseFloat(e.target.value).toFixed(4));
                                       const lat = address.coordinates?.[0] || 0;
                                       updateAddress(address.id, 'coordinates', [lat, lng] as [number, number]);
                                     }}
                                     placeholder="Ex: -9.1393"
                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                   />
                                 </div>
                               </div>
                               

                             </div>

                             {/* Horário de Funcionamento */}
                             <div>
                               <h5 className="text-sm font-medium text-gray-700 mb-3">Horário de Funcionamento</h5>
                               <div className="space-y-2">
                                 {daysOfWeek.map((day) => (
                                   <div key={day.key} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                     <div className="w-20">
                                       <span className="text-xs font-medium">{day.label}</span>
                                     </div>
                                     
                                     <label className="flex items-center">
                                       <input
                                         type="checkbox"
                                         checked={!address.openingHours[day.key as keyof typeof address.openingHours].closed}
                                         onChange={(e) => updateAddressHours(address.id, day.key, 'closed', !e.target.checked)}
                                         className="mr-1"
                                       />
                                       <span className="text-xs">Aberto</span>
                                     </label>
                                     
                                     {!address.openingHours[day.key as keyof typeof address.openingHours].closed && (
                                       <div className="flex items-center space-x-1">
                                         <input
                                           type="time"
                                           value={address.openingHours[day.key as keyof typeof address.openingHours].open}
                                           onChange={(e) => updateAddressHours(address.id, day.key, 'open', e.target.value)}
                                           className="px-1 py-1 border border-gray-300 rounded text-xs"
                                         />
                                         <span className="text-xs">-</span>
                                         <input
                                           type="time"
                                           value={address.openingHours[day.key as keyof typeof address.openingHours].close}
                                           onChange={(e) => updateAddressHours(address.id, day.key, 'close', e.target.value)}
                                           className="px-1 py-1 border border-gray-300 rounded text-xs"
                                         />
                                       </div>
                                     )}
                                   </div>
                                 ))}
                               </div>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Equipa */}
                   <div className="bg-gray-50 rounded-lg p-6">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="text-lg font-semibold">Equipa</h3>
                       <button
                         onClick={addTeamMember}
                         className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition-colors text-sm"
                       >
                         <Plus className="w-4 h-4 inline mr-1" />
                         Adicionar Membro
                       </button>
                     </div>
                     
                                           <div className="space-y-4">
                        {team.map((member, index) => (
                         <div key={member.id} className="bg-white rounded-lg p-4 border">
                           <div className="flex justify-between items-start mb-4">
                             <h4 className="text-md font-medium">Membro {index + 1}</h4>
                             {team.length > 1 && (
                               <button
                                 onClick={() => removeTeamMember(member.id)}
                                 className="text-red-600 hover:text-red-800 text-sm"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </button>
                             )}
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                               <input
                                 type="text"
                                 value={member.name}
                                 onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                                 placeholder="Nome do membro da equipa"
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                               />
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Foto (URL opcional)</label>
                               <input
                                 type="text"
                                 value={member.photo || ''}
                                 onChange={(e) => updateTeamMember(member.id, 'photo', e.target.value)}
                                 placeholder="URL da foto (opcional)"
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                               />
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
}
