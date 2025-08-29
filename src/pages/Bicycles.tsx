import  { useState } from 'react';
import { ShoppingCart, Filter, Star, Heart } from 'lucide-react';
import { useCart } from '../components/Header';



import CannondaleEbike from "../assets/bikesImages/cannondale/ebike/cannondale ebike Moterra Carbon 2 59990.jpg"

import CannondaleScapelCarbon from "../assets/bikesImages/cannondale/mtb/cannondale Scalpel Carbon 4 29990.jpg"
import CannondaleScapelHT from "../assets/bikesImages/cannondale/mtb/cannondale Scalpel Hardtail Carbon 2 33990.jpg"
import CannondaleTrail7 from "../assets/bikesImages/cannondale/mtb/cannondale Trail 7 3690.jpg"
import CannondaleTrailSL4 from "../assets/bikesImages/cannondale/mtb/cannondale Trail SL 4 7990,00.jpg"


import CannondaleOptimo from "../assets/bikesImages/cannondale/speed/cannondale  Optimo 3 8790.jpg"
import CannondaleCAADOptimo from "../assets/bikesImages/cannondale/speed/cannondale CAAD Optimo 7790.jpg"
import CannondaleSuperSixEvo from "../assets/bikesImages/cannondale/speed/cannondale SuperSix EVO 29990.png"
import CannondaleSuperSixEvo2 from "../assets/bikesImages/cannondale/speed/cannondale SuperSix EVO 35990.jpg"


import ScootESilence from "../assets/bikesImages/scoot/e-bike/Scoot E-Silence.jpg"

import ScootContessa from "../assets/bikesImages/scoot/mtb/Contessa .jpg"
import ScootScale965 from "../assets/bikesImages/scoot/mtb/Scale 965.jpg"
import ScootScale970Red from "../assets/bikesImages/scoot/mtb/Scale 970 red.jpg"
import ScootScale970 from "../assets/bikesImages/scoot/mtb/Scale 970.jpg"

import ScootAddict30red from "../assets/bikesImages/scoot/speed/addict 30 RED.jpg"
import ScootAddictRCPRO from "../assets/bikesImages/scoot/speed/addict RC PRO.jpg"
import ScootSpeedster10 from "../assets/bikesImages/scoot/speed/SPEEDSTER 10.jpg"
import ScootSpeedster20 from "../assets/bikesImages/scoot/speed/SPEEDSTER 20.jpg"


import SpecializedLevo from "../assets/bikesImages/specialized/ebike/e-bike spz Levo SL Comp.jpg"

import SpecializedChiselComp from "../assets/bikesImages/specialized/mtb/specialized chisel comp 25990.jpg"
import SpecializedChiselHT from "../assets/bikesImages/specialized/mtb/specialized Chisel Hardtail 9490.jpg"
import SpecializedEpic from "../assets/bikesImages/specialized/mtb/specialized epi 18900.jpg"
import SpecializedRockhopper from "../assets/bikesImages/specialized/mtb/specialized rockhopper 29 6190.jpg"

import SpecializedAllezSport from "../assets/bikesImages/specialized/speed/spz Allez Sport 12900.jpg"
import SpecializedRoubaixSL8 from "../assets/bikesImages/specialized/speed/spz Roubaix SL8 18990.jpg"
import SpecializedTarmacSL7 from "../assets/bikesImages/specialized/speed/spz tarmac SL7 Sport 24990.jpg"
import SpecializedTarmacSL8 from "../assets/bikesImages/specialized/speed/spz tarmac SL8 Expert 58990.jpg"


import TrekRail from "../assets/bikesImages/trek/ebike/Trek Rail 9.8 4 ger 73990.jpg"

import TrekMarlin6 from "../assets/bikesImages/trek/mtb/Marlin 6 3ger 7850.jpg"
import TrekProCaliber from "../assets/bikesImages/trek/mtb/Procaliber 9.5 22500.jpg"
import TrekSuperCaliber from "../assets/bikesImages/trek/mtb/SupercaliberSL9.6 37800.jpg"
import TrekXCaliber from "../assets/bikesImages/trek/mtb/XCaliber 9 11999.jpg"

import TrekEmondaALR5 from "../assets/bikesImages/trek/speed/EmondaALR 5 23500.jpg"
import TrekEmondaSLR7 from "../assets/bikesImages/trek/speed/EmondaSLR 7 52000.jpg"
import TrekMadone from "../assets/bikesImages/trek/speed/MadoneSL 5 8ger 28500.jpg"
import TrekConcept from "../assets/bikesImages/trek/speed/SpeedConceptSLR 7 95000.jpg"


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

