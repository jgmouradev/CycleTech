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
        <div className="flex items-center justify-between h-40">
          
          {/* Logo com imagem */}
          <div className="flex items-center">
            <img src={logotipo} alt="BikeStore" className="h-55 w-55" />
          </div>
          
          {/* Menu de navegação - Desktop */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Sobre
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Bicicletas
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Acessórios
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
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
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Ícones do lado direito - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button className="text-gray-700 hover:text-blue-600 transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
             
            </button>
          </div>

          {/* Botão do menu hambúrguer - Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>

        {/* Menu Mobile - Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
              
              {/* Barra de busca mobile */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Buscar bicicletas..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              {/* Links de navegação mobile */}
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                Bicicletas
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                Acessórios
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                Sobre
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                Contato
              </a>
              
              {/* Botões mobile */}
              <div className="flex items-center space-x-4 px-3 py-2 border-t border-gray-200 mt-4 pt-4">
                <button className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </button>
                <button className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2 relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Carrinho</span>
                  
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