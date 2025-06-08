import  { useState } from 'react';
import { ShoppingCart, Filter, Star, Heart } from 'lucide-react';

import Xcaliber from "../assets/bikesImages/trek/off/xcaliber.jpg"
import Scoot from "../assets/bikesImages/scoot/off/scoot.jpg"
import Allez from "../assets/bikesImages/specialized/off/allez.jpg"
import Quick from "../assets/bikesImages/cannondale/off/quick.jpeg"
import Electra from "../assets/bikesImages/electra/electra.jpg"
import Talon from "../assets/bikesImages/giant/off/talon.jpg"


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
  desconto: number;
}

interface Filtros {
  marca: string[];
  tamanho: string[];
  tipo: string[];
  preco: [number, number];
}

const BikeEcommerce = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filtros>({
    marca: [],
    tamanho: [],
    tipo: [],
    preco: [0, 5000]
  });

  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const produtos: Produto[] = [
    {
      id: 1,
      nome: "Mountain Bike Trek X-Caliber",
      preco: 2899.99,
      parcelas: "12x R$ 241,66",
      imagem: Xcaliber,
      marca: "Trek",
      tamanho: "M",
      tipo: "Mountain",
      avaliacao: 4.8,
      desconto: 15
    },
    {
      id: 2,
      nome: "Speed Bike Specialized Allez",
      preco: 3499.99,
      parcelas: "12x R$ 291,66",
      imagem: Allez,
      marca: "Specialized",
      tamanho: "L",
      tipo: "Speed",
      avaliacao: 4.9,
      desconto: 0
    },
    {
      id: 3,
      nome: "Urban Bike Cannondale Quick",
      preco: 1899.99,
      parcelas: "10x R$ 189,99",
      imagem: Quick,
      marca: "Cannondale",
      tamanho: "S",
      tipo: "Urban",
      avaliacao: 4.6,
      desconto: 20
    },
    {
      id: 4,
      nome: "MTB Giant Talon 29",
      preco: 2299.99,
      parcelas: "12x R$ 191,66",
      imagem: Talon,
      marca: "Giant",
      tamanho: "M",
      tipo: "Mountain",
      avaliacao: 4.7,
      desconto: 10
    },
    {
      id: 5,
      nome: "Speed Bike Scott Speedster",
      preco: 4199.99,
      parcelas: "12x R$ 349,99",
      imagem: Scoot,
      marca: "Scott",
      tamanho: "L",
      tipo: "Speed",
      avaliacao: 4.9,
      desconto: 0
    },
    {
      id: 6,
      nome: "City Bike Electra Townie",
      preco: 1599.99,
      parcelas: "10x R$ 159,99",
      imagem: Electra,
      marca: "Electra",
      tamanho: "M",
      tipo: "Urban",
      avaliacao: 4.5,
      desconto: 25
    }
  ];

  const filtros = {
    marca: ["Trek", "Specialized", "Cannondale", "Giant", "Scott", "Electra"],
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
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
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

  const calculateDiscountPrice = (price: number, discount: number): number => {
    return price * (1 - discount / 100);
  };

  // Função para filtrar produtos
  const filteredProdutos = produtos.filter(produto => {
    // Filtro por marca
    if (selectedFilters.marca.length > 0 && !selectedFilters.marca.includes(produto.marca)) {
      return false;
    }
    
    // Filtro por tamanho
    if (selectedFilters.tamanho.length > 0 && !selectedFilters.tamanho.includes(produto.tamanho)) {
      return false;
    }
    
    // Filtro por tipo
    if (selectedFilters.tipo.length > 0 && !selectedFilters.tipo.includes(produto.tipo)) {
      return false;
    }
    
    // Filtro por preço
    const precoFinal = produto.desconto > 0 
      ? calculateDiscountPrice(produto.preco, produto.desconto)
      : produto.preco;
    
    if (precoFinal > selectedFilters.preco[1]) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      
      

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Filtros */}
          <aside className="w-80 bg-white/95 backdrop-blur-lg rounded-3xl p-6 h-fit sticky top-28 shadow-2xl border border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
            </div>

            {/* Filtro por Marca */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                Marca
              </h3>
              <div className="space-y-2">
                {filtros.marca.map(marca => (
                  <label key={marca} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      checked={selectedFilters.marca.includes(marca)}
                      onChange={() => handleFilterChange('marca', marca)}
                    />
                    <span className="text-gray-700 font-medium">{marca}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro por Tamanho */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                Tamanho
              </h3>
              <div className="flex gap-2 flex-wrap">
                {filtros.tamanho.map(tamanho => (
                  <button
                    key={tamanho}
                    className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
                      selectedFilters.tamanho.includes(tamanho)
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => handleFilterChange('tamanho', tamanho)}
                  >
                    {tamanho}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por Tipo */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                Tipo
              </h3>
              <div className="space-y-2">
                {filtros.tipo.map(tipo => (
                  <label key={tipo} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      checked={selectedFilters.tipo.includes(tipo)}
                      onChange={() => handleFilterChange('tipo', tipo)}
                    />
                    <span className="text-gray-700 font-medium">{tipo}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Faixa de Preço */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                Faixa de Preço
              </h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={selectedFilters.preco[1]}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  onChange={(e) => setSelectedFilters(prev => ({
                    ...prev,
                    preco: [0, parseInt(e.target.value)] as [number, number]
                  }))}
                />
                <div className="flex justify-between text-sm text-gray-600 font-medium">
                  <span>R$ 0</span>
                  <span>{formatPrice(selectedFilters.preco[1])}</span>
                </div>
              </div>
            </div>

            {/* Botão Limpar Filtros */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedFilters({
                  marca: [],
                  tamanho: [],
                  tipo: [],
                  preco: [0, 5000]
                })}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-light cursor-pointer"
              >
                Limpar Filtros
              </button>
            </div>
          </aside>

          {/* Main Content - Produtos */}
          <main className="flex-1 mt-10 mb-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-black mb-2">Bikes Seminovas - Até 40% OFF</h2>
              <p className="text-black text-lg">
                Descubra as melhores ofertas em bicicletas e acessórios com preços especiais. 
                {filteredProdutos.length !== produtos.length && (
                  <span className="ml-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                    {filteredProdutos.length} de {produtos.length} produtos
                  </span>
                )}
              </p>
            </div>

            {filteredProdutos.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Nenhum produto encontrado</h3>
                  <p className="text-gray-600 mb-6">Tente ajustar os filtros para encontrar mais produtos</p>
                  <button 
                    onClick={() => setSelectedFilters({
                      marca: [],
                      tamanho: [],
                      tipo: [],
                      preco: [0, 5000]
                    })}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                  >
                    Limpar Filtros
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProdutos.map(produto => {
                  const precoComDesconto = produto.desconto > 0 
                    ? calculateDiscountPrice(produto.preco, produto.desconto)
                    : produto.preco;

                  return (
                    <div
                      key={produto.id}
                      className="bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={produto.imagem}
                          alt={produto.nome}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {produto.desconto > 0 && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            -{produto.desconto}%
                          </div>
                        )}
                        <button
                          onClick={() => toggleFavorite(produto.id)}
                          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favorites.has(produto.id)
                                ? 'fill-red-500 text-red-500'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(produto.avaliacao)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600 font-medium">
                            ({produto.avaliacao})
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-600 mb-3 text-center">
                          {produto.nome}
                        </h3>

                        <div className="mb-4">
                          {produto.desconto > 0 ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-gray-800">
                                  {formatPrice(precoComDesconto)}
                                </span>
                                <span className="text-lg text-gray-500 line-through">
                                  {formatPrice(produto.preco)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-2xl font-bold text-gray-800">
                              {formatPrice(produto.preco)}
                            </span>
                          )}
                          <p className="text-gray-600 text-sm mt-1">{produto.parcelas} sem juros</p>
                        </div>

                        <div className="flex gap-2 mb-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-semibold">
                            {produto.marca}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-semibold">
                            Tam. {produto.tamanho}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-semibold">
                            {produto.tipo}
                          </span>
                        </div>

                        <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2">
                          <ShoppingCart className="w-5 h-5" />
                          Comprar Agora
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
  );
};

export default BikeEcommerce;