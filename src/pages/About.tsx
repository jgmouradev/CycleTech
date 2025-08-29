
import foto1 from '../assets/images/sobre/loja.jpg'
import foto2 from '../assets/images/sobre/loja 2.jpg'
import foto3 from '../assets/images/sobre/loja 3.jpg'


export function About(){
 return (
    <div>
                
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-20">
            <img src={foto1} alt="Nossa loja - Interior" className="w-full h-64 object-cover rounded-lg shadow-md" />
            <img src={foto2} alt="Nossa loja - Produtos" className="w-full h-64 object-cover rounded-lg shadow-md" />
            <img src={foto3} alt="Nossa loja - Oficina" className="w-full h-64 object-cover rounded-lg shadow-md" />
        </div>

            <h1 className="p-8 text-center text-6xl font-extrabold">Nossa História</h1>

        <p className="p-8 text-lg text-center leading-relaxed">
            Há 10 anos, nossa loja nasceu com um objetivo claro: oferecer excelência em produtos e serviços no universo do ciclismo, atendendo desde o ciclista iniciante até o atleta de alta performance.
        </p>
        
        <div className="p-8 text-center ml-10">
            <p className="mb-4 text-lg text-center leading-relaxed">
                Ao longo dessa trajetória, consolidamos nossa atuação com base em três pilares fundamentais:
            </p>
            
            <div className="mb-2">
                <h3 className="text-2xl font-bold mb-2">Qualidade</h3>
                <p className="text-lg ml-10 leading-relaxed">
                    Trabalhamos com as principais marcas e modelos do mercado, garantindo aos nossos clientes bicicletas, peças, acessórios e equipamentos de alto desempenho, sempre com tecnologia de ponta e inovação.
                </p>
            </div>
            
            <div className="mb-2">
                <h3 className="text-2xl font-bold mb-2">Atendimento Especializado</h3>
                <p className="text-lg ml-10 leading-relaxed">
                    Nossa equipe é formada por profissionais qualificados e apaixonados por ciclismo. Buscamos compreender as necessidades individuais de cada cliente, oferecendo orientações técnicas precisas, consultoria personalizada e um serviço de pós-venda completo.
                </p>
            </div>
            
            <div className="mb-2">
                <h3 className="text-2xl font-bold mb-2">Serviços de Manutenção e Suporte</h3>
                <p className="text-lg ml-10 leading-relaxed">
                    Contamos com uma oficina especializada, equipada com ferramentas modernas e profissionais certificados, assegurando manutenções preventivas, ajustes de performance e serviços técnicos de alta qualidade.
                </p>
            </div>
            
            <p className="text-lg mt-10 ml-10 leading-relaxed mb-4">
                Nestes 10 anos de atuação, construímos uma relação sólida de confiança com nossos clientes, parceiros e fornecedores. Cada bicicleta vendida, cada serviço realizado e cada cliente atendido representam, para nós, mais do que um negócio: são parte de uma história construída com dedicação, ética e compromisso.
            </p>
            
            <p className="text-lg ml-10 leading-relaxed mb-4">
                Seguimos firmes na nossa missão de promover o ciclismo como estilo de vida, esporte e meio de transporte sustentável. E seguimos pedalando juntos, sempre em busca de novos desafios e conquistas.
            </p>
            
            <p className="text-lg ml-10 leading-relaxed font-semibold">
                Nossa história continua. Bem-vindo à nossa loja.
            </p>
        </div>
    </div>
 )
}