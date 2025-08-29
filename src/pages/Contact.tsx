


import  { useState } from 'react';

export function Contact() {

     <div>
        <h1 className=" p-8 text-center text-6xl font-extrabold">Contato</h1>
    </div>


    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
    });

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Aqui você pode implementar o envio do formulário
        console.log('Dados do formulário:', formData);
        alert('Mensagem enviada com sucesso!');
        // Limpar formulário
        setFormData({
            nome: '',
            email: '',
            telefone: '',
            assunto: '',
            mensagem: ''
        });
    };

    const openWhatsApp = () => {
        const phoneNumber = "5555999887766"; // Substitua pelo seu número com código do país
        const message = "Olá! Gostaria de saber mais sobre os produtos e serviços da loja.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-5xl font-extrabold text-center text-gray-900">Entre em Contato</h1>
                    <p className="text-xl text-center text-gray-600 mt-4">
                        Estamos aqui para ajudar com suas dúvidas sobre ciclismo
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Informações de Contato */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossas Informações</h2>
                            
                            <div className="space-y-6">
                                {/* Endereço */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Endereço</h3>
                                        <p className="text-gray-600">Rua das Bicicletas, 123<br />Centro, Bagé - RS<br />CEP: 96400-000</p>
                                    </div>
                                </div>

                                {/* Telefone */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Telefone</h3>
                                        <p className="text-gray-600">(55) 99999-8877</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                                        <p className="text-gray-600">contato@bikeshop.com.br</p>
                                    </div>
                                </div>

                                Horário
                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Horário de Funcionamento</h3>
                                        <p className="text-gray-600">
                                            Segunda a Sexta: 8h às 18h<br />
                                            Sábado: 8h às 12h<br />
                                            Domingo: Fechado
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Botão WhatsApp */}
                            {/* <button
                                onClick={openWhatsApp}
                                className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                <span className="text-lg">Falar no WhatsApp</span>
                            </button> */}
                        </div>
                    </div>

                    {/* Formulário de Contato */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Envie sua Mensagem</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome Completo *
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    required
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Seu nome completo"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    id="telefone"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="(55) 99999-9999"
                                />
                            </div>

                            <div>
                                <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                                    Assunto *
                                </label>
                                <select
                                    id="assunto"
                                    name="assunto"
                                    required
                                    value={formData.assunto}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                >
                                    <option value="">Selecione um assunto</option>
                                    <option value="vendas">Vendas - Informações sobre produtos</option>
                                    <option value="manutencao">Manutenção e Reparo</option>
                                    <option value="garantia">Garantia</option>
                                    <option value="sugestao">Sugestão</option>
                                    <option value="reclamacao">Reclamação</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensagem *
                                </label>
                                <textarea
                                    id="mensagem"
                                    name="mensagem"
                                    required
                                    rows={6}
                                    value={formData.mensagem}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                                    placeholder="Descreva sua dúvida ou solicitação..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
                            >
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>

                {/* Mapa (placeholder) */}
                <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Localização</h2>
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-600">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-lg font-medium">Mapa da nossa localização</p>
                            <p className="text-sm">Rua das Bicicletas, 123 - Centro, Bagé - RS</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botão WhatsApp Flutuante */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={openWhatsApp}
                    className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 animate-pulse"
                    title="Falar no WhatsApp"
                >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                </button>
            </div>
        </div>
    );
}