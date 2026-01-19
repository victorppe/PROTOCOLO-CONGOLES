"use client"

import { useState } from "react"

const benefits = [
  { title: "Apenas 10 minutos ao dia", description: "Leva apenas 10 minutos de treino diario", image: "/images/relogio10minutos-1024x1024.png" },
  { title: "Ganhe ate 6CM e deixe mais grosso", description: "Nosso metodo ira aumentar e engrossar seu penis", image: "/images/ate-6cm-1024x1024.png" },
  { title: "Nenhum aparelho necessario", description: "Tudo que voce ira fazer e praticar os exercicios com suas maos", image: "/images/semk-bomba-1024x1024.png" },
  { title: "Total controle da ejaculacao", description: "De fim a ejaculacao precoce e aguente o tempo que desejar", image: "/images/totol-controle-1-1024x1024.png" },
  { title: "Erecoes firmes e rigidas", description: "Erecoes firmes como rocha por muito tempo atraves de um musculo pelvico forte", image: "/images/erecoes-firmes-1024x1024.png" },
  { title: "Resultados Rapidos", description: "Primeiros resultados ja com 2 semanas de pratica", image: "/images/resultados-rapiudos-1-1024x1024.png" },
]

const benefitsList = [
  "Penis maior e mais grosso", "Veias mais aparentes", "Erecoes mais rigidas", "Ajuda a endireitar a curvatura",
  "Mais controle da ejaculacao", "Musculo PC forte e desenvolvido", "Metodo cientificamente comprovado",
  "Ganhos rapidos e permanentes", "100% seguro, natural e garantido", "Garante mais prazer para as suas parceiras",
  "Mais confianca, controle e prazer sexual", "30 dias de garantia", "Provado por mais de 80.000 homens",
]

const bonuses = [
  { title: "Manual do Cafajeste Malicioso na Seducao", price: "R$129,00", image: "https://dotadomaximo.com.br/wp-content/uploads/2022/04/seja-malicioso-na-cama-pro-1.png" },
  { title: "Psicologia Reversa na Persuasao p/ Mulheres", price: "R$97,00", image: "https://dotadomaximo.com.br/wp-content/uploads/2022/04/a-pscologia-reversa-capa-pro-1.png" },
  { title: "Manual do Homem Moderno", price: "R$69,00", image: "https://dotadomaximo.com.br/wp-content/uploads/2022/04/manual-do-homem-moderno-pro-1.png" },
  { title: "O Que Nao Fazer no Primeiro Encontro", price: "R$95,00", image: "https://dotadomaximo.com.br/wp-content/uploads/2022/04/o-que-nao-fazer-no-primeiro-encontro.png" },
  { title: "Como Saber Se Ela Sente Desejo Por Mim", price: "R$59,00", image: "https://dotadomaximo.com.br/wp-content/uploads/2022/04/como-saber-se-ela-sente-desejo-por-mim-min.png" },
  { title: "Controle Maximo - Ejaculacao Precoce", price: "R$197,00", image: "https://dotadomaximo.com.br/wp-content/uploads/2022/04/controle-maximo-mockup-min.png" },
]

const testimonials = [
  { name: "Depoimento Luan", videoId: "519485244" },
  { name: "Depoimento Thiago", videoId: "709902913" },
  { name: "Depoimento Carlos", videoId: "519484866" },
  { name: "Depoimento Gabriel", videoId: "699823785" },
  { name: "Depoimento Nicolas", videoId: "519485341" },
]

const faqs = [
  { question: "Como funciona o metodo?", answer: "O metodo Dotado Maximo e um metodo 100% natural e seguro, aonde sao ensinado tecnicas e exercicios exclusivos para crescer e engrossar o penis, bem como dicas e taticas para controlar a ejaculacao e melhorar as erecoes. Voce devera praticar as tecnicas por uns 10 minutinhos por dia, podendo ser no horario do banho. Os primeiros resultados ja podem serem notados ja na segunda semana de pratica. Os resultados podem chegar em ate 6CM." },
  { question: "Isso funcionara para mim?", answer: "Nossa taxa de sucesso e de 98%. Nossos clientes ficam muito satisfeito com os resultados que obtem. Nos temos total conviccao que se voce praticar os exercicios corretamente, tambem obtera resultados satisfatorios. E ainda oferecemos garantia de 30 dias. Caso nao obter resultados satisfatorios devolvemos seu dinheiro, sem perguntas." },
  { question: "Essas tecnicas sao seguras?", answer: "Sim, elas sao apoiada e endossada pela comunidade medica, isso porque o processo nao e dolorido, nao causa complicacoes futuras e sao muito efetivas para o aumento peniano, embora muito desconhecidas pela maioria das pessoas, elas vem sendo a melhor forma para aumentar o tamanho e a grossura do penis" },
  { question: "Existe algum tipo de garantia?", answer: "Sim, o tempo minimo para se obter resultados e de 2 semanas, caso nao perceba nenhuma evolucao nesse periodo e so solicitar o reembolso. Voce recebera no seu email um login e senha para logar na plataforma monetizze, e e la que tera a opcao de solicitar o reembolso." },
]

