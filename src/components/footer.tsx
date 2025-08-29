
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin,} from 'lucide-react';
import logotipo from "../assets/images/logo.png"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-white">
      {/* Seção principal do footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
          
          {/* Coluna 1: Logo e descrição */}
          <div className="space-y-3 sm:space-y-4 flex flex-col items-center sm:items-start">
            <div className="flex items-center space-x-2">
              <div className="w-20 h-20 sm:w-25 sm:h-25 rounded-lg flex items-center justify-center">
                <img src={logotipo} alt="Logotipo do Header" className="max-w-full h-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-black">CycleTech</h3>
            </div>
            <p className="text-gray-900 text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-none">
              Sua paixão por pedalar começa aqui! Oferecemos as melhores bicicletas, 
              peças e acessórios para todos os tipos de ciclistas.
            </p>
            
            {/* Redes sociais */}
            <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
              <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100">
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-300 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100">
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-400 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-red-500 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100">
                <Youtube size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Categorias */}
          <div className="space-y-3 sm:space-y-4 flex flex-col items-center sm:items-start">
            <h4 className="text-base sm:text-lg font-semibold text-black">Categorias</h4>
            <ul className="space-y-2 flex flex-col items-center sm:items-start">
              {['Bicicletas Urbanas', 'Mountain Bikes', 'Speed/Road','Bicicletas Elétricas'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Serviços */}
          <div className="space-y-3 sm:space-y-4 flex flex-col items-center sm:items-start">
            <h4 className="text-base sm:text-lg font-semibold text-black">Serviços</h4>
            <ul className="space-y-2 flex flex-col items-center sm:items-start">
              {['Manutenção e Reparo', 'Bike Fit', 'Montagem Personalizada','Consultoria Técnica'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className="space-y-3 sm:space-y-4 flex flex-col items-center sm:items-start">
            <h4 className="text-base sm:text-lg font-semibold text-black">Contato</h4>
            <div className="space-y-3 flex flex-col items-center sm:items-start">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-black flex-shrink-0" />
                <span className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                  Av. Paulista, 1500<br />
                  São Paulo, SP - 01310-100
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-black flex-shrink-0" />
                <a 
                  href="tel:+5511987654321" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base"
                >
                  (11) 98765-4321
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-black flex-shrink-0" />
                <a 
                  href="mailto:contato@bikeshoppro.com" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base"
                >
                  contato@biketech.com
                </a>
              </div>
              
              <div className="mt-4 p-3 rounded-lg text-center sm:text-left">
                <p className="text-xs sm:text-sm text-black font-bold mb-1">Horário de Funcionamento:</p>
                <p className="text-sm text-gray-500 hover:text-gray-900">Seg-Sex: 9h às 18h</p>
                <p className="text-sm text-gray-500 hover:text-gray-900">Sáb: 9h às 17h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-black">🚴‍♂️ Receba dicas e ofertas exclusivas!</h4>
            <p className="text-gray-900 text-sm sm:text-base max-w-2xl mx-auto">
              Cadastre-se para receber novidades sobre bikes, equipamentos e promoções especiais
            </p>
            
            <div className="max-w-sm sm:max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-white border text-black placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm sm:text-base"
                />
                <button className="px-4 sm:px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 font-medium text-sm sm:text-base whitespace-nowrap">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé final */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:flex-row md:justify-between md:space-y-0 text-center md:text-left">
            
            <div className="flex items-center text-gray-900 text-xs sm:text-sm order-1 md:order-1">
              <span>© {currentYear} BikeTech. Todos os direitos reservados.</span>
            </div>
            
            <div className="flex items-center text-gray-900 text-xs sm:text-sm order-2 md:order-2">
              <span>Feito para ciclistas loucos por bike!</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm order-3 md:order-3">
              <a href="#" className="text-gray-900 hover:text-gray-400 transition-colors duration-300 py-1">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-400 transition-colors duration-300 py-1">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-400 transition-colors duration-300 py-1">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

