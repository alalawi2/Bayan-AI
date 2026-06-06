import { useEffect, useRef, useState, type CSSProperties } from 'react'

/* ── Data ── */

type Product = {
  name: string
  arabic?: string
  tag: string
  desc: string
  metrics: [string, string][]
  tech: string[]
  url: string
  accent: string
  logo?: string
  featured?: boolean
}

const products: Product[] = [
  {
    name: 'Bayan', arabic: 'بيان', tag: 'Adaptive Medical Education',
    desc: 'ML-driven board exam prep with spaced repetition, psychometric analysis, multi-model AI verification (Claude + GPT-4o + Gemini), virtual patients, and OSCE stations.',
    metrics: [['3,550+','Questions'],['11','Courses'],['192','Drugs'],['10+','Board Exams']],
    tech: ['Adaptive ML','Multi-model QA','Psychometrics','PubMed API'],
    url: 'https://www.bayan.edu.om', accent: '#7de2d1', logo: '/logos/bayan.png', featured: true,
  },
  {
    name: 'Medad', arabic: 'مداد', tag: 'Ambient Clinical Documentation',
    desc: 'On-premise AI that listens to Arabic doctor-patient conversations, generates structured SOAP notes with ICD-10 codes. Zero patient data leaves the hospital.',
    metrics: [['52','Annotators'],['5','Institutions'],['100%','On-Premise']],
    tech: ['Whisper ASR','Arabic NLP','SOAP Generation','ICD-10'],
    url: 'https://www.medad.om', accent: '#70b8ff',
  },
  {
    name: 'JournalReady', tag: 'AI Research Workflow',
    desc: 'Research lifecycle platform: study design through statistical analysis to manuscript formatting for 800+ journal styles.',
    metrics: [['23','AI Tools'],['6','Stages'],['800+','Journals']],
    tech: ['Biostatistics','Reference Validation','Journal Matching'],
    url: 'https://journal-ready.vercel.app', accent: '#b696ff',
  },
  {
    name: 'SmartRota', tag: 'Scheduling Optimization',
    desc: 'Constraint optimization for residency rotation scheduling across multiple hospital sites — weeks of planning reduced to minutes.',
    metrics: [['119','Residents'],['3','Hospitals'],['13','Blocks/yr']],
    tech: ['Constraint Solving','Curriculum Rules','Multi-site'],
    url: 'https://rota.medresearch-academy.om', accent: '#7ddf92',
  },
  {
    name: 'OHealth', tag: 'Health Intelligence',
    desc: 'Predictive analytics for hospital capacity, disease trends with climate correlation, and equity analysis across all 11 governorates.',
    metrics: [['98','Hospitals'],['9,706','Beds'],['27','Diseases']],
    tech: ['Forecasting','Climate Analysis','Open Data'],
    url: 'https://ohealth.medresearch-academy.om', accent: '#48d2bd',
  },
  {
    name: 'OLearn', tag: 'Education Intelligence',
    desc: 'Education planning platform: enrollment trends, school mapping, workforce Omanization, and research output benchmarking.',
    metrics: [['1,270','Schools'],['26yr','Data Span'],['11','Governorates']],
    tech: ['Geospatial','Trend Modelling','Open Data'],
    url: 'https://olearn-sandy.vercel.app', accent: '#9cb0ff',
  },
]

const omanPolygons: [number, number][][] = [
  [[55.208341,22.70833],[55.234489,23.110993],[55.525841,23.524869],[55.528632,23.933604],[55.981214,24.130543],[55.804119,24.269604],[55.886233,24.920831],[56.396847,24.924732],[56.84514,24.241673],[57.403453,23.878594],[58.136948,23.747931],[58.729211,23.565668],[59.180502,22.992395],[59.450098,22.660271],[59.80806,22.533612],[59.806148,22.310525],[59.442191,21.714541],[59.282408,21.433886],[58.861141,21.114035],[58.487986,20.428986],[58.034318,20.481437],[57.826373,20.243002],[57.665762,19.736005],[57.7887,19.06757],[57.694391,18.94471],[57.234264,18.947991],[56.609651,18.574267],[56.512189,18.087113],[56.283521,17.876067],[55.661492,17.884128],[55.269939,17.632309],[55.2749,17.228354],[54.791002,16.950697],[54.239253,17.044981],[53.570508,16.707663],[53.108573,16.651051],[52.782184,17.349742],[52.00001,19.000003],[54.999982,19.999994],[55.666659,22.000001],[55.208341,22.70833]],
  [[56.261042,25.714606],[56.070821,26.055464],[56.362017,26.395934],[56.485679,26.309118],[56.391421,25.895991],[56.261042,25.714606]],
]