const mobileFeatures = [
  "Acesso a videos profissionais de todo passo a passo",
  "Acesso ao manual Dotado Maximo",
  "Acesso a tabela de resultados",
  "Acesso a tabela de rotina",
  "Suporte via Email, WhatsApp e ligacao",
  "Acesso com login e senha exclusivo",
  "E muito mais...",
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const scrollToOffer = () => {
    document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Descubra como os homens estao conseguindo um{" "}
                <span className="text-cyan-400">PENIS MAIOR</span> e mais grosso de forma 100% natural e segura.
              </h1>
              <p className="text-gray-300 text-base md:text-lg">
                Resultados visiveis a partir da segunda semana de pratica 100% natural, seguro e comprovado.
              </p>
            </div>
            <div>
              <p className="text-center text-gray-300 mb-4">Assista ao video agora</p>
              <div className="rounded-xl overflow-hidden border-4 border-cyan-400 shadow-2xl">
                <iframe
                  src="https://player.vimeo.com/video/882563924?color&autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0"
                  allowFullScreen
                  loading="lazy"
                  width="100%"
                  style={{ aspectRatio: "16/9" }}
                  allow="autoplay; fullscreen"
                />
              </div>
              <button
                onClick={scrollToOffer}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all"
              >
                QUERO RESULTADOS AGORA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-6 bg-gradient-to-br from-gray-900 to-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="text-gray-200 text-sm">
              <span className="text-cyan-400 text-xl">&#10004;</span>
              <p>Garantia total de <strong>30 dias</strong></p>
            </div>
            <div className="text-gray-200 text-sm">
              <span className="text-cyan-400 text-xl">&#10004;</span>
              <p>Mais de <strong>80 mil homens</strong></p>
            </div>
            <div className="text-gray-200 text-sm">
              <span className="text-cyan-400 text-xl">&#10004;</span>
              <p>Resultados <strong>rapidos</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Natural */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-lg md:text-xl text-gray-700">
            100% natural, seguro e comprovado. Sem cirurgias, sem aparelhos e sem medicamentos. Apenas tecnicas reais que funcionam.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center border-t-4 border-blue-400">
                <img src={b.image || "/placeholder.svg"} alt={b.title} className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 object-contain" />
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">Beneficios do Dotado Maximo</h2>
          <p className="text-center text-gray-600 mb-6">
            Com o metodo Dotado Maximo voce obtera <span className="text-blue-600 font-bold">varios beneficios</span> em um unico lugar!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {benefitsList.map((b, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-600">
                <span className="text-blue-600">&#10004;</span>
                <p className="text-sm text-gray-700">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Access */}
      <section className="py-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Acesse tudo pelo seu celular</h2>
              <div className="space-y-2">
                {mobileFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-blue-600">&#10004;</span>
                    <p className="text-sm text-gray-700">{f}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={scrollToOffer}
                className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full text-base transition-all"
              >
                QUERO ACESSAR AGORA
              </button>
            </div>
            <div>
              <img src="/images/design-mode/dmartenova-min.png" alt="Acesso no celular" className="w-full rounded-xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Voce ira ganhar 6 bonus</h2>
          <p className="text-center text-gray-600 mb-6">se comprar ainda HOJE</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {bonuses.map((b, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <img src={b.image || "/placeholder.svg"} alt={b.title} className="w-full h-32 md:h-40 object-cover" />
                <div className="p-3">
                  <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-2 line-clamp-2">{b.title}</h3>
                  <p className="text-xs text-center">
                    <span className="text-blue-600 line-through">de {b.price}</span>
                    <span className="text-green-600 font-bold block">por R$00,00</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer */}
      <section id="offer" className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900">
            APENAS 36% DOS HOMENS CONSEGUEM FAZER AS MULHERES GOZAREM!
          </h2>
          <p className="text-gray-600 mb-6">
            Sua compra e <span className="text-blue-600 font-bold">100% segura</span> e discreta!
          </p>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-4 md:p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Basic */}
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Plano Basico</h3>
                <p className="text-4xl font-extrabold text-red-500 mb-1">R$9,90</p>
                <p className="text-gray-600 text-sm mb-4">Pagamento unico</p>
                <div className="space-y-2 mb-4 p-3 bg-gray-100 rounded-lg text-left text-sm">
                  <p><span className="text-cyan-500">&#10004;</span> Acesso ao protocolo basico</p>
                  <p><span className="text-cyan-500">&#10004;</span> Tecnicas de jelq</p>
                  <p><span className="text-cyan-500">&#10004;</span> Exercicios de aquecimento</p>
                  <p><span className="text-cyan-500">&#10004;</span> Garantia de 30 dias</p>
                </div>
                <button
                  onClick={() => setShowPopup(true)}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl transition-all"
                >
                  ESCOLHER PLANO BASICO
                </button>
              </div>

              {/* Premium */}
              <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-4 shadow-lg text-white">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                  MAIS ESCOLHIDO
                </div>
                <h3 className="text-lg font-bold mb-3 mt-2">Plano Completo </h3>
                <p className="text-gray-300 line-through text-sm">de R$97,00</p>
                <p className="text-4xl font-extrabold text-red-500 mb-1">R$39,90</p>
                <p className="text-gray-300 text-sm mb-4">Pagamento unico</p>
                <div className="space-y-2 mb-4 p-3 bg-slate-600/50 rounded-lg text-left text-sm">
                  <p><span className="text-cyan-400">&#10004;</span> Tudo do plano basico +</p>
                  <p><span className="text-cyan-400">&#10004;</span> Protocolo completo avancado</p>
                  <p><span className="text-cyan-400">&#10004;</span> Tecnicas de engrossamento</p>
                  <p><span className="text-cyan-400">&#10004;</span> 6 Bonus exclusivos</p>
                  <p><span className="text-cyan-400">&#10004;</span> Suporte prioritario</p>
                  <p><span className="text-cyan-400">&#10004;</span> Atualizacoes vitalicias</p>
                </div>
                <a
                  href="https://pay.wiapy.com/tG-O3lZ1e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl transition-all block text-center"
                >
                  GARANTIR PLANO COMPLETO 
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup */}
      {showPopup && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPopup(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold">
                OFERTA ESPECIAL DESBLOQUEADA!
              </span>
            </div>
            <p className="text-center text-gray-700 text-sm mb-4">
              VOCE LIBEROU UM DESCONTO DE<br />
              <span className="text-red-600 font-bold">50% PARA LEVAR O PLANO COMPLETO!</span>
            </p>
            <p className="text-5xl font-extrabold text-red-500 text-center mb-2">R$19,90</p>
            <p className="text-gray-700 text-sm text-center mb-4">ou 3x de R$6,63</p>
            <a
              href="https://pay.wiapy.com/C0AgUuvhr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 rounded-xl block text-center mb-2"
            >
              APROVEITAR DESCONTO!
            </a>
            <button
              onClick={() => {
                window.open("https://pay.wiapy.com/aInCpWAVv", "_blank")
                setShowPopup(false)
              }}
              className="w-full bg-gray-700 text-white font-medium py-2.5 rounded-xl"
            >
              Seguir com plano basico
            </button>
            <div className="text-center bg-red-50 rounded-lg p-3 border border-red-200 mt-4">
              <p className="text-red-600 font-semibold text-xs leading-snug">
                VOCE VAI RECEBER TODOS OS BONUS DO<br />
                Dotado Maximo, ATUALIZACOES E<br />
                ACESSO VITALICIO. APROVEITE!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            Milhares de clientes satisfeitos com o metodo!
          </h2>
          <p className="text-center text-gray-600 mb-2">Ja transformamos a vida sexual de mais de</p>
          <p className="text-center text-4xl font-bold text-cyan-500 mb-8">80 mil homens</p>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((t, i) => (
              <div key={i}>
                <p className="text-center text-white bg-gray-900 py-2 rounded-lg text-sm mb-2">{t.name}</p>
                <iframe
                  src={`https://player.vimeo.com/video/${t.videoId}?color&autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0`}
                  allowFullScreen
                  loading="lazy"
                  width="100%"
                  style={{ aspectRatio: "16/9" }}
                  className="rounded-xl shadow-lg"
                />
              </div>
            ))}
          </div>
          <div className="max-w-xl mx-auto mt-6">
            <p className="text-center text-white bg-gray-900 py-2 rounded-lg text-sm mb-2">{testimonials[4].name}</p>
            <iframe
              src={`https://player.vimeo.com/video/${testimonials[4].videoId}?color&autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0`}
              allowFullScreen
              loading="lazy"
              width="100%"
              style={{ aspectRatio: "16/9" }}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="mt-6 text-center bg-gray-100 rounded-xl p-4">
            <p className="text-gray-700 text-sm">
              Contribua com nosso metodo. Envie seu depoimento para: <strong>contato@dotadomaximo.com.br</strong>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">Perguntas Frequentes</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-600">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{f.question}</span>
                  <span className="text-gray-500">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600">{f.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2025 Metodo Dotado Maximo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
