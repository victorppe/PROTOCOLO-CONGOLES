"use client"

import { useState, useCallback, useEffect, useRef, memo } from "react"

// ─── CDN constants (used for preconnect) ──────────────────────────────────────
const IMG_CDN = "https://metodotripe.shop"
const VID_CDN = "https://institutoduramax.com"
const AVT_CDN = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com"

// ─── Helper: formato BR de número (vírgula no decimal) ───────────────────────
const ptNum = (n: number, decimals = 1) => n.toFixed(decimals).replace(".", ",")

// ─── Slideshow data (kept top-level so we can preload the first one) ──────────
const SLIDES = [
  { src: `${IMG_CDN}/wp-content/uploads/2026/02/02-.jpg`,
    label: "Paciente R.S. — +5,2cm · Verificado" },
  { src: `${IMG_CDN}/wp-content/uploads/2026/01/22109742.jpg`,
    label: "Paciente M.L. — +6,1cm · Verificado" },
  { src: `${IMG_CDN}/wp-content/uploads/2026/02/PACIENTE-H-2990-ANTES-E-DEPOIS-1-1-scaled-1.webp`,
    label: "Paciente H.L. — +4,8cm · Verificado" },
  { src: `${IMG_CDN}/wp-content/uploads/2026/02/daf6ef_d639bfc5b0a34189b18c48e3f54f2763_mv2-1.png`,
    label: "Paciente A.C. — +5,7cm · Verificado" },
  { src: `${IMG_CDN}/wp-content/uploads/2026/02/7564b4c41b95c4d46ca0_-_94d8bd698ca2c759ce37_-_inserir-um-titulo.jpg`,
    label: "Paciente J.G. — +4,3cm · Verificado" },
] as const

// ─── Resource Hints + Fonts ───────────────────────────────────────────────────
function ResourceHints() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href={IMG_CDN} crossOrigin="anonymous" />
      <link rel="preconnect" href={VID_CDN} crossOrigin="anonymous" />
      <link rel="preconnect" href={AVT_CDN} crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Roboto:wght@400;500;600;700&display=swap"
      />
      <link rel="preload" as="image" href={SLIDES[0].src} fetchPriority="high" />
    </>
  )
}

