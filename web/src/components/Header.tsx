import React, { useState, createContext, useContext } from 'react';
import { Menu, X, Search, ShoppingCart, User, Minus, Plus, Trash2 } from 'lucide-react';
import logotipo from "../assets/images/logo.png"
import { Link } from 'react-router-dom';


// Importações das imagens dos produtos
import Trail from "../assets/images/destaques/cannondale Trail SL 4 7990,00.jpg"
import CapaceteGiro from "../assets/images/destaques/capacete giro.jpg"
import Farol from "../assets/images/destaques/Farol Inton 1800 Lumens.jpg"
import Oculos from "../assets/images/destaques/oculos_ciclismo_rockbros_577_1_a6aec999fcb6df4d9c4b43abd9a4d2b5.jpg"
import Speed from "../assets/images/destaques/SPEEDSTER 10.jpg"
import Sinalizador from "../assets/images/destaques/sinalizador Rontek.jpg"



// Interface para produtos da loja
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

// Interface para itens do carrinho
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  marca: string;
  tamanho: string;
  tipo: string;
}

// Array de produtos da loja
const produtos: Produto[] = [
  {
    id: 1,
    nome: "Cannondale Trail",
    preco: 7500.00,
    parcelas: "12x R$ 625,00",
    imagem: Trail,
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
    imagem: CapaceteGiro,
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
    imagem: Farol,
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
    imagem: Oculos,
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
    imagem: Speed,
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
    imagem: Sinalizador,
    marca: "Rontek",
    tamanho: "M",
    tipo: "Urban",
    avaliacao: 4.5
  }
];

// Context para o carrinho
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (produto: Produto) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook para usar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};


// Provider do carrinho
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (produto: Produto) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === produto.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, {
          id: produto.id,
          name: produto.nome,
          price: produto.preco,
          quantity: 1,
          image: produto.imagem,
          marca: produto.marca,
          tamanho: produto.tamanho,
          tipo: produto.tipo
        }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
  setCartItems([]);
};



  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
       clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  // Usar o contexto do carrinho
  const { cartItems, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Função para formatar preço
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // Componente do dropdown do carrinho
  const CartDropdown = () => (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Carrinho de Compras</h3>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Seu carrinho está vazio</p>
            <p className="text-sm text-gray-400 mt-1">Adicione produtos para começar suas compras</p>
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                    <div className="flex gap-1 mt-1">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {item.marca}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {item.tamanho}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-50 rounded ml-2"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="font-bold text-lg text-gray-800">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-center gap-2">
               
               <Link to="/checkout"><button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors cursor-pointer">
                  Finalizar Compra
                </button></Link>
                
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
   <header className="bg-white shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center">
          
          {/* Logo com imagem */}
          <div className="flex items-center">
            <img src={logotipo} alt="BikeStore" className="h-55 w-55" />
          </div>
          
          {/* Menu de navegação - Desktop */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link to='/home'  className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to='/about' className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Sobre
              </Link>
              <Link to='/bicycles' className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Bicicletas
              </Link>
              <Link to='/acessories' className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Acessórios
              </Link>
              <Link to='/SalesProducts' className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Ofertas
              </Link>
              <Link to='/contact' className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Contato
              </Link>
            </div>
          </nav>

          {/* Barra de busca - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative m-6">
              <input
                type="text"
                placeholder="Buscar bicicletas..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-black focus:border-black outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
            </div>
          </div>

          {/* Ícones do lado direito - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
           <Link to="/login" className="text-black">
              <User className="h-6 w-6 cursor-pointer" />
            </Link>
            <div className="relative">
              <button 
                onClick={toggleCart}
                className="text-black cursor-pointer relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              {isCartOpen && <CartDropdown />}
            </div>
          </div>

          {/* Botão do menu hambúrguer - Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-black"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>

        {/* Menu Mobile - Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute bottom-full-full left-0 w-screen bg-gray-100 z-50 opacity-95">
            <div className=" flex flex-col items-center pt-3 pb-3 mt-2">
              
              {/* Barra de busca mobile */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Buscar bicicletas..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-black focus:border-black outline-none"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
              </div>
              
              {/* Links de navegação mobile */}
              <Link to='/home' className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to='/bicycles' className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Bicicletas
              </Link>
              <Link to='/acessories' className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Acessórios
              </Link>
              <Link to='/about' className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Sobre
              </Link>
              <Link to='/contact' className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Contato
              </Link>
              
              {/* Botões mobile */}
              <div className="flex items-center space-x-4 px-3 py-2 border-t border-gray-200 mt-4 pt-4">
                
                <Link to="/login">
                <div className="text-black flex items-center space-x-2 cursor-pointer p-2  hover:bg-gray-100">
                  <User className="h-5 w-5" />
                  <span className="text-black">Login</span>
                </div>
              </Link>
                <button 
                  onClick={toggleCart}
                  className="text-black flex items-center space-x-2 relative cursor-pointer"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-black">Carrinho</span>
                  {getTotalItems() > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Carrinho Mobile - Dropdown separado */}
        {isCartOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-200 z-50">
            <CartDropdown />
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;

