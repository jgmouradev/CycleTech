import React, { useState } from 'react';

import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';

import logotipo from "../assets/images/logo.png"


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
   <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center">
          
          {/* Logo com imagem */}
          <div className="flex items-center">
            <img src={logotipo} alt="BikeStore" className="h-55 w-55" />
          </div>
          
          {/* Menu de navegação - Desktop */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Sobre
              </a>
              <a href="#" className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Bicicletas
              </a>
              <a href="#" className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Acessórios
              </a>
              <a href="#" className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Contato
              </a>
            </div>
          </nav>

          {/* Barra de busca - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative">
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
            <button className="text-black cursor-pointer">
              <User className="h-6 w-6" />
            </button>
            <button className="text-black cursor-pointer">
              <ShoppingCart className="h-6 w-6" />
             
            </button>
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
              <a href="#" className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Bicicletas
              </a>
              <a href="#" className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Acessórios
              </a>
              <a href="#" className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Sobre
              </a>
              <a href="#" className="text-black hover:underline underline-offset-8 px-3 py-2 text-sm font-medium transition-colors">
                Contato
              </a>
              
              {/* Botões mobile */}
              <div className="flex items-center space-x-4 px-3 py-2 border-t border-gray-200 mt-4 pt-4">
                <button className="text-black flex items-center space-x-2 cursor-pointer">
                  <User className="h-5 w-5" />
                  <span className="text-black">Login</span>
                </button>
                <button className="text-black  flex items-center space-x-2 relative cursor-pointer">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-black">Carrinho</span>
                  
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;