function GlobalStyles() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(2, 95, 222, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(2, 95, 222, 0); }
        }
        @keyframes check-in {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(2, 95, 222, 0.3); }
          50% { box-shadow: 0 0 16px rgba(2, 95, 222, 0.6); }
        }
        .animate-pulse-border { animation: pulse-border 0.6s ease-out; }
        .animate-check-in { animation: check-in 0.2s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.25s ease-out forwards; will-change: transform, opacity; }
        .animate-progress-glow { animation: progress-glow 2s ease-in-out infinite; }

        .opt-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #5e7d9f;
          background: #fff;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          text-align: left;
          cursor: pointer;
          transition: transform .18s, background-color .18s, border-color .18s, color .18s, font-weight .18s;
        }
        @media (hover: hover) {
          .opt-btn:hover:not(:disabled):not([data-selected="true"]) {
            color: #003466;
            background: #f0f5ff;
            border-color: #025fde;
            font-weight: 600;
            transform: scale(1.01);
          }
          .opt-btn:hover:not(:disabled):not([data-selected="true"]) .opt-radio {
            border-color: #025fde;
          }
        }
        .opt-btn[data-selected="true"] {
          color: #fff;
          background: #003466;
          border-color: #003466;
          font-weight: 700;
          transform: scale(1.02);
        }
        .opt-radio {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 9999px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #d1d5db;
          background: transparent;
          transition: border-color .18s, background-color .18s;
        }
        .opt-btn[data-selected="true"] .opt-radio {
          border: none;
          background: #36c57c;
        }

        .cta-btn { transition: transform .18s, box-shadow .18s; }
        @media (hover: hover) {
          .cta-btn:hover:not(:disabled) { transform: translateY(-2px); }
        }
      `
    }} />
  )
}

// ─── Tracking (deferred to idle) ──────────────────────────────────────────────

const loadFbPixel = () => {
  if (typeof window === "undefined" || (window as any).fbq) return
  const f = window as any
  const n: any = (f.fbq = function (...a: any[]) { n.callMethod ? n.callMethod(...a) : n.queue.push(a) })
  if (!f._fbq) f._fbq = n
  n.push = n; n.loaded = true; n.version = "2.0"; n.queue = []
  const s = document.createElement("script")
  s.async = true
  s.src = "https://connect.facebook.net/en_US/fbevents.js"
  document.head.appendChild(s)
  f.fbq("init", "1486018329907497")
  f.fbq("track", "PageView")
}

const useFbPixel = () => {
  useEffect(() => {
    const idle = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined
    if (idle) {
      idle(loadFbPixel, { timeout: 3000 })
    } else {
      const t = setTimeout(loadFbPixel, 1500)
      return () => clearTimeout(t)
    }
  }, [])
}

// ─── Prefetch slideshow images during the quiz ────────────────────────────────

const usePrefetchSlides = () => {
  useEffect(() => {
    if (typeof window === "undefined") return
    const run = () => {
      for (let i = 1; i < SLIDES.length; i++) {
        const img = new Image()
        img.decoding = "async"
        img.loading = "eager"
        img.src = SLIDES[i].src
      }
    }
    const idle = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined
    if (idle) idle(run, { timeout: 4000 })
    else setTimeout(run, 800)
  }, [])
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "quiz" | "loading" | "results"

interface State {
  screen: Screen
  stepIndex: number
  answers: Record<number, string>
  loadProgress: number
  height: number
  heightUnit: "cm" | "ft"
  feetVal: number
  inchVal: number
}

// ─── Quiz Content ─────────────────────────────────────────────────────────────

type Step =
  | { kind: "q"; id: string; q: string; hint: string; opts: readonly string[]; note?: string }
  | { kind: "h"; id: string; q: string; hint: string }
  | { kind: "info"; id: string; title: string; video: string; quote: string }

const STEPS: Step[] = [
  {
    kind: "q",
    id: "age",
    q: "Qual é a sua idade?",
    hint: "Isso define a sua janela de crescimento e a intensidade do protocolo",
    opts: ["18 – 25", "26 – 35", "36 – 50", "51 – 65"],
  },
  {
    kind: "q",
    id: "goal",
    q: "Qual é o seu objetivo principal agora?",
    hint: "Vamos montar o seu plano com base nisso",
    opts: [
      "Aumentar o tamanho — comprimento e espessura",
      "Durar mais e melhorar o desempenho",
      "Ereções mais fortes e firmes",
      "Todas as opções acima",
    ],
  },
  {
    kind: "q",
    id: "erections",
    q: "Com que frequência você acorda com ereção matinal?",
    hint: "Um indicador-chave da saúde de testosterona e do fluxo sanguíneo",
    note: "A ereção matinal é o indicador mais claro da produção de testosterona e da saúde arterial.",
    opts: ["Quase nunca", "Raramente — uma ou duas vezes por semana", "Na maioria das manhãs", "Toda santa manhã"],
  },
  {
    kind: "info",
    id: "info1",
    title: "A fraqueza do assoalho pélvico pode ser a causa invisível por trás da ejaculação precoce",
    video: `${VID_CDN}/wp-content/uploads/2025/05/Assoalho-Pelvico-2.mp4`,
    quote: "A tensão crônica ou a fraqueza dos músculos pélvicos pode tornar a ejaculação automática e incontrolável.",
  },
  {
    kind: "q",
    id: "size",
    q: "Qual é o seu tamanho atual em ereção?",
    hint: "Seja honesto — os seus resultados são totalmente privados",
    opts: [
      "Menos de 12 cm",
      "12 – 14 cm",
      "14 – 16 cm",
      "Mais de 16 cm",
    ],
  },
  {
    kind: "q",
    id: "sleep",
    q: "Quantas horas você costuma dormir por noite?",
    hint: "É no sono que a testosterona é produzida — isso importa mais do que você imagina",
    note: "Até 70% da testosterona diária é produzida durante o sono profundo. Menos de 6 horas pode reduzir o seu potencial de crescimento quase pela metade.",
    opts: ["Menos de 5 horas", "5 – 6 horas", "6 – 7 horas", "8 horas ou mais"],
  },
  {
    kind: "q",
    id: "exercise",
    q: "Com que frequência você se exercita por semana?",
    hint: "A atividade física estimula diretamente a produção do hormônio do crescimento",
    opts: ["Raramente ou nunca", "Uma vez por semana", "2 – 3 vezes por semana", "4 vezes ou mais por semana"],
  },
  {
    kind: "info",
    id: "info2",
    title: "O controle ejaculatório está diretamente ligado à força dos músculos do assoalho pélvico",
    video: `${VID_CDN}/wp-content/uploads/2025/05/Assoalho-Pelvico-1.mp4`,
    quote: "Fortalecer esses músculos permite um melhor controle do reflexo ejaculatório e uma maior retenção sanguínea.",
  },
  {
    kind: "q",
    id: "diet",
    q: "Como você descreveria honestamente a sua alimentação?",
    hint: "A nutrição alimenta a expansão tecidual em nível celular",
    opts: [
      "Principalmente fast food e besteiras",
      "Meio a meio — depende do dia",
      "Refeições equilibradas no geral",
      "Comida de verdade na maior parte do tempo",
    ],
  },
  {
    kind: "q",
    id: "tried",
    q: "Você já tentou algum método natural de aumento antes?",
    hint: "Isso determina onde começamos o seu protocolo",
    note: "Bombas e pesos causam microlesões que bloqueiam o crescimento. O seu protocolo começa com uma fase de recuperação, se necessário.",
    opts: [
      "Não — nunca ouvi falar",
      "Já ouvi falar mas nunca tentei",
      "Tentei mas não fui consistente",
      "Sim — mas vi pouco ou nenhum resultado",
    ],
  },
  {
    kind: "h",
    id: "height",
    q: "Qual é a sua altura?",
    hint: "Usado para ajustar finamente o seu perfil hormonal",
  },
]

const TOTAL_Q = STEPS.filter((s) => s.kind === "q").length

// ─── Result Logic ─────────────────────────────────────────────────────────────

const calcGain = (a: Record<number, string>): number => {
  let g = 3.9
  if (a[0]?.includes("18")) g += 1.1
  else if (a[0]?.includes("26")) g += 0.7
  else if (a[0]?.includes("36")) g += 0.4
  if (a[2] === "Toda santa manhã") g += 0.7
  else if (a[2] === "Na maioria das manhãs") g += 0.4
  if (a[5]?.includes("4 vezes")) g += 0.5
  else if (a[5]?.includes("2 – 3")) g += 0.3
  if (a[6]?.includes("Comida de verdade") || a[6]?.includes("equilibradas")) g += 0.4
  if (a[4]?.includes("8 horas") || a[4]?.includes("6 – 7")) g += 0.3
  return Math.min(7.5, Math.round(g * 10) / 10)
}

const baseSize = (a: Record<number, string>): number => {
  if (a[3]?.includes("Menos de")) return 11
  if (a[3]?.includes("12 – 14")) return 13
  if (a[3]?.includes("14 – 16")) return 15
  return 17
}

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

// ─── Shared UI ────────────────────────────────────────────────────────────────

const Header = memo(function Header() {
  return (
    <header
      className="py-5 px-4 text-center"
      style={{ backgroundColor: "#003466", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <p
        className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-1"
        style={{ color: "#669ef3" }}
      >
        Consultoria Profissional Gratuita
      </p>
      <h1
        className="text-[26px] sm:text-[32px] font-extrabold text-white uppercase leading-tight"
        style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.5px" }}
      >
        Protocolo Congolês
      </h1>
      <p
        className="text-[10px] tracking-widest uppercase mt-1"
        style={{ color: "#669ef3" }}
      >
        Sistema de Crescimento Natural
      </p>
    </header>
  )
})

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function LightbulbIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

// ─── Quiz Screen ──────────────────────────────────────────────────────────────

const ProgressBar = memo(function ProgressBar({ step }: { step: number }) {
  const pct = Math.round((step / TOTAL_Q) * 100)
  return (
    <div className="px-4 pt-4 pb-3">
      <div className="p-3 rounded-lg" style={{ backgroundColor: "#002855" }}>
        <div className="flex justify-between text-[11px] mb-2 font-semibold" style={{ color: "#94a3b8" }}>
          <span>Pergunta {step} de {TOTAL_Q}</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#1e3a5f" }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg, #003466, #025fde)" }}
          />
        </div>
      </div>
    </div>
  )
})

const OptionBtn = memo(function OptionBtn({
  value, onSelect, index,
}: {
  value: string
  onSelect: (v: string) => void
  index: number
}) {
  const [selected, setSelected] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const handleClick = () => {
    setSelected(true)
    timerRef.current = setTimeout(() => onSelect(value), 350)
  }

  return (
    <button
      onClick={handleClick}
      disabled={selected}
      data-selected={selected ? "true" : "false"}
      className={`opt-btn animate-slide-up ${selected ? "animate-pulse-border" : ""}`}
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
    >
      <span className="leading-snug">{value}</span>
      <span className="opt-radio">
        {selected && (
          <svg
            viewBox="0 0 24 24" fill="none" stroke="#fff"
            strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
            className="w-3 h-3 animate-check-in"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
    </button>
  )
})

function HeightStep({
  height, unit, feetVal, inchVal,
  onHeight, onUnit, onFt, onIn, onContinue,
}: {
  height: number; unit: "cm" | "ft"; feetVal: number; inchVal: number
  onHeight: (v: number) => void; onUnit: (u: "cm" | "ft") => void
  onFt: (v: number) => void; onIn: (v: number) => void
  onContinue: () => void
}) {
  const valid = unit === "cm" ? height >= 140 && height <= 225 : feetVal * 12 + inchVal >= 54

  return (
    <div className="space-y-5">
      <div className="flex justify-center">
        <div className="inline-flex p-1 gap-1" style={{ backgroundColor: "#f3f4f6", borderRadius: "6px" }}>
          {(["cm", "ft"] as const).map((u) => (
            <button
              key={u}
              onClick={() => onUnit(u)}
              className="px-5 py-1.5 text-sm font-bold transition-all"
              style={{
                borderRadius: "4px",
                backgroundColor: u === unit ? "#003466" : "transparent",
                color: u === unit ? "#fff" : "#5e7d9f",
              }}
            >
              {u === "cm" ? "cm" : "pés / pol"}
            </button>
          ))}
        </div>
      </div>

      <div
        className="p-6 text-center"
        style={{ backgroundColor: "#f8faff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
      >
        {unit === "cm" ? (
          <>
            <div
              className="text-6xl font-extrabold tabular-nums"
              style={{ color: "#003466", fontFamily: "'Montserrat', sans-serif" }}
            >
              {height}
            </div>
            <div className="text-sm mb-5" style={{ color: "#5e7d9f" }}>centímetros</div>
            <input
              type="range" min={140} max={225} value={height}
              onChange={(e) => onHeight(+e.target.value)}
              className="w-full cursor-pointer"
              style={{ accentColor: "#003466" }}
              aria-label="Altura em centímetros"
            />
            <div className="flex justify-between text-xs mt-1.5" style={{ color: "#9ca3af" }}>
              <span>140 cm</span><span>225 cm</span>
            </div>
          </>
        ) : (
          <>
            <div
              className="text-6xl font-extrabold tabular-nums"
              style={{ color: "#003466", fontFamily: "'Montserrat', sans-serif" }}
            >
              {feetVal}&apos;{inchVal}&quot;
            </div>
            <div className="text-sm mb-5" style={{ color: "#5e7d9f" }}>{height} cm</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs mb-1 font-medium" style={{ color: "#5e7d9f" }}>Pés (4 – 7)</div>
                <input
                  type="range" min={4} max={7} value={feetVal}
                  onChange={(e) => onFt(+e.target.value)}
                  className="w-full cursor-pointer"
                  style={{ accentColor: "#003466" }}
                  aria-label="Altura em pés"
                />
              </div>
              <div>
                <div className="text-xs mb-1 font-medium" style={{ color: "#5e7d9f" }}>Polegadas (0 – 11)</div>
                <input
                  type="range" min={0} max={11} value={inchVal}
                  onChange={(e) => onIn(+e.target.value)}
                  className="w-full cursor-pointer"
                  style={{ accentColor: "#003466" }}
                  aria-label="Altura em polegadas"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <button
        onClick={onContinue}
        disabled={!valid}
        className="cta-btn w-full py-4 font-extrabold text-[15px] uppercase tracking-wide"
        style={{
          borderRadius: "6px",
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.5px",
          ...(valid
            ? { backgroundColor: "#004198", color: "#fff", cursor: "pointer" }
            : { backgroundColor: "#e5e7eb", color: "#9ca3af", cursor: "not-allowed" }),
        }}
      >
        Gerar Meu Plano Personalizado →
      </button>
    </div>
  )
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

const ANALYSIS = [
  "Capacidade de Expansão Tecidual",
  "Potencial de Crescimento Natural",
  "Índice de Fluxo Vascular",
  "Base de Força do Kegel",
  "Compatibilidade com o Protocolo",
]

function LoadingScreen({ progress, onDone }: { progress: number; onDone: () => void }) {
  const [slide, setSlide] = useState(0)
  const [fadeSlide, setFadeSlide] = useState(false)

  useEffect(() => {
    let inner: ReturnType<typeof setTimeout> | null = null
    const t = setInterval(() => {
      setFadeSlide(true)
      inner = setTimeout(() => {
        setSlide((s) => (s + 1) % SLIDES.length)
        setFadeSlide(false)
      }, 400)
    }, 3500)
    return () => {
      clearInterval(t)
      if (inner) clearTimeout(inner)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onDone, 700)
      return () => clearTimeout(t)
    }
  }, [progress, onDone])

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#003466", fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      <div className="max-w-md mx-auto px-4 pt-6 pb-10 space-y-4">
        <div className="bg-white p-6 animate-slide-up" style={{ borderRadius: "10px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
          <h2
            className="text-xl font-extrabold text-center mb-1"
            style={{ color: "#003466", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.5px" }}
          >
            Analisando o Seu Perfil
          </h2>
          <p className="text-center text-sm mb-5" style={{ color: "#5e7d9f" }}>
            Montando o seu protocolo personalizado…
          </p>

          <div
            className="relative h-64 overflow-hidden mb-6"
            style={{ borderRadius: "8px", backgroundColor: "#f3f4f6" }}
          >
            {SLIDES.map((s, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-500"
                style={{
                  opacity: i === slide ? (fadeSlide ? 0 : 1) : 0,
                  transform: i === slide ? (fadeSlide ? "scale(1.05)" : "scale(1)") : "scale(0.95)",
                }}
              >
                <img
                  src={s.src}
                  alt={s.label}
                  width={400}
                  height={256}
                  decoding="async"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-3"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}
                >
                  <p className="text-white text-sm font-bold text-center">{s.label}</p>
                </div>
              </div>
            ))}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === slide ? "#fff" : "rgba(255,255,255,0.4)",
                    transform: i === slide ? "scale(1.4)" : "scale(1)",
                    boxShadow: i === slide ? "0 0 8px rgba(255,255,255,0.6)" : "none",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {ANALYSIS.map((label, i) => {
              const thresh = i * 20
              const done = progress >= thresh + 20
              const active = !done && progress >= thresh
              const w = done ? 100 : active ? Math.round(((progress - thresh) / 20) * 100) : 0
              return (
                <div key={label} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-semibold" style={{ color: "#003466" }}>{label}</span>
                    <span
                      className="text-xs font-bold transition-all duration-300"
                      style={{ color: done ? "#36c57c" : active ? "#f59e0b" : "#d1d5db" }}
                    >
                      {done ? "✓ Pronto" : active ? "Analisando…" : "Aguardando"}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#f3f4f6" }}>
                    <div
                      className={`h-full rounded-full ${active ? "animate-progress-glow" : ""}`}
                      style={{
                        width: `${w}%`,
                        backgroundColor: done ? "#36c57c" : "#004198",
                        transition: "width 0.5s ease-out",
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <div
              className="text-6xl font-extrabold tabular-nums transition-all duration-300"
              style={{ color: "#003466", fontFamily: "'Montserrat', sans-serif" }}
            >
              {Math.round(progress)}%
            </div>
            <div className="text-sm mt-1" style={{ color: "#5e7d9f" }}>Análise em andamento</div>
            <div className="mt-4 h-2.5 rounded-full overflow-hidden mx-8" style={{ backgroundColor: "#e5e7eb" }}>
              <div
                className="h-full rounded-full transition-all duration-500 relative"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, #003466 0%, #003466 ${Math.max(0, 100 - (15 / progress * 100))}%, #36c57c 100%)`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs animate-slide-up" style={{ color: "#669ef3", animationDelay: "200ms" }}>
          <LockIcon className="w-3 h-3" />
          Seus dados são 100% privados e nunca compartilhados
        </div>
      </div>
    </div>
  )
}

