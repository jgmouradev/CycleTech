import React, { useState, useEffect, createContext, useContext } from 'react';
import { ShoppingCart, Filter, Star, Heart, X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useCart } from '../components/Header';

// Importe suas imagens aqui
// import Trail from "../assets/images/destaques/cannondale Trail SL 4 7990,00.jpg"
// ... outras importações de imagens

// ========== SISTEMA DE TOAST ==========

// Context do Toast
const ToastContext = createContext<any>(null);

// Tipos de Toast
const TOAST_TYPES = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-800',
    iconClassName: 'text-green-500'
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-50 border-red-200 text-red-800',
    iconClassName: 'text-red-500'
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    iconClassName: 'text-yellow-500'
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800',
    iconClassName: 'text-blue-500'
  }
};

// Componente Toast Individual
const Toast = ({ toast, onRemove }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  
  const toastConfig = TOAST_TYPES[toast.type as keyof typeof TOAST_TYPES] || TOAST_TYPES.info;
  const Icon = toastConfig.icon;

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
    
    if (toast.duration) {
      const timer = setTimeout(() => {
        handleRemove();
      }, toast.duration);
      
      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-md w-full
        transform transition-all duration-300 ease-out
        ${toastConfig.className}
        ${isVisible && !isRemoving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${toastConfig.iconClassName}`} />
      
      <div className="flex-1 min-w-0">
        {toast.title && (
          <div className="font-semibold text-sm mb-1">{toast.title}</div>
        )}
        <div className="text-sm">{toast.message}</div>
      </div>

      <button
        onClick={handleRemove}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Container dos Toasts
const ToastContainer = ({ toasts, onRemove }: any) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast: any) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

// Provider do Toast
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<any[]>([]);

  const addToast = (toast: any) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      ...toast
    };
    
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, clearAllToasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Hook para usar o Toast
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }

  const { addToast, removeToast, clearAllToasts } = context;

  const toast = {
    success: (message: string, options = {}) => addToast({ ...options, message, type: 'success' }),
    error: (message: string, options = {}) => addToast({ ...options, message, type: 'error' }),
    warning: (message: string, options = {}) => addToast({ ...options, message, type: 'warning' }),
    info: (message: string, options = {}) => addToast({ ...options, message, type: 'info' }),
    custom: (options: any) => addToast(options),
    dismiss: removeToast,
    clear: clearAllToasts
  };

  return toast;
};

// ========== INTERFACES ==========

interface Produto {
  id: number;
  nome: string;
  preco: number;
  parcelas: string;
  imagem: string;
  marca: string;
  tamanho: string;
  tipo: string;
  avaliacao: number;
}

interface Filtros {
  marca: string[];
  tamanho: string[];
  tipo: string[];
  preco: [number, number];
}

// ========== COMPONENTE PRINCIPAL ==========

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const toast = useToast(); // Hook do toast

  const [selectedFilters, setSelectedFilters] = useState<Filtros>({
    marca: [],
    tamanho: [],
    tipo: [],
    preco: [0, 5000]
  });

  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Seus produtos (substitua pelas importações reais das imagens)
  const produtos: Produto[] = [
    {
      id: 1,
      nome: "Cannondale Trail",
      preco: 7500.00,
      parcelas: "12x R$ 625,00",
      imagem: "/api/placeholder/300/250", // Substitua por Trail
      marca: "Cannondale",
      tamanho: "M",
      tipo: "Mountain",
      avaliacao: 4.8
    },
    {
      id: 2,
      nome: "Capacete Giro",
      preco: 320.00,
      parcelas: "10x R$ 32,00",
      imagem: "/api/placeholder/300/250", // Substitua por CapaceteGiro
      marca: "Giro",
      tamanho: "L",
      tipo: "Speed",
      avaliacao: 4.9
    },
    {
      id: 3,
      nome: "Farol Inton 1800 Lumens",
      preco: 385.00,
      parcelas: "10x R$ 38,50",
      imagem: "/api/placeholder/300/250", // Substitua por Farol
      marca: "Inton",
      tamanho: "S",
      tipo: "Urban",
      avaliacao: 4.6
    },
    {
      id: 4,
      nome: "Óculos Rockbros",
      preco: 199.00,
      parcelas: "05x R$ 39,80",
      imagem: "/api/placeholder/300/250", // Substitua por Oculos
      marca: "Rockbros",
      tamanho: "M",
      tipo: "Mountain",
      avaliacao: 4.7
    },
    {
      id: 5,
      nome: "Speed Bike Scott Speedster 10",
      preco: 8970.00,
      parcelas: "12x R$ 747,50",
      imagem: "/api/placeholder/300/250", // Substitua por Speed
      marca: "Scott",
      tamanho: "L",
      tipo: "Speed",
      avaliacao: 4.9
    },
    {
      id: 6,
      nome: "Sinalizador Rontek",
      preco: 60.00,
      parcelas: "02x R$ 30,00",
      imagem: "/api/placeholder/300/250", // Substitua por Sinalizador
      marca: "Rontek",
      tamanho: "M",
      tipo: "Urban",
      avaliacao: 4.5
    }
  ];

  const filtros = {
    marca: ["Cannondale", "Giro", "Scott", "Inton", "Rockbros", "Rontek"],
    tamanho: ["S", "M", "L", "XL"],
    tipo: ["Mountain", "Speed", "Urban", "BMX"]
  };

  const handleFilterChange = (category: 'marca' | 'tamanho' | 'tipo', value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: (prev[category] as string[]).includes(value)
        ? (prev[category] as string[]).filter(item => item !== value)
        : [...(prev[category] as string[]), value]
    }));

    // Toast informativo quando filtro é aplicado
    toast.info(`Filtro "${value}" aplicado`, {
      duration: 2000
    });
  };

  const toggleFavorite = (id: number) => {
    const produto = produtos.find(p => p.id === id);
    
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      const isAdding = !newFavorites.has(id);
      
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        toast.info(`${produto?.nome} removido dos favoritos`, {
          duration: 2500
        });
      } else {
        newFavorites.add(id);
        toast.success(`${produto?.nome} adicionado aos favoritos!`, {
          title: '❤️ Favorito',
          duration: 3000
        });
      }
      return newFavorites;
    });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleAddToCart = (produto: Produto) => {
    try {
      addToCart(produto);
      
      // Toast de sucesso personalizado
      toast.success(`${produto.nome} foi adicionado ao carrinho!`, {
        title: '🛒 Produto Adicionado',
        duration: 4000
      });
    } catch (error) {
      // Toast de erro se algo der errado
      toast.error('Erro ao adicionar produto ao carrinho', {
        title: 'Ops!',
        duration: 5000
      });
    }
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      marca: [],
      tamanho: [],
      tipo: [],
      preco: [0, 100000]
    });
    
    toast.info('Todos os filtros foram removidos', {
      duration: 3000
    });
  };

  // Função para filtrar produtos
  const filteredProdutos = produtos.filter(produto => {
    if (selectedFilters.marca.length > 0 && !selectedFilters.marca.includes(produto.marca)) {
      return false;
    }
    
    if (selectedFilters.tamanho.length > 0 && !selectedFilters.tamanho.includes(produto.tamanho)) {
      return false;
    }
    
    if (selectedFilters.tipo.length > 0 && !selectedFilters.tipo.includes(produto.tipo)) {
      return false;
    }
    
    if (produto.preco > selectedFilters.preco[1]) {
      return false;
    }
    
    return true;
  });

  // Toast de boas-vindas (opcional)
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info('Explore nossos produtos em destaque!', {
        title: '🚴‍♀️ Bem-vindo',
        duration: 6000
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Sidebar - Filtros */}
            <aside className="w-full lg:w-80 bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-fit lg:sticky lg:top-28 shadow-xl sm:shadow-2xl border border-white/20">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Filtros</h2>
              </div>

              {/* Filtro por Marca */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3 pb-2 border-b border-gray-200">
                  Marca
                </h3>
                <div className="space-y-1 sm:space-y-2">
                  {filtros.marca.map(marca => (
                    <label key={marca} className="flex items-center gap-2 sm:gap-3 cursor-pointer p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 transition-colors">
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded"
                        checked={selectedFilters.marca.includes(marca)}
                        onChange={() => handleFilterChange('marca', marca)}
                      />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">{marca}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro por Tamanho */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3 pb-2 border-b border-gray-200">
                  Tamanho
                </h3>
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                  {filtros.tamanho.map(tamanho => (
                    <button
                      key={tamanho}
                      className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border-2 text-sm sm:text-base font-semibold transition-all ${
                        selectedFilters.tamanho.includes(tamanho)
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                      onClick={() => handleFilterChange('tamanho', tamanho)}
                    >
                      {tamanho}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtro por Tipo */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3 pb-2 border-b border-gray-200">
                  Tipo
                </h3>
                <div className="space-y-1 sm:space-y-2">
                  {filtros.tipo.map(tipo => (
                    <label key={tipo} className="flex items-center gap-2 sm:gap-3 cursor-pointer p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 transition-colors">
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded"
                        checked={selectedFilters.tipo.includes(tipo)}
                        onChange={() => handleFilterChange('tipo', tipo)}
                      />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">{tipo}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Faixa de Preço */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3 pb-2 border-b border-gray-200">
                  Faixa de Preço
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={selectedFilters.preco[1]}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setSelectedFilters(prev => ({
                        ...prev,
                        preco: [0, newValue] as [number, number]
                      }));
                      
                      // Toast para mudança de preço
                      toast.info(`Preço máximo: ${formatPrice(newValue)}`, {
                        duration: 1500
                      });
                    }}
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600 font-medium">
                    <span>R$ 0</span>
                    <span>{formatPrice(selectedFilters.preco[1])}</span>
                  </div>
                </div>
              </div>

              {/* Botão Limpar Filtros */}
              <div className="pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  onClick={clearAllFilters}
                  className="w-full bg-blue-500 text-white py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-base font-bold cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </aside>

            {/* Main Content - Produtos */}
            <main className="flex-1 mt-4 sm:mt-6 lg:mt-10 mb-6 sm:mb-10">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">Produtos em Destaques</h2>
                <p className="text-black text-base sm:text-lg">
                  Selecionamos as bikes, acessórios e equipamentos que unem tecnologia, conforto e desempenho. Prontos para encarar qualquer trilha ou estrada, esses destaques são a escolha dos apaixonados pelo pedal.

                  {filteredProdutos.length !== produtos.length && (
                    <span className="block sm:inline ml-0 sm:ml-2 mt-1 sm:mt-0 bg-white/20 px-3 py-1 rounded-full text-sm">
                      {filteredProdutos.length} de {produtos.length} produtos
                    </span>
                  )}
                </p>
              </div>

              {filteredProdutos.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl sm:shadow-2xl border border-white/20">
                    <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Nenhum produto encontrado</h3>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Tente ajustar os filtros para encontrar mais produtos</p>
                    <button 
                      onClick={clearAllFilters}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {filteredProdutos.map(produto => {
                    return (
                      <div
                        key={produto.id}
                        className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <button
                            onClick={() => toggleFavorite(produto.id)}
                            className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                favorites.has(produto.id)
                                  ? 'fill-red-500 text-red-500'
                                  : 'text-gray-600'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="p-4 sm:p-6">
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                                  i < Math.floor(produto.avaliacao)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-xs sm:text-sm text-gray-600 font-medium">
                              ({produto.avaliacao})
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-gray-600 mb-3 text-center leading-tight">
                            {produto.nome}
                          </h3>

                          <div className="mb-4">
                            <span className="text-xl sm:text-2xl font-bold text-gray-800 block text-center sm:text-left">
                              {formatPrice(produto.preco)}
                            </span>
                            <p className="text-gray-600 text-xs sm:text-sm mt-1 text-center sm:text-left">{produto.parcelas} sem juros</p>
                          </div>

                          <div className="flex gap-1 sm:gap-2 mb-4 flex-wrap justify-center sm:justify-start">
                            <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-semibold">
                              {produto.marca}
                            </span>
                            <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-semibold">
                              Tam. {produto.tamanho}
                            </span>
                            <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-semibold">
                              {produto.tipo}
                            </span>
                          </div>

                          <button 
                            onClick={() => handleAddToCart(produto)}
                            className="w-full bg-blue-500 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                            Comprar
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente envolvido com o ToastProvider
const FeaturedProductsWithToast = () => {
  return (
    <ToastProvider>
      <FeaturedProducts />
    </ToastProvider>
  );
};

export default FeaturedProductsWithToast;