const awards = [
  ['2026','Ejada Institutional Innovation Award — Bayan Platform'],
  ['2025','Best Paper — Delirium Prediction via Machine Learning'],
  ['2024','National Research Award — Best Published Health Research'],
  ['2023','National Research Award — Best Published Health Research'],
]

/* ── Neural Network Canvas ── */
function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let id: number
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = []

    function resize() { canvas!.width = window.innerWidth; canvas!.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.min(60, Math.floor(window.innerWidth / 22))
    for (let i = 0; i < count; i++) {
      nodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.5 })
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx!.beginPath(); ctx!.moveTo(nodes[i].x, nodes[i].y); ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.strokeStyle = `rgba(125, 226, 209, ${(1 - dist / 140) * 0.12})`
            ctx!.lineWidth = 0.5; ctx!.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx!.beginPath(); ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(125, 226, 209, 0.35)'; ctx!.fill()
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas!.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas!.height) n.vy *= -1
      }
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="neural-canvas" />
}

/* ── Typing Effect ── */
function TypedText({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const word = words[idx]
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 2200)
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length === 0) { setDel(false); setIdx(i => (i + 1) % words.length) }
      }
    }, del ? 35 : 70)
    return () => clearTimeout(t)
  }, [text, del, idx, words])

  return <span className="typed">{text}<span className="cursor">|</span></span>
}

/* ── Brand Mark (from Codex) ── */
function BrandMark({ compact }: { compact?: boolean }) {
  return (
    <svg className={compact ? 'brand-mark compact' : 'brand-mark'} viewBox="0 0 72 72">
      <defs>
        <linearGradient id="bs" x1="8" y1="8" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16324b" /><stop offset="1" stopColor="#0b1c2d" />
        </linearGradient>
        <linearGradient id="bl" x1="20" y1="18" x2="56" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d8fff9" /><stop offset="1" stopColor="#7de2d1" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="60" height="60" rx="20" fill="url(#bs)" />
      <rect x="6.5" y="6.5" width="59" height="59" rx="19.5" stroke="rgba(255,255,255,0.08)" />
      <path d="M24 18H39.5C47.1 18 51.5 22.1 51.5 28C51.5 33.7 47.1 36 40 36H24" fill="none" stroke="url(#bl)" strokeLinecap="round" strokeWidth="4" />
      <path d="M24 36H40.5C48.2 36 52.7 40.1 52.7 46.2C52.7 52.2 48.1 54 39 54H24" fill="none" stroke="url(#bl)" strokeLinecap="round" strokeWidth="4" />
      <path d="M24 18V54" fill="none" stroke="url(#bl)" strokeLinecap="round" strokeWidth="4" />
      <circle cx="51.5" cy="28" r="4.8" fill="#f4b866" />
      <circle cx="52.7" cy="46.2" r="4.8" fill="#7de2d1" />
    </svg>
  )
}