// ─── Results Screen ───────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Carlos M.", location: "São Paulo", age: 34, gain: "+3,7cm",
    text: "Te parabenizo pelo que está oferecendo. Minha insegurança me deixava trancado em casa. Eu só saía pra ganhar dinheiro, que depois eu gastava com coisas que não funcionavam — pílulas, bombas e pesos. Colocar o seu método em prática foi como voltar à vida. Você explica tudo de forma simples e clara...",
    avatar: `${AVT_CDN}/t-carlos-MFpfh0uYLjKM4F1SPcbnuQKjCo44EA.png`,
  },
  {
    name: "Roberto K.", location: "Rio de Janeiro", age: 38, gain: "+3,7cm",
    text: "Sou muito grato a você. Mas minha esposa é ainda mais grata! Você salvou meu casamento. A mudança foi incrível, muito perceptível e mais rápida do que eu imaginava. De 15 para 18,7 centímetros, e a espessura de 11 para 12,8 centímetros. Minha esposa está tendo o melhor momento da vida dela. E graças a você, é comigo! Você me libertou de um problema enorme. Valeu mesmo, irmão!",
    avatar: `${AVT_CDN}/t-roberto-2Rp5y8EWVWsiZMO2qU5P11CwfCjyiI.png`,
  },
  {
    name: "Jorge F.", location: "Belo Horizonte", age: 42, gain: "+4,2cm",
    text: "Foram alguns meses difíceis. Minha esposa Paula me deixou depois de 7 anos de casamento. Eu não a culpo — já tínhamos passado mais de um ano sem uma relação íntima de verdade... Estar solteiro de novo com zero confiança estava me empurrando pra depressão. Tentei várias coisas por aí, mas só ganhei dor e dinheiro perdido. Um amigo me indicou o seu sistema e eu tive minhas dúvidas, mas sem nada a perder eu segui as suas instruções... Agora eu não só estou maior, como também mais firme e durando mais. Em 2 meses fiquei com 5 mulheres diferentes, e cada uma teve experiências explosivas! Aparentemente minha ex ficou sabendo e agora quer voltar...",
    avatar: `${AVT_CDN}/t-jorge-378PxPddkBoypl3foZkPdOHRRwiEqb.png`,
  },
]

