import React, { useState } from 'react';
import { CreditCard, MapPin, ShoppingBag, Lock, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../Header';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  numeroCartao: string;
  nomeCartao: string;
  validade: string;
  cvv: string;
  parcelas: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  
  // Usar o contexto do carrinho existente COM a nova função clearCart
  const { cartItems, getTotalPrice, clearCart } = useCart();
  
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nome: '',
    sobrenome: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    numeroCartao: '',
    nomeCartao: '',
    validade: '',
    cvv: '',
    parcelas: '1'
  });

  // Converter CartItem para o formato do checkout
  const produtosCheckout = cartItems.map(item => ({
    id: item.id,
    nome: item.name,
    preco: item.price,
    quantidade: item.quantity,
    imagem: item.image,
    marca: item.marca,
    tamanho: item.tamanho,
    tipo: item.tipo
  }));

  const subtotal = getTotalPrice();
  const frete = subtotal >= 200 ? 0 : 15.90; // Frete grátis acima de R$ 200
  const total = subtotal + frete;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    setFormData(prev => ({ ...prev, cep: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData(prev => ({ ...prev, numeroCartao: value }));
  };

  const handleValidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    setFormData(prev => ({ ...prev, validade: value }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleVoltarCarrinho = () => {
    navigate(-1); // Volta para a página anterior
  };

  const handleFinalizarCompra = async () => {
    setIsProcessing(true);
    
    const dadosCompra = {
      dadosPessoais: {
        email: formData.email,
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        telefone: formData.telefone
      },
      endereco: {
        cep: formData.cep,
        endereco: formData.endereco,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado
      },
      pagamento: {
        numeroCartao: formData.numeroCartao,
        nomeCartao: formData.nomeCartao,
        validade: formData.validade,
        cvv: formData.cvv,
        parcelas: formData.parcelas
      },
      produtos: produtosCheckout,
      resumo: {
        subtotal,
        frete,
        total
      },
      dataCompra: new Date().toISOString()
    };

    try {
      // Simular processamento da compra (substitua pela sua API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você faria a chamada real para sua API
      // const response = await fetch('/api/checkout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dadosCompra)
      // });
      
      console.log('Dados da compra:', dadosCompra);
      
      // Limpar o carrinho após compra bem-sucedida
      clearCart();
      
      // Mostrar mensagem de sucesso
      alert(`✅ Compra finalizada com sucesso!\n\n📦 Total: R$ ${total.toFixed(2)}\n🛍️ Produtos: ${cartItems.length} itens\n\n📧 Você receberá um email de confirmação em breve!`);
      
      // Redirecionar para página de sucesso ou home
      navigate('/home');
      
    } catch (error) {
      console.error('Erro ao processar compra:', error);
      alert('❌ Erro ao processar compra. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const validarStep = () => {
    switch (step) {
      case 1:
        return formData.email && formData.nome && formData.sobrenome && formData.telefone;
      case 2:
        return formData.cep && formData.endereco && formData.numero && 
               formData.bairro && formData.cidade && formData.estado;
      case 3:
        return formData.numeroCartao && formData.nomeCartao && 
               formData.validade && formData.cvv;
      default:
        return false;
    }
  };

  // Se não há itens no carrinho, mostrar mensagem
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-sm text-center max-w-md">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Carrinho Vazio</h2>
          <p className="text-gray-600 mb-6">Adicione produtos ao carrinho antes de finalizar a compra.</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleVoltarCarrinho}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              disabled={isProcessing}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao carrinho
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Finalizar Compra</h1>
            <div className="flex items-center text-green-600">
              <Lock className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Compra Segura</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step > stepNum ? <Check className="w-5 h-5" /> : stepNum}
                    </div>
                    <span className={`ml-3 font-medium ${
                      step >= stepNum ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {stepNum === 1 && 'Dados Pessoais'}
                      {stepNum === 2 && 'Endereço'}
                      {stepNum === 3 && 'Pagamento'}
                    </span>
                    {stepNum < 3 && <div className="w-16 h-px bg-gray-300 ml-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Dados Pessoais */}
            {step === 1 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
                  Dados Pessoais
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sobrenome *</label>
                    <input
                      type="text"
                      name="sobrenome"
                      value={formData.sobrenome}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Seu sobrenome"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Endereço */}
            {step === 2 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Endereço de Entrega
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CEP *</label>
                    <input
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={handleCepChange}
                      maxLength={9}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="00000-000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Selecione</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço *</label>
                    <input
                      type="text"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Rua, Avenida, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número *</label>
                    <input
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                    <input
                      type="text"
                      name="complemento"
                      value={formData.complemento}
                      onChange={handleInputChange}
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Apto, sala, etc. (opcional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bairro *</label>
                    <input
                      type="text"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Nome do bairro"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Nome da cidade"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pagamento */}
            {step === 3 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  Dados do Pagamento
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número do Cartão *</label>
                    <input
                      type="text"
                      name="numeroCartao"
                      value={formData.numeroCartao}
                      onChange={handleCardChange}
                      maxLength={19}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome no Cartão *</label>
                    <input
                      type="text"
                      name="nomeCartao"
                      value={formData.nomeCartao}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Nome como está no cartão"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Validade *</label>
                      <input
                        type="text"
                        name="validade"
                        value={formData.validade}
                        onChange={handleValidadeChange}
                        maxLength={5}
                        required
                        disabled={isProcessing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        placeholder="MM/AA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={4}
                        required
                        disabled={isProcessing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parcelas</label>
                    <select
                      name="parcelas"
                      value={formData.parcelas}
                      onChange={handleInputChange}
                      disabled={isProcessing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="1">1x de R$ {total.toFixed(2)} sem juros</option>
                      <option value="2">2x de R$ {(total / 2).toFixed(2)} sem juros</option>
                      <option value="3">3x de R$ {(total / 3).toFixed(2)} sem juros</option>
                      <option value="6">6x de R$ {(total / 6).toFixed(2)} sem juros</option>
                      <option value="12">12x de R$ {(total / 12).toFixed(2)} sem juros</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  disabled={isProcessing}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Voltar
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={!validarStep() || isProcessing}
                  className={`ml-auto px-8 py-3 rounded-lg font-medium transition-colors ${
                    validarStep() && !isProcessing
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continuar
                </button>
              ) : (
                <button 
                  onClick={handleFinalizarCompra}
                  disabled={!validarStep() || isProcessing}
                  className={`ml-auto px-8 py-3 rounded-lg font-medium transition-colors ${
                    validarStep() && !isProcessing
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? 'Processando...' : 'Finalizar Compra'}
                </button>
              )}
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit sticky top-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo do Pedido</h3>
            
            <div className="space-y-4 mb-6">
              {produtosCheckout.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img src={item.imagem} alt={item.nome} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm">{item.nome}</h4>
                    <p className="text-gray-600 text-sm">Qtd: {item.quantidade}</p>
                    <div className="flex gap-1 mt-1">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {item.marca}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {item.tamanho}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium text-gray-800">
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Frete</span>
                <span className={frete === 0 ? 'text-green-600 font-medium' : ''}>
                  {frete === 0 ? 'GRÁTIS' : `R$ ${frete.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-2">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center text-green-700">
                <Check className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">
                  {subtotal >= 200 ? 'Frete grátis aplicado!' : 'Frete grátis acima de R$ 200'}
                </span>
              </div>
              {subtotal < 200 && (
                <p className="text-sm text-green-600 mt-1">
                  Adicione mais R$ {(200 - subtotal).toFixed(2)} para ganhar frete grátis
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}