/* ── Oman Map (from Codex — real coordinates) ── */
function OmanMap() {
  const minLon = 52, maxLon = 59.81, minLat = 16.65, maxLat = 26.4
  const w = 400, h = 480, px = 40, py = 30
  const proj = (lon: number, lat: number) => ({
    x: px + ((lon - minLon) / (maxLon - minLon)) * (w - px * 2),
    y: h - py - ((lat - minLat) / (maxLat - minLat)) * (h - py * 2),
  })
  const toPath = (poly: [number, number][]) =>
    poly.map(([lon, lat], i) => { const p = proj(lon, lat); return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}` }).join(' ') + ' Z'

  const muscat = proj(58.41, 23.59)

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="oman-svg">
      <defs>
        <linearGradient id="of" x1="100" y1="100" x2="300" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#86ecdb" /><stop offset="1" stopColor="#327f93" />
        </linearGradient>
        <filter id="os"><feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#020810" floodOpacity="0.3" /></filter>
      </defs>
      {omanPolygons.map((poly, i) => (
        <path key={i} d={toPath(poly)} fill="url(#of)" stroke="rgba(245,248,251,0.6)" strokeWidth="2" filter="url(#os)" />
      ))}
      {/* Muscat marker */}
      <circle cx={muscat.x} cy={muscat.y} r="8" fill="rgba(244,184,102,0.2)">
        <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx={muscat.x} cy={muscat.y} r="5" fill="#f4b866" stroke="white" strokeWidth="2" />
      <text x={muscat.x + 14} y={muscat.y + 5} fill="var(--heading)" fontSize="14" fontWeight="700" fontFamily="var(--font-display)">Muscat</text>
      <text x={muscat.x + 14} y={muscat.y + 22} fill="var(--text-muted)" fontSize="13" fontFamily="var(--font-ar)">مسقط</text>
      {/* Title */}
      <text x="20" y="36" fill="var(--heading)" fontSize="15" fontWeight="700" fontFamily="var(--font-display)">Sultanate of Oman</text>
      <text x="20" y="56" fill="var(--text-muted)" fontSize="16" fontFamily="var(--font-ar)">سلطنة عُمان</text>
    </svg>
  )
}

/* ── App ── */
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    fn(); window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* ── Nav ── */}
      <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-row">
          <a href="#top" className="brand-lockup">
            <BrandMark compact />
            <div className="brand-copy">
              <span className="brand-title">Bayan AI Technologies</span>
              <span className="brand-sub">Healthcare AI from Oman</span>
            </div>
          </a>
          <nav className="nav-links">
            <a href="#products">Products</a>
            <a href="#oman">Oman</a>
            <a href="#founder">Founder</a>
            <a href="#contact" className="nav-cta">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="hero" id="top">
          <NeuralCanvas />
          <div className="hero-orb orb-1"></div>
          <div className="hero-orb orb-2"></div>
          <div className="container hero-inner">
            <p className="eyebrow">AI Infrastructure for Healthcare</p>
            <h1 className="hero-title">
              AI That Transforms<br />
              <TypedText words={['Patient Care', 'Medical Education', 'Clinical Training', 'Health Systems', 'Medical Research']} />
            </h1>
            <p className="hero-body">
              Six live platforms born in Oman, built to compete globally — from
              adaptive learning to ambient documentation to predictive health
              intelligence.
            </p>
            <div className="hero-actions">
              <a href="#products" className="btn btn-primary">Explore Platforms</a>
              <a href="#founder" className="btn btn-ghost">Meet the Founder</a>
            </div>
            <div className="hero-metrics">
              {[['6','Live Platforms'],['3,550+','Clinical Questions'],['88','Publications'],['10+','Countries']].map(([v, l]) => (
                <div key={l} className="metric">
                  <span className="metric-val">{v}</span>
                  <span className="metric-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="scan-line"></div>
        </section>

        {/* ── Pipeline ── */}
        <section className="pipeline">
          <div className="container">
            <div className="pipe-track">
              {[
                { n: '01', label: 'Learn', product: 'Bayan', c: '#7de2d1' },
                { n: '02', label: 'Document', product: 'Medad', c: '#70b8ff' },
                { n: '03', label: 'Research', product: 'JournalReady', c: '#b696ff' },
                { n: '04', label: 'Schedule', product: 'SmartRota', c: '#7ddf92' },
                { n: '05', label: 'Analyze', product: 'OHealth', c: '#48d2bd' },
                { n: '06', label: 'Plan', product: 'OLearn', c: '#9cb0ff' },
              ].map((s, i) => (
                <div key={s.n} className="pipe-step">
                  <div className="pipe-node" style={{ '--nc': s.c } as CSSProperties}>{s.n}</div>
                  <div className="pipe-label">{s.label}</div>
                  <div className="pipe-product">{s.product}</div>
                  {i < 5 && <div className="pipe-line"></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Products ── */}
        <section className="section" id="products">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Product Portfolio</p>
              <h2>Six Platforms. One Mission.</h2>
            </div>
            <div className="product-grid">
              {products.map(p => (
                <article key={p.name} className={`product-card ${p.featured ? 'featured' : ''}`} style={{ '--ca': p.accent } as CSSProperties}>
                  <div className="product-top">
                    {p.logo
                      ? <div className="product-mark has-img"><img src={p.logo} alt={p.name} /></div>
                      : <div className="product-mark">{p.name[0]}</div>
                    }
                    <div>
                      <h3>{p.name} {p.arabic && <span className="ar">{p.arabic}</span>}</h3>
                      <p className="product-tag">{p.tag}</p>
                    </div>
                    <span className="live-pill"><span className="live-dot"></span>Live</span>
                  </div>
                  <p className="product-desc">{p.desc}</p>
                  <div className="product-nums">
                    {p.metrics.map(([v, l]) => (
                      <div key={l}><strong>{v}</strong><span>{l}</span></div>
                    ))}
                  </div>
                  <div className="tech-row">
                    {p.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
                  </div>
                  <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">Visit {p.name}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Oman + Vision 2040 (combined) ── */}
        <section className="section section-alt" id="oman">
          <div className="container oman-layout">
            <div className="oman-text">
              <p className="eyebrow">Built in Oman</p>
              <h2>Born in Muscat.<br />Built for the World.</h2>
              <p className="muted">
                Designed and engineered in Oman, serving healthcare professionals
                across the Middle East, South Asia, Europe, and North America.
                Aligned with Oman Vision 2040 — a knowledge economy built on
                technology, not just resources.
              </p>
              <div className="market-tags">
                {['Oman','Saudi Arabia','UAE','Qatar','Kuwait','Bahrain','Egypt','India','Pakistan','UK','USA','Australia'].map(c => (
                  <span key={c} className="market-tag">{c}</span>
                ))}
              </div>
              <div className="vision-cards">
                {[
                  ['Health','Bayan + Medad improve how doctors learn and document — reducing errors, improving care.'],
                  ['Economy','Exporting Omani-built AI to 10+ countries, generating international revenue.'],
                  ['Data','OHealth turns national open data into actionable intelligence for health planning.'],
                  ['Education','JournalReady + OLearn accelerate research output and education planning.'],
                ].map(([pillar, body]) => (
                  <div key={pillar} className="vision-card">
                    <span className="vision-pillar">{pillar}</span>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="oman-map-wrap">
              <OmanMap />
            </div>
          </div>
        </section>

        {/* ── Founder ── */}
        <section className="section" id="founder">
          <div className="container founder-layout">
            <div className="founder-photo-col">
              <div className="founder-photo-frame">
                <img src="/dr-alawi.jpg" alt="Dr. Abdullah M. Al Alawi" />
              </div>
              <div className="founder-id">
                <h3>Dr. Abdullah M. Al Alawi</h3>
                <p className="founder-creds">B.Sc., MD, M.Sc., M.Sc., FRACP, FACP</p>
                <p className="founder-role">Founder & CEO</p>
              </div>
            </div>
            <div className="founder-info">
              <p className="eyebrow">Leadership</p>
              <h2>A Physician Who Builds Products</h2>
              <p className="muted">
                Dual fellowships (FRACP + FACP), two Master's degrees in
                clinical epidemiology and health research (both from Australia),
                member of the American College of AI and Medicine. 88
                publications, h-index 18, and over 104,700 OMR in competitive
                research grants — combining clinical depth with AI/ML expertise
                to build products that solve real problems.
              </p>
              <div className="founder-stats">
                {[['88','Publications'],['1,777+','Citations'],['h-18','H-Index'],['104K+','OMR Grants']].map(([v, l]) => (
                  <div key={l} className="f-stat"><strong>{v}</strong><span>{l}</span></div>
                ))}
              </div>
              <div className="founder-section">
                <h4>Selected Awards</h4>
                {awards.map(([yr, aw]) => (
                  <div key={aw} className="award-row"><span className="award-yr">{yr}</span><span>{aw}</span></div>
                ))}
              </div>
              <div className="founder-section">
                <h4>Credentials</h4>
                <div className="cred-list">
                  {[
                    'Fellow, Royal Australasian College of Physicians (FRACP)',
                    'Fellow, American College of Physicians (FACP)',
                    'Member, American College of AI and Medicine (ACAIM)',
                    'M.Sc. Health Research — Charles Darwin University (2026)',
                    'M.Sc. Clinical Epidemiology with Distinction — Newcastle, Australia',
                    'MD with Distinction — Sultan Qaboos University',
                  ].map(c => <div key={c} className="cred-item"><span className="check">&#10003;</span>{c}</div>)}
                </div>
              </div>
              <div className="founder-links">
                {[
                  ['PubMed','https://pubmed.ncbi.nlm.nih.gov/?term=Al+Alawi+AM'],
                  ['ORCID','https://orcid.org/0000-0003-2077-7186'],
                  ['ResearchGate','https://www.researchgate.net/profile/Abdullah-Al-Alawi-4'],
                  ['LinkedIn','https://www.linkedin.com/in/abdullah-al-alawi-4'],
                ].map(([label, url]) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">{label}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="section section-alt" id="contact">
          <div className="container">
            <div className="contact-card">
              <p className="eyebrow">Contact</p>
              <h2>Partner With Us</h2>
              <p className="muted">Investors, institutions, and collaborators — let's build the future of healthcare AI together.</p>
              <div className="contact-row">
                <a href="mailto:dr.abdullahalalawi@gmail.com" className="contact-item">
                  <span className="contact-label">Email</span>
                  <span>dr.abdullahalalawi@gmail.com</span>
                </a>
                <div className="contact-item">
                  <span className="contact-label">Location</span>
                  <span>Muscat, Sultanate of Oman</span>
                </div>
              </div>
              <div className="contact-social">
                {[['LinkedIn','https://www.linkedin.com/in/abdullah-al-alawi-4'],['X','https://x.com/Medresearch_om'],['ResearchGate','https://www.researchgate.net/profile/Abdullah-Al-Alawi-4']].map(([l, u]) => (
                  <a key={l} href={u} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">{l}</a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="container footer-row">
          <div className="brand-lockup">
            <BrandMark compact />
            <div className="brand-copy">
              <span className="brand-title">Bayan AI Technologies LLC</span>
              <span className="brand-sub">Healthcare AI from Oman</span>
            </div>
          </div>
          <p className="footer-copy">&copy; 2026 Bayan AI Technologies LLC &middot; Muscat, Sultanate of Oman</p>
        </div>
      </footer>
    </>
  )
}