function ResultsScreen({
  answers, onCTA,
}: {
  answers: Record<number, string>; height: number; onCTA: () => void
}) {
  const gain = calcGain(answers)
  const current = baseSize(answers)
  const target = +(current + gain).toFixed(1)
  const [secs, setSecs] = useState(14 * 60 + 59)
  const [spots, setSpots] = useState(3)

  const protocolName =
    answers[0]?.includes("51") ? "Protocolo Revitalizar" :
    answers[0]?.includes("36") ? "Protocolo Performance Máxima" :
    answers[0]?.includes("26") ? "Protocolo Crescimento Prime" :
    "Protocolo Crescimento Rápido"

  const ageLabel = answers[0]?.match(/\d+\s*[–-]\s*\d+/)?.[0] ?? "sua faixa etária"

  useEffect(() => {
    setSpots(Math.floor(Math.random() * 2) + 2)
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (spots < 1) return
    const t = setTimeout(() => { if (spots > 1) setSpots((s) => s - 1) }, 50000)
    return () => clearTimeout(t)
  }, [spots])

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: "#f0f4ff", fontFamily: "'Roboto', sans-serif" }}>
      <div className="text-white text-center py-2.5 px-4" style={{ backgroundColor: "#36c57c" }}>
        <p className="text-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Seu plano personalizado está pronto — {spots} vaga{spots !== 1 ? "s" : ""} restante{spots !== 1 ? "s" : ""} hoje
        </p>
      </div>

      <Header />

      <main className="max-w-md mx-auto px-4 pt-5 space-y-4">
        {/* Countdown */}
        <div
          className="p-4 flex items-center justify-between"
          style={{ backgroundColor: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "8px" }}
        >
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#d97706" }}>
              Reservado para você
            </div>
            <div className="text-sm font-medium" style={{ color: "#92400e" }}>Seu plano expira em</div>
          </div>
          <div
            className="text-3xl font-extrabold tabular-nums"
            style={{ color: "#b45309", fontFamily: "'Montserrat', sans-serif" }}
          >
            {fmt(secs)}
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white overflow-hidden" style={{ borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}>
          <div
            className="px-6 py-6 text-white text-center"
            style={{ background: "linear-gradient(135deg, #003466 0%, #004198 100%)" }}
          >
            <div
              className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1"
              style={{ color: "#669ef3" }}
            >
              Seu Plano Personalizado
            </div>
            <div
              className="text-[26px] font-extrabold"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.5px" }}
            >
              {protocolName}
            </div>
            <div className="text-sm mt-0.5" style={{ color: "#669ef3" }}>
              Protocolo Congolês + Treino de Kegel · Calibrado para {ageLabel}
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Big number */}
            <div
              className="p-5 text-center"
              style={{
                background: "linear-gradient(135deg, #f0f5ff, #e8eeff)",
                border: "1px solid #c7d2fe",
                borderRadius: "8px",
              }}
            >
              <div className="text-sm mb-1" style={{ color: "#5e7d9f" }}>Seu ganho projetado em 45 dias</div>
              <div
                className="text-7xl font-extrabold leading-none"
                style={{ color: "#003466", fontFamily: "'Montserrat', sans-serif" }}
              >
                +{ptNum(gain)}<span className="text-4xl">cm</span>
              </div>
              <div className="text-sm mt-1.5" style={{ color: "#5e7d9f" }}>
                Baseado na sua idade, perfil de saúde e linha base hormonal
              </div>
            </div>

            {/* Size visualiser */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#5e7d9f" }}>
                <span>Agora</span><span>Dia 45</span>
              </div>
              <div className="relative h-6 rounded-full overflow-hidden" style={{ backgroundColor: "#f3f4f6" }}>
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ width: `${(current / 22) * 100}%`, backgroundColor: "#bfdbfe" }}
                />
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ width: `${(target / 22) * 100}%`, background: "linear-gradient(to right, #003466, #025fde)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-extrabold">
                  {current}cm → {ptNum(target)}cm
                </div>
              </div>
            </div>

            {/* Timeline milestones */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { t: "Semana 2", v: `+${ptNum(gain * 0.28)}cm`, n: "Primeiras mudanças" },
                { t: "Dia 21", v: `+${ptNum(gain * 0.58)}cm`, n: "Crescimento visível" },
                { t: "Dia 45", v: `+${ptNum(gain)}cm`, n: "Resultado completo" },
              ].map((m) => (
                <div
                  key={m.t}
                  className="p-3 text-center"
                  style={{ backgroundColor: "#f8faff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#5e7d9f" }}>{m.t}</div>
                  <div
                    className="text-lg font-extrabold"
                    style={{ color: "#003466", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {m.v}
                  </div>
                  <div className="text-[10px]" style={{ color: "#5e7d9f" }}>{m.n}</div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-2.5 pt-1">
              {[
                "Aumente comprimento e espessura naturalmente — sem aparelhos",
                "Ereções mais fortes e duradouras",
                "Técnicas avançadas de Kegel para resistência e controle",
                "Primeiros resultados visíveis em 14 dias",
                "Mais confiança e desempenho na cama",
                "Sem pílulas, sem bombas, sem efeitos colaterais",
                "Discreto — tudo feito em casa",
              ].map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#dcfce7", color: "#235347" }}
                  >
                    <CheckIcon className="w-3 h-3" />
                  </div>
                  <span className="text-[14px] leading-snug" style={{ color: "#5e7d9f" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div
            className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-center mb-3"
            style={{ color: "#5e7d9f", fontFamily: "'Montserrat', sans-serif" }}
          >
            Resultados reais de homens no Brasil
          </div>
          <div className="space-y-3">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.name}
                className="bg-white p-4 animate-slide-up"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={t.avatar}
                    alt={`Foto de ${t.name}`}
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    style={{ border: "2px solid #e5e7eb" }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold" style={{ color: "#003466" }}>
                        {t.name}, {t.age}
                      </span>
                      <span
                        className="text-xs font-extrabold px-2 py-0.5"
                        style={{
                          color: "#235347",
                          backgroundColor: "#f0fdf4",
                          border: "1px solid #65bd8e",
                          borderRadius: "4px",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {t.gain} verificado
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="w-3.5 h-3.5 text-amber-400" />
                      ))}
                      <span className="text-xs ml-1" style={{ color: "#9ca3af" }}>{t.location}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#5e7d9f" }}>&ldquo;{t.text}&rdquo;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div
          className="p-5 flex items-center gap-4"
          style={{ backgroundColor: "#003466", borderRadius: "8px" }}
        >
          <span style={{ color: "#669ef3" }}><ShieldIcon className="w-12 h-12 flex-shrink-0" /></span>
          <div>
            <div
              className="text-white font-extrabold text-base"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.5px" }}
            >
              Garantia de 30 Dias com Devolução do Dinheiro
            </div>
            <div className="text-sm mt-0.5" style={{ color: "#669ef3" }}>
              Sem resultados em 30 dias? Reembolso total. Sem perguntas.
            </div>
          </div>
        </div>

        {/* CTA block */}
        <div className="space-y-3 pt-1">
          <button
            onClick={onCTA}
            className="cta-btn w-full text-white font-extrabold py-5 text-[15px] uppercase tracking-wide shadow-xl"
            style={{
              background: "linear-gradient(135deg, #36c57c, #2aaa68)",
              borderRadius: "6px",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            Quero Meu Plano Agora →
          </button>

          <div className="flex items-center justify-center gap-3 text-xs flex-wrap" style={{ color: "#5e7d9f" }}>
            <span className="flex items-center gap-1"><LockIcon className="w-3 h-3" /> Checkout seguro</span>
            <span>·</span><span>Cobrança discreta</span>
            <span>·</span><span>Acesso imediato</span>
            <span>·</span><span>Preço em Real</span>
          </div>

          <div
            className="p-3.5 text-center"
            style={{ backgroundColor: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "8px" }}
          >
            <p className="text-sm font-bold" style={{ color: "#b45309" }}>
              ⚡ {spots} vaga{spots !== 1 ? "s" : ""} restante{spots !== 1 ? "s" : ""} neste preço — expira em {fmt(secs)}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function BrasilQuiz() {
  useFbPixel()
  usePrefetchSlides()

  const [s, setS] = useState<State>({
    screen: "quiz",
    stepIndex: 0,
    answers: {},
    loadProgress: 0,
    height: 175,
    heightUnit: "cm",
    feetVal: 5,
    inchVal: 9,
  })

  const loadInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const set = useCallback(<K extends keyof State>(k: K, v: State[K]) =>
    setS((p) => ({ ...p, [k]: v })), [])

  const merge = useCallback((u: Partial<State>) =>
    setS((p) => ({ ...p, ...u })), [])

  const startLoad = useCallback(() => {
    if (loadInterval.current) clearInterval(loadInterval.current)
    let prog = 4
    merge({ screen: "loading", loadProgress: 4 })
    loadInterval.current = setInterval(() => {
      prog += 0.7
      if (prog >= 100) {
        if (loadInterval.current) clearInterval(loadInterval.current)
        merge({ loadProgress: 100 })
      } else {
        set("loadProgress", prog)
      }
    }, 220)
  }, [merge, set])

  useEffect(() => () => {
    if (loadInterval.current) clearInterval(loadInterval.current)
  }, [])

  const answer = useCallback((val: string) => {
    setS((prev) => {
      const answers = { ...prev.answers, [prev.stepIndex]: val }
      const next = prev.stepIndex + 1
      if (next >= STEPS.length) {
        setTimeout(startLoad, 0)
        return { ...prev, answers }
      }
      return { ...prev, answers, stepIndex: next }
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [startLoad])

  const back = useCallback(() => {
    setS((p) => p.stepIndex > 0 ? { ...p, stepIndex: p.stepIndex - 1 } : p)
  }, [])

  const nextStep = useCallback(() => {
    setS((prev) => {
      const next = prev.stepIndex + 1
      if (next >= STEPS.length) {
        setTimeout(startLoad, 0)
        return prev
      }
      return { ...prev, stepIndex: next }
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [startLoad])

  const updateFt = useCallback((v: number) => {
    setS((p) => ({ ...p, feetVal: v, height: Math.round((v * 12 + p.inchVal) * 2.54) }))
  }, [])

  const updateIn = useCallback((v: number) => {
    setS((p) => ({ ...p, inchVal: v, height: Math.round((p.feetVal * 12 + v) * 2.54) }))
  }, [])

  const updateUnit = useCallback((u: "cm" | "ft") => {
    merge({ heightUnit: u })
  }, [merge])

  // ─── Render ───────────────────────────────────────────────────────────────

  if (s.screen === "loading") {
    return (
      <>
        <ResourceHints />
        <GlobalStyles />
        <LoadingScreen progress={s.loadProgress} onDone={() => merge({ screen: "results" })} />
      </>
    )
  }

  if (s.screen === "results") {
    return (
      <>
        <ResourceHints />
        <GlobalStyles />
        <ResultsScreen
          answers={s.answers}
          height={s.height}
          onCTA={() => window.open("https://pay.wiapy.com/1kMSJdYl0", "_blank")}
        />
      </>
    )
  }

  const step = STEPS[s.stepIndex]
  const isHeight = step.kind === "h"
  const isInfo = step.kind === "info"
  const qNum = STEPS.slice(0, s.stepIndex + 1).filter((x) => x.kind === "q").length

  // Info screen with video
  if (isInfo) {
    return (
      <>
        <ResourceHints />
        <GlobalStyles />
        <div className="min-h-screen" style={{ backgroundColor: "#003466", fontFamily: "'Roboto', sans-serif" }}>
          <Header />
          <div className="max-w-md mx-auto">
            <ProgressBar step={qNum} />
            <div className="px-4 py-4 pb-8">
              <div
                key={s.stepIndex}
                className="bg-white p-6 animate-slide-up space-y-5"
                style={{ borderRadius: "10px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
              >
                <div
                  className="text-[10px] font-extrabold uppercase tracking-[0.22em] mb-1"
                  style={{ color: "#d1d5db", fontFamily: "'Montserrat', sans-serif" }}
                >
                  Você sabia?
                </div>
                <h2
                  className="text-xl sm:text-[22px] font-extrabold leading-tight"
                  style={{ color: "#003466", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.5px" }}
                >
                  {step.title}
                </h2>
                <div
                  className="w-full overflow-hidden"
                  style={{ borderRadius: "16px", border: "1px solid #e5e7eb", aspectRatio: "16 / 9", backgroundColor: "#f3f4f6" }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover block"
                  >
                    <source src={step.video} type="video/mp4" />
                  </video>
                </div>
                <div
                  className="p-4"
                  style={{ backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #f1f5f9" }}
                >
                  <p className="text-sm italic" style={{ color: "#64748b" }}>
                    &ldquo;{step.quote}&rdquo;
                  </p>
                </div>
                <button
                  onClick={nextStep}
                  className="cta-btn w-full py-4 font-extrabold text-[15px] uppercase tracking-wide flex items-center justify-center gap-2"
                  style={{
                    borderRadius: "6px",
                    fontFamily: "'Montserrat', sans-serif",
                    backgroundColor: "#004198",
                    color: "#fff",
                  }}
                >
                  Entendi! <span>→</span>
                </button>
                {s.stepIndex > 0 && (
                  <button
                    onClick={back}
                    className="text-sm flex items-center gap-1 transition-opacity hover:opacity-70"
                    style={{ color: "#5e7d9f" }}
                  >
                    ← Anterior
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <ResourceHints />
      <GlobalStyles />
      <div className="min-h-screen" style={{ backgroundColor: "#003466", fontFamily: "'Roboto', sans-serif" }}>
        <Header />

        <div className="max-w-md mx-auto">
          {!isHeight && <ProgressBar step={qNum} />}

          <div className="px-4 py-4 pb-8">
            <div
              key={s.stepIndex}
              className="bg-white p-6 animate-slide-up"
              style={{ borderRadius: "10px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
            >
              <div
                className="text-[10px] font-extrabold uppercase tracking-[0.22em] mb-3"
                style={{ color: "#d1d5db", fontFamily: "'Montserrat', sans-serif" }}
              >
                {isHeight ? "Seus Dados" : `Pergunta ${qNum} de ${TOTAL_Q}`}
              </div>

              <h2
                className="text-xl sm:text-[22px] font-extrabold leading-tight mb-1"
                style={{ color: "#003466", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.5px" }}
              >
                {step.q}
              </h2>
              <p className="text-sm mb-5" style={{ color: "#5e7d9f" }}>{step.hint}</p>

              {isHeight ? (
                <HeightStep
                  height={s.height} unit={s.heightUnit}
                  feetVal={s.feetVal} inchVal={s.inchVal}
                  onHeight={(v) => set("height", v)}
                  onUnit={updateUnit}
                  onFt={updateFt}
                  onIn={updateIn}
                  onContinue={startLoad}
                />
              ) : (
                <>
                  <div className="space-y-2.5">
                    {step.kind === "q" && step.opts.map((opt, idx) => (
                      <OptionBtn key={opt} value={opt} onSelect={answer} index={idx} />
                    ))}
                  </div>

                  {step.kind === "q" && step.note && (
                    <div
                      className="mt-5 p-4 flex gap-3 items-start"
                      style={{ backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #f1f5f9" }}
                    >
                      <div
                        className="p-1.5 flex-shrink-0"
                        style={{ backgroundColor: "#fff", color: "#025fde", borderRadius: "8px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
                      >
                        <LightbulbIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium leading-relaxed" style={{ color: "#64748b" }}>
                          {step.note}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {s.stepIndex > 0 && (
                <button
                  onClick={back}
                  className="mt-5 text-sm flex items-center gap-1 transition-opacity hover:opacity-70"
                  style={{ color: "#5e7d9f" }}
                >
                  ← Pergunta anterior
                </button>
              )}
            </div>
          </div>

          <div className="px-4 pb-8">
            <div
              className="p-3.5 flex items-center justify-center gap-2.5"
              style={{ backgroundColor: "#002855", borderRadius: "8px" }}
            >
              <span style={{ color: "#669ef3" }}><LockIcon className="w-4 h-4" /></span>
              <p className="text-xs font-semibold" style={{ color: "#669ef3" }}>
                Suas respostas são 100% privadas — nunca compartilhadas ou vendidas
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}