const Bicycles = () => {

 const { addToCart } = useCart();

  const [selectedFilters, setSelectedFilters] = useState<Filtros>({
    marca: [],
    tamanho: [],
    tipo: [],
    preco: [0, 100000]
  });

  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const produtos: Produto[] = [
    {
      id: 1,
      nome: "Trek Madone SL 5",
      preco: 28500.00,
      parcelas: "36x R$ 791,66",
      imagem: TrekMadone,
      marca: "Trek",
      tamanho: "M",
      tipo: "Speed",
      avaliacao: 4.8
    },
    {
      id: 2,
      nome: "Specialized Epic",
      preco: 18900.00,
      parcelas: "36x R$ 525,00",
      imagem: SpecializedEpic,
      marca: "Specialized",
      tamanho: "M",
      tipo: "MTB",
      avaliacao: 4.9
    },
    {
      id: 3,
      nome: "Scoot Speedster 20",
      preco: 18500.00,
      parcelas: "36x R$ 513,88",
      imagem: ScootSpeedster20,
      marca: "Scoot",
      tamanho: "L",
      tipo: "Speed",
      avaliacao: 4.9
    },
    {
      id: 4,
      nome: "cannondale Scalpel Carbon 4",
      preco: 29990.00,
      parcelas: "36x R$ 830,55",
      imagem: CannondaleScapelCarbon,
      marca: "Cannondale",
      tamanho: "M",
      tipo: "MTB",
      avaliacao: 4.9
    },
    {
      id: 5,
      nome: "cannondale E-bike Moterra Carbon 2",
      preco: 59990.00,
      parcelas: "36x R$ 1663,88",
      imagem: CannondaleEbike,
      marca: "Cannondale",
      tamanho: "M",
      tipo: "Elétrica",
      avaliacao: 4.9
    },
    {
      id: 6,
      nome: "TrekXCaliber",
      preco: 11900.00,
      parcelas: "36x R$ 330,55",
      imagem: TrekXCaliber,
      marca: "Trek",
      tamanho: "M",
      tipo: "MTB",
      avaliacao: 4.8
    },
    {
      id: 7,
      nome: "Scoot Contessa",
      preco: 6700.00,
      parcelas: "24x R$ 279,16",
      imagem: ScootContessa,
      marca: "Scoot",
      tamanho: "L",
      tipo: "MTB",
      avaliacao: 4.9
    },
    {
      id: 8,
      nome: "Cannondale SuperSix Evo",
      preco: 29900.00,
      parcelas: "36x R$ 830,55",
      imagem: CannondaleSuperSixEvo,
      marca: "Cannondale",
      tamanho: "L",
      tipo: "Speed",
      avaliacao: 4.9
    },
    {
      id: 9,
      nome: "Cannondale SuperSix Evo 2",
      preco: 35900.00,
      parcelas: "36x R$ 997,22 ",
      imagem: CannondaleSuperSixEvo2,
      marca: "Cannondale",
      tamanho: "M",
      tipo: "Speed",
      avaliacao: 4.9
    },
    {
      id: 10,
      nome: "Scoot Scale 970 Red",
      preco: 17000.00,
      parcelas: "36x R$ 472,22",
      imagem: ScootScale970Red,
      marca: "Scoot",
      tamanho: "L",
      tipo: "MTB",
      avaliacao: 4.9
    },
    {
      id: 11,
      nome: "Scoot Scale 970",
      preco: 17000.00,
      parcelas: "36x R$ 472,22",
      imagem: ScootScale970,
      marca: "Scoot",
      tamanho: "M",
      tipo: "MTB",
      avaliacao: 4.9
    },
    {
      id: 12,
      nome: "Scoot Addict 30 Red",
      preco: 18500.00,
      parcelas: "36x R$ 513,88",
      imagem: ScootAddict30red,
      marca: "Scoot",
      tamanho: "M",
      tipo: "Speed",
      avaliacao: 4.9
    },
    {
      id: 13,
      nome: "Cannondale Scapel HardTail Carbon 2",
      preco: 34000.00,
      parcelas: "36x R$ 944,44 ",
      imagem: CannondaleScapelHT,
      marca: "Cannondale",
      tamanho: "M",
      tipo: "MTB",
      avaliacao: 4.9
    },
     {
      id: 14,
      nome: "Cannondale Trail 7",
      preco: 3690.00,
      parcelas: "16x R$ 230,65",
      imagem: CannondaleTrail7,
      marca: "Cannondale",
      tamanho: "S",
      tipo: "MTB",
      avaliacao: 4.9
    },
    {
      id: 15,
      nome: "Cannondale Trail SL4",
      preco: 7800.00,
      parcelas: "24x R$ 325,00",
      imagem: CannondaleTrailSL4,
      marca: "Cannondale",
      tamanho: "S",
      tipo: "MTB",
      avaliacao: 4.9
    },
   {
      id: 16,
      nome: "Cannondale CAAD Optimo",
      preco: 7800.00,
      parcelas: "36x R$ 325,00",
      imagem: CannondaleCAADOptimo,
      marca: "Cannondale",
      tamanho: "M",
      tipo: "Speed",
      avaliacao: 4.9
    },
    {
      id: 17,
      nome: "Cannondale Optimo 3",
      preco: 8800.00,
      parcelas: "36x R$ 244,44 ",
      imagem: CannondaleOptimo,
      marca: "Cannondale",
      tamanho: "S",
      tipo: "Speed",
      avaliacao: 4.9
    },
     {
      id: 18,
      nome: "Scoot E-Silence",
      preco: 42000.00,
      parcelas: "36x R$ 1166,66 ",
      imagem: ScootESilence,
      marca: "Scoot",
      tamanho: "M",
      tipo: "Elétrica",
      avaliacao: 4.9
    },
    {
      id: 19,
      nome: "Specialized Levo Turbo",
      preco: 58000.00,
      parcelas: "36x R$ 1611,10",
      imagem: SpecializedLevo,
      marca: "Specialized",
      tamanho: "S",
      tipo: "Elétrica",
      avaliacao: 4.9
    },
    {
      id: 20,
      nome: "TrekRail E-bike 9.8",
      preco: 55000.00,
      parcelas: "36x R$ 1861,10",
      imagem: TrekRail,
      marca: "Trek",
      tamanho: "M",
      tipo: "Elétrica",
      avaliacao: 4.9
    },
    {
      id: 21,
      nome: "Scoot Scale 965",
      preco: 18000.00,
      parcelas: "36x R$ 500,00 ",
      imagem: ScootScale965,
      marca: "Scoot",
      tamanho: "M",
      tipo: "MTB",
      avaliacao: 4.9
    },
    {
      id: 22,
      nome: "Scoot Addict RC PRO",
      preco: 25500.00,
      parcelas: "36x R$ 708,33 ",
      imagem: ScootAddictRCPRO,
      marca: "Scoot",
      tamanho: "S",
      tipo: "Speed",
      avaliacao: 4.9
    },
    {
      id: 23,
      nome: "Scoot Speedster 10",
      preco: 14000.00,
      parcelas: "36x R$ 388,88",
      imagem: ScootSpeedster10,
      marca: "Scoot",
      tamanho: "S",
      tipo: "Speed",
      avaliacao: 4.9
    },
     {
      id: 24,
      nome: "Specialized Allez Sport",
      preco: 13000.00,
      parcelas: "36x R$ 361,11",
      imagem: SpecializedAllezSport,
      marca: "Specialized",
      tamanho: "L",
      tipo: "Speed",
      avaliacao: 4.9
    },
     {
      id: 25,
      nome: "Specialized Roubaix SL8",
      preco: 19000.00,
      parcelas: "36x R$ 527,77",
      imagem: SpecializedRoubaixSL8,
      marca: "Specialized",
      tamanho: "M",
      tipo: "Speed",
      avaliacao: 4.9
    },
     {
      id: 26,
      nome: "Specialized Tarmac SL7 Sport",
      preco: 25000.00,
      parcelas: "36x R$ 694,44",
      imagem: SpecializedTarmacSL7,
      marca: "Specialized",
      tamanho: "S",
      tipo: "Speed",
      avaliacao: 4.9
    },
     {
       id: 27,
      nome: "Specialized Tarmac SL8 Expert",
      preco: 58000.00,
      parcelas: "36x R$ 1611,00",
      imagem: SpecializedTarmacSL8,
      marca: "Specialized",
      tamanho: "M",
      tipo: "Speed",
      avaliacao: 4.9
    },
    {
       id: 28,
      nome: "Specialized Rockhopper 29",
      preco: 6500.00,
      parcelas: "24x R$ 270,83 ",
      imagem: SpecializedRockhopper,
      marca: "Specialized",
      tamanho: "M",
      tipo: "MTB",
      avaliacao: 4.9
    },
    {
      id: 29,
      nome: "Specialized Chisel HT ",
      preco: 10000.00,
      parcelas: "36x R$ 277,77 ",
      imagem: SpecializedChiselHT,
      marca: "Specialized",
      tamanho: "S",
      tipo: "MTB",
      avaliacao: 4.9
    },
    {
       id: 30,
      nome: "Specialized Chisel Comp ",
      preco: 25000.00,
      parcelas: "36x R$ 694,44 ",
      imagem: SpecializedChiselComp,
      marca: "Specialized",
      tamanho: "L",
      tipo: "MTB",
      avaliacao: 4.9
    },
     {
      id: 31,
      nome: "Trek TrekConcept",
      preco: 95000.00,
      parcelas: "36x R$ 2638,88 ",
      imagem: TrekConcept,
      marca: "Trek",
      tamanho: "M",
      tipo: "Speed",
      avaliacao: 4.8
    },
     {
      id: 32,
      nome: "Trek Emonda AL R5",
      preco: 23500.00,
      parcelas: "36x R$ 652,77",
      imagem: TrekEmondaALR5,
      marca: "Trek",
      tamanho: "S",
      tipo: "Speed",
      avaliacao: 4.8
    },
     {
      id: 33,
      nome: "Trek Emonda SL R7",
      preco: 52000.00,
      parcelas: "36x R$ 1444,00",
      imagem: TrekEmondaSLR7,
      marca: "Trek",
      tamanho: "M",
      tipo: "Speed",
      avaliacao: 4.8
    },
    {
      id: 34,
      nome: "Trek Marlin 6",
      preco: 7600.00,
      parcelas: "24x R$ 316,00",
      imagem: TrekMarlin6,
      marca: "Trek",
      tamanho: "M",
      tipo: "MTB",
      avaliacao: 4.8
    },
    {
      id: 35,
      nome: "Trek ProCaliber",
      preco: 22500.00,
      parcelas: "36x R$ 625,00 ",
      imagem: TrekProCaliber,
      marca: "Trek",
      tamanho: "S",
      tipo: "MTB",
      avaliacao: 4.8
    },
    {
      id: 36,
      nome: "Trek SuperCaliber",
      preco: 38000.00,
      parcelas: "36x R$ 1055,55",
      imagem: TrekSuperCaliber,
      marca: "Trek",
      tamanho: "L",
      tipo: "MTB",
      avaliacao: 4.8
    },
  ];

  const filtros = {
    marca: [ "Cannondale","Scoot", "Specialized", "Trek",],
    tamanho: ["S", "M", "L",],
    tipo: ["MTB", "Speed", "Elétrica"]
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

  const handleAddToCart = (produto: Produto) => {
    addToCart(produto);
    // Opcional: Mostrar notificação de sucesso
    alert(`${produto.nome} foi adicionado ao carrinho!`);
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
    if (produto.preco > selectedFilters.preco[1]) {
      return false;
    }
    
    return true;
  });

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
                  onChange={(e) => setSelectedFilters(prev => ({
                    ...prev,
                    preco: [0, parseInt(e.target.value)] as [number, number]
                  }))}
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 font-medium">
                  <span>R$ 0</span>
                  <span>{formatPrice(selectedFilters.preco[1])}</span>
                </div>
              </div>
            </div>

            {/* Botão Limpar Filtros (atualizado) */}
            <div className="pt-4 sm:pt-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedFilters({
                  marca: [],
                  tamanho: [],
                  tipo: [],
                  preco: [0, 100000]
                })}
                className="w-full bg-blue-500 text-white py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-base font-bold cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </aside>

          {/* Main Content - Produtos */}
          <main className="flex-1 mt-4 sm:mt-6 lg:mt-10 mb-6 sm:mb-10">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">Bicicletas</h2>
              <p className="text-black text-base sm:text-lg">
                Do passeio de domingo à trilha pesada — temos a bicicleta certa para cada desafio.

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
                  <div className="text-4xl sm:text-6xl mb-4">😥</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Nenhum produto encontrado</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Tente ajustar os filtros para encontrar mais produtos</p>
                  <button 
                    onClick={() => setSelectedFilters({
                      marca: [],
                      tamanho: [],
                      tipo: [],
                      preco: [0, 100000]
                    })}
                    className="bg-blue-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Limpar Filtros
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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

                         <button onClick={() =>handleAddToCart(produto)}
                         
                          
                         className="w-full bg-blue-500 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors cursor-pointer">
                          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                          Adicionar no Carrinho
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

export default Bicycles;