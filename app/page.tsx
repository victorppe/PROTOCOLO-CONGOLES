"use client"

import { useEffect, useState } from "react"
import { CheckCircle, ChevronDown, ChevronUp, Shield, Zap, Users } from "lucide-react"

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState("")
  const [openFaqItems, setOpenFaqItems] = useState<Record<number, boolean>>({})
  const [showUpsellPopup, setShowUpsellPopup] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180)

  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      const day = String(now.getDate()).padStart(2, "0")
      const month = String(now.getMonth() + 1).padStart(2, "0")
      const year = now.getFullYear()
      setCurrentDate(`${day}/${month}/${year}`)
    }

    updateDate()
  }, [])

  useEffect(() => {
    if (!showUpsellPopup) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowUpsellPopup(false)
          return 180
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showUpsellPopup])

  const scrollToOffer = () => {
    const element = document.getElementById("offer-67")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleFaq = (index: number) => {
    setOpenFaqItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleBasicPlanClick = () => {
    setShowUpsellPopup(true)
    setTimeLeft(180)
  }

  const handleDeclineUpsell = () => {
    window.open("https://pay.wiapy.com/aInCpWAVv", "_blank")
    setShowUpsellPopup(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Traduzido para português */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-center">
                Descubra como os homens estão conseguindo um <span className="text-cyan-400">PÊNIS MAIOR</span> e mais
                grosso de forma 100% natural e segura.
              </h1>

              <p className="md:text-xl text-gray-300 text-center lg:text-left text-base">
                Resultados visíveis a partir da segunda semana de prática 100% natural, seguro e comprovado.
              </p>
            </div>

            {/* Right Video */}
            <div className="space-y-6">
              <p className="text-center text-gray-300 font-medium">Assista ao vídeo agora — você vai entender tudo ↓</p>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-cyan-400">
                <iframe
                  src="https://player.vimeo.com/video/882563924?color&autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0"
                  allowFullScreen
                  frameBorder="0"
                  width="100%"
                  style={{ aspectRatio: "16/9" }}
                  className="rounded-xl"
                  allow="autoplay; fullscreen"
                />
              </div>
              <button
                onClick={scrollToOffer}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
             text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg 
             active:scale-95 transition-all duration-200"
              >
                QUERO RESULTADOS AGORA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Marks Section - Traduzido para português */}
      <section className="py-8 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, text: "Garantia total de", boldPart: "30 dias" },
              { icon: Users, text: "Mais de", boldPart: "80 mil homens" },
              { icon: Zap, text: "Resultados", boldPart: "rápidos" },
            ].map((mark, index) => {
              const Icon = mark.icon
              return (
                <div key={index} className="flex items-center justify-center space-x-3">
                  <Icon className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <p className="text-base text-gray-200">
                    {mark.text} <strong>{mark.boldPart}</strong>
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Natural & Safe - Traduzido para português */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              100% natural, seguro e comprovado. Sem cirurgias, sem aparelhos e sem medicamentos. Apenas técnicas reais
              que funcionam.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              {[
                {
                  title: "Apenas 10 minutos ao dia",
                  description: "Leva apenas 10 minutos de treino diário",
                  image: "/images/relogio10minutos-1024x1024.png",
                },
                {
                  title: "Ganhe até 6CM e deixe mais grosso",
                  description: "Nosso método irá aumentar e engrossar seu pênis",
                  image: "/images/ate-6cm-1024x1024.png",
                },
                {
                  title: "Nenhum aparelho necessário",
                  description: "Tudo que você irá fazer é praticar os exercícios com suas mãos",
                  image: "/images/semk-bomba-1024x1024.png",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center animate-fade-in border-t-4 border-blue-400"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-6 flex justify-center">
                    <img
                      src={benefit.image || "/placeholder.svg"}
                      alt={benefit.title}
                      className="w-16 md:w-20 h-16 md:h-20 object-contain"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: "Total controle da ejaculação",
                  description: "De fim a ejaculação precoce e aguente o tempo que desejar",
                  image: "/images/totol-controle-1-1024x1024.png",
                },
                {
                  title: "Ereções firmes e rígidas",
                  description:
                    "Ereções firmes como rocha por muito tempo através de um músculo pélvico forte e desenvolvido",
                  image: "/images/erecoes-firmes-1024x1024.png",
                },
                {
                  title: "Resultados Rápidos",
                  description: "Primeiros resultados já com 2 semanas de prática",
                  image: "/images/resultados-rapiudos-1-1024x1024.png",
                },
              ].map((benefit, index) => (
                <div
                  key={index + 3}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center animate-fade-in border-t-4 border-cyan-400"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <div className="mb-6 flex justify-center">
                    <img
                      src={benefit.image || "/placeholder.svg"}
                      alt={benefit.title}
                      className="w-16 md:w-20 h-16 md:h-20 object-contain"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Dotado Maximo */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
              Benefícios do Dotado Máximo
            </h2>
            <p className="text-lg md:text-xl text-center text-gray-600 mb-8">
              Com o método Dotado Máximo você obterá <span className="text-blue-600 font-bold">vários benefícios</span>{" "}
              em um único lugar!
            </p>
            <p className="text-base md:text-lg text-center text-gray-700 mb-8 leading-relaxed">
              Ao final do treinamento obterá um pênis maior e mais grosso, mais controle da ejaculação, maior qualidade
              das ereções, recuperação pós sexo muito mais rápida e um material exclusivo para ser melhor na cama com
              suas parceiras!
            </p>
            <p className="text-base md:text-lg text-center text-gray-600 mb-12">
              Isso tudo por um preço muito especial, podendo colocar em prática{" "}
              <span className="text-blue-600 font-bold">AGORA mesmo!</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {[
                "Pênis maior e mais grosso",
                "Veias mais aparentes",
                "Ereções mais rígidas",
                "Ajuda a endireitar a curvatura",
                "Mais controle da ejaculação",
                "Músculo PC forte e desenvolvido",
                "Método cientificamente comprovado",
                "Ganhos rápidos e permanentes",
                "100% seguro, natural e garantido",
                "Garante mais prazer para as suas parceiras",
                "Mais confiança, controle e prazer sexual",
                "30 dias de garantia",
                "Provado por mais de 80.000 homens",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start md:items-center space-x-3 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl animate-fade-in border-l-4 border-blue-600"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-blue-600 flex-shrink-0 mt-0.5 md:mt-0" />
                  <p className="text-sm md:text-base text-gray-700 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Access Section */}
      <section className="py-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="animate-fade-in">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Acesse tudo pelo seu celular
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {[
                    "Acesso a videos profissionais de todo passo a passo",
                    "Acesso ao manual Dotado Máximo",
                    "Acesso a tabela de resultados",
                    "Acesso a tabela de rotina",
                    "Suporte via Email, WhatsApp e ligação",
                    "Acesso com login e senha exclusivo",
                    "E muito mais...",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm md:text-base text-gray-700 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    onClick={scrollToOffer}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    QUERO ACESSAR AGORA
                  </button>
                </div>
              </div>
              <div className="animate-slide-up">
                <img
                  src="/images/design-mode/dmartenova-min.png"
                  alt="Acesso no celular"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Você irá ganhar 6 bônus</h2>
              <p className="text-lg md:text-xl text-gray-600">se comprar ainda HOJE</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-6 auto-rows-fr">
              {[
                {
                  title: "Manual do Cafajeste Malicioso na Sedução",
                  price: "R$129,00",
                  image: "https://dotadomaximo.com.br/wp-content/uploads/2022/04/seja-malicioso-na-cama-pro-1.png",
                },
                {
                  title: "Psicologia Reversa na Persuasão p/ Mulheres",
                  price: "R$97,00",
                  image: "https://dotadomaximo.com.br/wp-content/uploads/2022/04/a-pscologia-reversa-capa-pro-1.png",
                },
                {
                  title: "Manual do Homem Moderno",
                  price: "R$69,00",
                  image: "https://dotadomaximo.com.br/wp-content/uploads/2022/04/manual-do-homem-moderno-pro-1.png",
                },
                {
                  title: "O Que Não Fazer no Primeiro Encontro",
                  price: "R$95,00",
                  image:
                    "https://dotadomaximo.com.br/wp-content/uploads/2022/04/o-que-nao-fazer-no-primeiro-encontro.png",
                },
              ].map((bonus, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col border border-gray-200"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <img
                    src={
                      bonus.image ||
                      "https://dotadomaximo.com.br/wp-content/uploads/2022/04/seja-malicioso-na-cama-pro-1.png" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={bonus.title}
                    className="w-full h-40 md:h-56 object-cover"
                  />
                  <div className="p-3 md:p-4 flex flex-col flex-grow">
                    <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-3 line-clamp-3 flex-grow">
                      {bonus.title}
                    </h3>
                    {bonus.price && (
                      <p className="text-center text-xs md:text-sm">
                        <span className="text-blue-600 line-through">de {bonus.price}</span>
                        <span className="text-green-600 font-bold block">por R$00,00</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-6 auto-rows-fr mt-6">
              {[
                {
                  title: "Como Saber Se Ela Sente Desejo Por Mim",
                  price: "R$59,00",
                  image:
                    "https://dotadomaximo.com.br/wp-content/uploads/2022/04/como-saber-se-ela-sente-desejo-por-mim-min.png",
                },
                {
                  title: "Controle Máximo - Ejaculação Precoce",
                  price: "R$197,00",
                  image: "https://dotadomaximo.com.br/wp-content/uploads/2022/04/controle-maximo-mockup-min.png",
                },
              ].map((bonus, index) => (
                <div
                  key={index + 4}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col border border-gray-200"
                  style={{ animationDelay: `${(index + 4) * 0.15}s` }}
                >
                  <img
                    src={bonus.image || "/placeholder.svg"}
                    alt={bonus.title}
                    className="w-full h-40 md:h-56 object-cover"
                  />
                  <div className="p-3 md:p-4 flex flex-col flex-grow">
                    <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-3 line-clamp-3 flex-grow">
                      {bonus.title}
                    </h3>
                    {bonus.price && (
                      <p className="text-center text-xs md:text-sm">
                        <span className="text-blue-600 line-through">de {bonus.price}</span>
                        <span className="text-green-600 font-bold block">por R$00,00</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="offer-67" className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-gray-900">
                APENAS 36% DOS HOMENS CONSEGUEM FAZER AS MULHERES GOZAREM!
              </h2>
              <p className="text-base md:text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
                Sua compra é <span className="text-blue-600 font-bold">100% segura</span> e discreta!
              </p>
              <p className="text-sm md:text-base text-gray-600 mb-8">
                Enviaremos o acesso ao treinamento para o seu email e WhatsApp imediatamente após a confirmação de
                pagamento. Podendo acessar pelo seu celular ou computador. Rápido, prático e fácil!
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#23CCF6]/10 to-cyan-50 rounded-3xl p-6 md:p-8 mb-6 animate-slide-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Basic Plan */}
                <div className="relative bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 shadow-xl">
                  <div className="text-center space-y-4 mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Plano Básico</h3>
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-4xl sm:text-5xl font-extrabold text-red-500">R$9,90</p>
                      <p className="text-gray-600 text-sm">Pagamento único</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 p-4 rounded-lg bg-gray-100 border border-gray-300">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-800 text-sm">Acesso ao protocolo básico</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-800 text-sm">Técnicas de jelq</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-800 text-sm">Exercícios de aquecimento</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-800 text-sm">Garantia de 30 dias</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBasicPlanClick}
                    className="w-full bg-gradient-to-r from-[#EF3F40] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    ESCOLHER PLANO BÁSICO
                  </button>
                </div>

                {/* Premium Plan */}
                <div className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-2xl p-6 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 shadow-xl ring-1 ring-slate-600">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#23CCF6] to-cyan-400 text-gray-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    MAIS ESCOLHIDO
                  </div>

                  <div className="text-center space-y-4 mb-6">
                    <h3 className="text-xl font-bold text-white">Acesso Vitalício</h3>
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-gray-300 line-through text-sm">de R$147,00</p>
                      <p className="text-4xl sm:text-5xl font-extrabold text-red-500">R$39,90</p>
                      <p className="text-gray-300 text-sm">Pagamento único</p>
                      <div className="bg-gradient-to-r from-[#EF3F40] to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">
                        Economize R$107,10
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-100 text-sm font-semibold">Tudo do plano básico +</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-100 text-sm">Protocolo completo avançado</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-100 text-sm">Técnicas de engrossamento</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-100 text-sm">6 Bônus exclusivos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-100 text-sm">Suporte prioritário</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-100 text-sm">Atualizações vitalícias</span>
                    </div>
                  </div>

                  <a
                    href="https://pay.wiapy.com/tG-O3lZ1e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-[#EF3F40] to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-3 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl block text-white text-center"
                  >
                    GARANTIR ACESSO VITALÍCIO
                  </a>
                </div>
              </div>
            </div>

            {showUpsellPopup && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
                  <div className="p-6 space-y-6">
                    <div className="text-center space-y-4">
                      <div className="inline-block bg-gradient-to-r from-[#EF3F40] to-red-600 text-white px-4 py-2 rounded-full text-xs font-bold">
                        🎉 OFERTA ESPECIAL DESBLOQUEADA!
                      </div>

                      <p className="text-gray-700 text-sm leading-snug">
                        VOCÊ LIBEROU UM DESCONTO DE
                        <br />
                        <span className="text-red-600 text-base font-bold">50% PARA LEVAR O PLANO</span>
                        <br />
                        COMPLETO! DE 34,90 POR APENAS:
                      </p>
                    </div>

                    <div className="text-center space-y-1">
                      <p className="text-5xl font-extrabold text-red-500">R$19,90</p>
                      <p className="text-gray-700 text-sm">ou 3x de R$6,63</p>
                      <div className="text-center bg-red-50 rounded-lg p-3 border border-red-200 mt-4">
                        <p className="text-red-600 font-semibold text-xs leading-snug">
                          VOCÊ VAI RECEBER TODOS OS BÔNUS DO
                          <br />
                          PROTOCOLO CONGOLÊS, ATUALIZAÇÕES E<br />
                          ACESSO VITALÍCIO. APROVEITE!
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <a
                        href="https://pay.wiapy.com/C0AgUuvhr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-[#EF3F40] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg block text-center"
                      >
                        APROVEITAR DESCONTO!
                      </a>
                      <button
                        onClick={handleDeclineUpsell}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 rounded-xl transition-all duration-200 border border-gray-600"
                      >
                        Seguir com plano básico
                      </button>
                    </div>

                    <p className="text-center text-sm text-gray-600 font-semibold">
                      ⏰ Oferta expira em: <span className="text-red-500">{formatTime(timeLeft)}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}

      {/* Testimonials Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8">
              Milhares de clientes satisfeitos com o método!
            </h2>
            <p className="text-center text-lg md:text-xl text-gray-600 mb-2">
              Já transformamos a vida sexual de mais de
            </p>
            <p className="text-center text-4xl md:text-5xl font-bold text-[#23CCF6] mb-12">80 mil homens</p>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {[
                { name: "Depoimento Luan", videoId: "519485244" },
                { name: "Depoimento Thiago", videoId: "709902913" },
              ].map((testimonial, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <p className="text-center text-white mb-4 font-medium bg-gray-900 py-2 rounded-lg text-sm md:text-base">
                    {testimonial.name}
                  </p>
                  <div className="relative">
                    <iframe
                      src={`https://player.vimeo.com/video/${testimonial.videoId}?color&autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0`}
                      allowFullScreen
                      frameBorder="0"
                      width="100%"
                      height="400"
                      style={{ maxWidth: "100%", height: "auto", aspectRatio: "16/9" }}
                      className="rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {[
                { name: "Depoimento Carlos", videoId: "519484866" },
                { name: "Depoimento Gabriel", videoId: "699823785" },
              ].map((testimonial, index) => (
                <div key={index + 2} className="animate-fade-in" style={{ animationDelay: `${(index + 2) * 0.2}s` }}>
                  <p className="text-center text-white mb-4 font-medium bg-gray-900 py-2 rounded-lg text-sm md:text-base">
                    {testimonial.name}
                  </p>
                  <div className="relative">
                    <iframe
                      src={`https://player.vimeo.com/video/${testimonial.videoId}?color&autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0`}
                      allowFullScreen
                      frameBorder="0"
                      width="100%"
                      height="400"
                      style={{ maxWidth: "100%", height: "auto", aspectRatio: "16/9" }}
                      className="rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-1 gap-6 md:gap-8 max-w-2xl mx-auto">
              {[{ name: "Depoimento Nicolas", videoId: "519485341" }].map((testimonial, index) => (
                <div key={index + 4} className="animate-fade-in">
                  <p className="text-center text-white mb-4 font-medium bg-gray-900 py-2 rounded-lg text-sm md:text-base">
                    {testimonial.name}
                  </p>
                  <div className="relative">
                    <iframe
                      src={`https://player.vimeo.com/video/${testimonial.videoId}?color&autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0`}
                      allowFullScreen
                      frameBorder="0"
                      width="100%"
                      height="400"
                      style={{ maxWidth: "100%", height: "auto", aspectRatio: "16/9" }}
                      className="rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center bg-gray-100 rounded-xl p-4">
              <p className="text-gray-700 text-sm md:text-base">
                Contribua com nosso método. Envie seu depoimento para:{" "}
                <span className="font-bold">contato@dotadomaximo.com.br</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "Como funciona o método?",
                  answer:
                    "O metodo Dotado Maximo é um metodo 100% natural e seguro, aonde são ensinado técnicas e exercícios exclusivos para crescer e engrossar o pênis, bem como dicas e táticas para controlar a ejaculação e melhorar as ereções. Você deverá práticar as técnicas por uns 10 minutinhos por dia, podendo ser no horario do banho. Os primeiros resultados já podem serem notados já na segunda semana de prática. Os resultados podem chegar em até 6CM.",
                },
                {
                  question: "Isso funcionará para mim?",
                  answer:
                    "Nossa taxa de sucesso é de 98%. Nossos clientes ficam muito satisfeito com os resultados que obtém. Nós temos total convicção que se você praticar os exercícios corretamente, também obterá resultados satisfatórios. E ainda oferecemos garantia de 30 dias. Caso não obter resultados satisfatórios devolvemos seu dinheiro, sem perguntas.",
                },
                {
                  question: "Essas técnicas são seguras?",
                  answer:
                    "Sim, elas são apoiada e endossada pela comunidade médica, isso porque o processo não é dolorido, não causa complicações futuras e são muito efetivas para o aumento peniano, embora muito desconhecidas pela maioria das pessoas, elas vem sendo a melhor forma para aumentar o tamanho e a grossura do pênis",
                },
                {
                  question: "Existe algum tipo de garantia?",
                  answer:
                    "Sim, o tempo mínimo para se obter resultados é de 2 semanas, caso não perceba nenhuma evolução nesse periodo é só solicitar o reembolso. Você receberá no seu email um login e senha para logar na plataforma monetizze, e é lá que terá a opção de solicitar o reembolso.",
                },
                {
                  question: "Outras dúvidas",
                  answer:
                    "Quando vou começar a ver os resultados? Os primeiros resultados podem serem notados já na segunda semana de prática. Terei que comprar algo? Não, você não precisará comprar nenhum aparelho ou remédio. Os exercícios são simples de praticar, não causam dor e o processo é bem rápido, você levará apenas 10 minutinhos para praticar. Vocês tem algum tipo de linha de apoio, se eu precisar de ajuda? Sim, oferecemos suporte no whatsapp e e-mail. Nós responderemos às suas perguntas o mais rápido possível. Qualquer dúvida que você estiver pode chamar nos no whatsapp que te ajudaremos. Alguma coisa será enviada para minha casa? Não, você receberá todo material para acessar pelo seu celular ou computador. Nós respeitamos sua privacidade, você vai querer que o nosso treinamento seja um pequeno segredo, então o extrato do seu cartão de crédito será simplesmente cobrado como 'MonetizeDM' pela sua privacidade. O meu acesso ao treinamento será vitalicio? Sim, você terá uma conta exclusiva para logar na nossa área de membros. E esse acesso sempre está disponivel para você. Você pagará pelo método somente 1x. Funciona com todos homens? Na maioria das vezes, sim. Entre em contato conosco pelo suporte para avaliarmos a sua situação.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in border-l-4 border-blue-600"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex items-center justify-between w-full p-4 md:p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-base md:text-lg font-medium text-gray-900">{faq.question}</span>
                    {openFaqItems[index] ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {openFaqItems[index] && (
                    <div className="px-4 md:px-6 pb-6">
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              © 2025 Método Dotado Máximo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
