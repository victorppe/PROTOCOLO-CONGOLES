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

      {/* Benefits Grid - Traduzido para português */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Controle total da ejaculação",
                  description: "Adeus à ejaculação precoce: controle seu tempo e sua intensidade.",
                  image:
                    "https://dotadmaximo.website/035c19e870ba46769eadc05f4ff9218c/images/icone-relogio-de-fogo-300x300.png",
                },
                {
                  title: "Ereções firmes e duradouras",
                  description:
                    "Ereções mais rígidas e duradouras graças a um trabalho muscular específico e comprovado.",
                  image:
                    "https://dotadmaximo.website/035c19e870ba46769eadc05f4ff9218c/images/icone-homem-forte-300x300.png",
                },
                {
                  title: "Resultados rápidos",
                  description:
                    "Resultados visíveis a partir da segunda semana de prática com rotinas diárias de 10 minutos.",
                  image: "https://dotadmaximo.website/035c19e870ba46769eadc05f4ff9218c/images/icone-bomba-300x300.png",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center border-t-4 border-cyan-400 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-6 flex justify-center">
                    <img
                      src={benefit.image || "https://i.imgur.com/ZWCii9z.png"}
                      alt={benefit.title}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get - Traduzido para português */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              O que você vai conquistar com o método
            </h2>
            <p className="text-xl text-center text-gray-600 mb-4">
              Um único método. Vários resultados. Tudo em um só lugar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {[
                "Pênis maior e mais grosso",
                "Ereções muito mais rígidas",
                "Controle total da ejaculação",
                "Resultados progressivos a partir da semana 2",
                "Método 100% natural e seguro",
                "Mais confiança, controle e prazer",
                "Acesso móvel e fácil de seguir",
                "Comprovado por mais de 80.000 homens",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-blue-600 hover:shadow-md transition-shadow duration-300"
                >
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <p className="text-base text-gray-700 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Access - Traduzido para português */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Acesse o método completo pelo seu celular
                </h2>
                <div className="space-y-4">
                  {[
                    "Vídeos passo a passo e rotinas curtas",
                    "Manual completo e tabelas de progresso",
                    "Rotina diária de crescimento",
                    "Suporte por WhatsApp e email",
                    "Acesso com login exclusivo",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-base text-gray-700 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={scrollToOffer}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  QUERO ACESSO IMEDIATO
                </button>
              </div>
              <div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dmartenova-min%20%281%29-3UnkwND5zXpMBNmIkrvyd1rcz7mGTb.png"
                  alt="Acesso no celular"
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses - Substituído pelos novos bônus do arquivo anexado */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">6 BÔNUS DE PRESENTE — APENAS HOJE</h2>
              <p className="text-xl text-gray-600">Valor real: mais de R$600 — Hoje: GRÁTIS com a compra</p>
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

      {/* Testimonials – Videos - Traduzido para português */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Milhares de homens no Brasil já estão usando este método
            </h2>

            <p className="text-center text-xl text-gray-600 mb-2">Mais de</p>
            <p className="text-center text-5xl text-[#23CCF6] mb-12 font-extrabold">80.000 resultados comprovados</p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="max-w-6xl mx-auto">
  
  
  

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
            src={`https://player.vimeo.com/video/${testimonial.videoId}?color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1`}
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
    ].map((testimonial, index) => (
      <div key={index + 2} className="animate-fade-in" style={{ animationDelay: `${(index + 2) * 0.2}s` }}>
        <p className="text-center text-white mb-4 font-medium bg-gray-900 py-2 rounded-lg text-sm md:text-base">
          {testimonial.name}
        </p>
        <div className="relative">
          <iframe
            src={`https://player.vimeo.com/video/${testimonial.videoId}?color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1`}
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
</div>
              
            </div>

            <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto mb-8">
              
            </div>

            {/* Guarantee Box - Traduzido para português */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500 rounded-xl p-6 sm:p-8 text-center mt-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Resultados Garantidos ou devolvemos seu dinheiro!
              </h2>
              <p className="text-center mb-4">
                <span className="text-[#24b2ff] font-bold text-lg">NÃO PERCA ESSA OPORTUNIDADE!</span>
              </p>
              <p className="text-gray-700 text-lg">
                Você tem <strong>30 dias</strong> para testar o método. Se não sentir resultados, devolvemos{" "}
                <strong>100% do seu dinheiro</strong>. Sem perguntas, sem complicações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section (plans) - Substituído pelos novos planos do arquivo anexado */}
      <section id="offer-67" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              APENAS 36% DOS HOMENS CONSEGUEM FAZER AS MULHERES GOZAREM!
            </h2>
            <p className="text-lg mb-6 text-gray-600 max-w-2xl mx-auto">
              Sua compra é <span className="text-blue-600 font-bold">100% segura e discreta</span>.
            </p>
            <p className="text-base text-gray-600 mb-12">
              Você receberá acesso ao treinamento por email e WhatsApp imediatamente após a confirmação do pagamento.
              Pode acessar pelo celular ou computador.
            </p>

            <div className="bg-gradient-to-br from-[#23CCF6]/10 to-cyan-50 rounded-3xl p-8 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Basic Plan - Novo plano básico */}
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

                {/* Premium Plan - Novo plano completo */}
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
                      <span className="text-gray-100 text-sm font-semibold text-left">Tudo do plano básico +</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-100 text-sm text-left">Protocolo completo avançado</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-[#23CCF6] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-gray-100 text-sm text-left">Técnicas de engrossamento</span>
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

            {/* Upsell Popup - Novo popup */}
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

      {/* FAQ - Traduzido para português */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Perguntas importantes antes de começar
            </h2>

            <div className="space-y-4">
              {[
                {
                  question: "Como funciona o método?",
                  answer:
                    "O método é 100% natural e seguro. Nele você vai aprender exercícios, rotinas e técnicas que aumentam o tamanho, grossura e potência do pênis. Você vai praticar apenas 10 minutos por dia, e os primeiros resultados costumam aparecer na segunda semana.",
                },
                {
                  question: "Isso vai funcionar para mim?",
                  answer:
                    "Sim. Mais de 98% dos homens relatam resultados visíveis. Se você seguir as rotinas corretamente, vai notar mudanças reais. Além disso, você tem garantia de 30 dias.",
                },
                {
                  question: "Esse método é seguro?",
                  answer:
                    "Completamente seguro. Não causa dor, não produz efeitos colaterais e não requer medicamentos. É um método aprovado por profissionais e testado por milhares de homens.",
                },
                {
                  question: "Terei garantia?",
                  answer:
                    "Sim. Se você não notar nenhum resultado em 2 semanas, pode solicitar reembolso total. Seu acesso é imediato e vitalício.",
                },
                {
                  question: "Outras dúvidas",
                  answer:
                    "Você não precisará comprar nada adicional. Não dói. Funciona em qualquer idade adulta. Você terá acesso pelo celular e computador. E sua compra é 100% discreta.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-600">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    {openFaqItems[index] ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFaqItems[index] && (
                    <div className="px-6 pb-6">
                      <p className="text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Traduzido para português */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400">© 2025 Protocolo Congolês — Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* CTA Fixo no Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/0 px-4 pb-4 z-50 md:hidden">
        {/* Placeholder for mobile CTA */}
      </div>
    </div>
  )
}
