import { useEffect, useRef, useState } from 'react'

/* ── Animated counter hook ── */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const step = target / (duration / 16)
          const timer = setInterval(() => {
            start += step
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])
  return { count, ref }
}

function Counter({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const { count, ref } = useCounter(target)
  return (
    <div ref={ref} className="hero-stat">
      <div className="hero-stat-num">{count.toLocaleString()}{suffix}</div>
      <div className="hero-stat-label">{label}</div>
    </div>
  )
}

/* ── Neural network canvas ── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = []

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create nodes
    const count = Math.min(80, Math.floor(window.innerWidth / 18))
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      })
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            const alpha = (1 - dist / 160) * 0.15
            ctx!.strokeStyle = `rgba(200, 151, 42, ${alpha})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }
      // Draw nodes
      for (const n of nodes) {
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(200, 151, 42, 0.5)'
        ctx!.fill()
        // Move
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas!.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas!.height) n.vy *= -1
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={canvasRef} className="neural-canvas" />
}

/* ── Typing effect ── */
function TypingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, text.length + 1))
          if (text.length + 1 === word.length) {
            setTimeout(() => setDeleting(true), 2000)
          }
        } else {
          setText(word.slice(0, text.length - 1))
          if (text.length === 0) {
            setDeleting(false)
            setIndex((i) => (i + 1) % words.length)
          }
        }
      },
      deleting ? 40 : 80,
    )
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return (
    <span className="typing-text">
      {text}
      <span className="typing-cursor">|</span>
    </span>
  )
}

/* ── Oman-centered radial map ── */
function OmanGlobe() {
  const cx = 200, cy = 200
  const countries = [
    { name: 'Saudi Arabia', angle: -30, dist: 60 },
    { name: 'UAE', angle: -60, dist: 55 },
    { name: 'Qatar', angle: -10, dist: 70 },
    { name: 'Kuwait', angle: 10, dist: 85 },
    { name: 'Bahrain', angle: -45, dist: 65 },
    { name: 'Egypt', angle: 30, dist: 110 },
    { name: 'India', angle: -100, dist: 100 },
    { name: 'Pakistan', angle: -80, dist: 105 },
    { name: 'UK', angle: 60, dist: 150 },
    { name: 'USA', angle: 100, dist: 165 },
    { name: 'Australia', angle: -140, dist: 160 },
    { name: 'Canada', angle: 80, dist: 170 },
  ]

  const points = countries.map(c => {
    const rad = (c.angle * Math.PI) / 180
    return {
      ...c,
      x: cx + Math.cos(rad) * c.dist,
      y: cy - Math.sin(rad) * c.dist,
    }
  })

  return (
    <div className="globe-container">
      <svg viewBox="0 0 400 400" className="globe-svg">
        {/* Concentric rings */}
        {[60, 100, 140, 175].map((r, i) => (
          <circle key={r} cx={cx} cy={cy} r={r} className={`globe-ring ring-${i}`} />
        ))}

        {/* Connection lines with gradient */}
        {points.map((p) => (
          <line key={p.name} x1={cx} y1={cy} x2={p.x} y2={p.y} className="globe-line" />
        ))}

        {/* Country nodes */}
        {points.map((p, i) => (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r="4" className="globe-dot" />
            <text
              x={p.x}
              y={p.y - 8}
              className="globe-label"
            >
              {p.name}
            </text>
            {/* Animated pulse on some */}
            {i < 6 && (
              <circle cx={p.x} cy={p.y} r="4" className="globe-dot-pulse">
                <animate attributeName="r" values="4;8;4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}

        {/* Data packets */}
        {points.slice(0, 8).map((p, i) => (
          <circle key={`pkt-${i}`} r="2.5" className="data-packet">
            <animateMotion
              dur={`${2.5 + i * 0.4}s`}
              repeatCount="indefinite"
              path={`M${cx},${cy} L${p.x},${p.y}`}
            />
          </circle>
        ))}

        {/* Oman center */}
        <circle cx={cx} cy={cy} r="18" className="globe-oman-glow">
          <animate attributeName="r" values="18;24;18" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r="14" className="globe-oman" />
        <text x={cx} y={cy - 2} className="globe-oman-label" dominantBaseline="middle" textAnchor="middle">
          OMAN
        </text>
        <text x={cx} y={cy + 10} className="globe-oman-sub" dominantBaseline="middle" textAnchor="middle">
          عُمان
        </text>
      </svg>
    </div>
  )
}

/* ── Hexagonal grid background ── */
function HexGrid() {
  return (
    <div className="hex-grid">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="hex-cell"
          style={{
            animationDelay: `${i * 0.15}s`,
            left: `${(i % 6) * 18 - 5}%`,
            top: `${Math.floor(i / 6) * 28 - 5}%`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Main App ── */
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      {/* ── Nav ── */}
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <div className="nav-inner">
          <a href="#" className="nav-brand">
            <div className="brand-icon">
              <div className="brand-icon-inner">B</div>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-text">Bayan AI</span>
              <span className="brand-sub">Technologies</span>
            </div>
          </a>
          <div className="nav-links">
            <a href="#products">Products</a>
            <a href="#founder">Founder</a>
            <a href="#vision">Vision 2040</a>
            <a href="#contact" className="nav-cta">Get in Touch</a>
            <button
              className="theme-toggle"
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '\u2600' : '\u263D'}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <NeuralCanvas />
        <div className="hero-gradient-orb hero-orb-1"></div>
        <div className="hero-gradient-orb hero-orb-2"></div>
        <div className="hero-gradient-orb hero-orb-3"></div>
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Muscat, Sultanate of Oman
          </div>
          <h1>
            AI That Transforms
            <br />
            <TypingText
              words={['Patient Care', 'Medical Education', 'Clinical Training', 'Health Systems', 'Medical Research']}
            />
          </h1>
          <p className="hero-sub">
            World-class AI platforms born in Oman, built to compete globally.
            From adaptive learning to ambient clinical documentation to
            predictive analytics — six live products improving how doctors
            learn, train, and deliver care.
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn-accent btn-lg btn-glow">
              Explore Our Products
            </a>
            <a href="#founder" className="btn btn-ghost btn-lg">
              Meet the Founder
            </a>
          </div>

          <div className="hero-stats-row">
            <Counter target={6} label="Live AI Platforms" />
            <Counter target={3550} suffix="+" label="Clinical Questions" />
            <Counter target={88} label="Research Publications" />
            <Counter target={10} suffix="+" label="Countries Served" />
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ── AI Pipeline Visual ── */}
      <section className="pipeline-section">
        <div className="container">
          <div className="pipeline">
            {[
              { icon: '01', label: 'Learn', product: 'Bayan', color: '#c8972a' },
              { icon: '02', label: 'Document', product: 'Medad', color: '#3b82f6' },
              { icon: '03', label: 'Research', product: 'JournalReady', color: '#8b5cf6' },
              { icon: '04', label: 'Schedule', product: 'SmartRota', color: '#22c55e' },
              { icon: '05', label: 'Analyze', product: 'OHealth', color: '#14b8a6' },
              { icon: '06', label: 'Educate', product: 'OLearn', color: '#6366f1' },
            ].map((step, i) => (
              <div key={step.label} className="pipeline-step">
                <div
                  className="pipeline-node"
                  style={{ '--node-color': step.color } as React.CSSProperties}
                >
                  <span className="pipeline-num">{step.icon}</span>
                </div>
                <div className="pipeline-label">{step.label}</div>
                <div className="pipeline-product">{step.product}</div>
                {i < 5 && <div className="pipeline-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Product Portfolio</div>
            <h2>Six Platforms. One Mission.</h2>
            <p>
              Omani-engineered AI platforms competing on a global stage —
              each solving a real problem in patient care, medical education,
              clinical training, and health systems.
            </p>
          </div>

          <div className="products-grid">
            {/* Bayan */}
            <div className="product-card product-card--featured">
              <div className="product-card-glow"></div>
              <div className="product-card-inner">
                <div className="product-card-top">
                  <img src="/logos/bayan.png" alt="Bayan" className="product-logo" />
                  <div>
                    <h3>Bayan <span className="ar-text">بيان</span></h3>
                    <span className="product-tag">Flagship &middot; Revenue</span>
                  </div>
                  <span className="product-status product-status--live">
                    <span className="pulse-dot"></span>Live
                  </span>
                </div>
                <p className="product-desc">
                  Machine learning-driven adaptive medical education. The
                  platform uses spaced repetition algorithms, psychometric
                  analysis, and multi-model AI verification (Claude + GPT-4o +
                  Gemini) to deliver personalized board exam preparation.
                  3,550+ physician-reviewed vignettes, 11 courses, 192 drug
                  monographs, virtual patients, and OSCE stations — serving
                  residents and nurses across 10+ countries for OMSB, Arab
                  Board, MRCP, ABIM, USMLE, NCLEX-RN, and more.
                </p>
                <div className="product-metrics">
                  {[
                    ['3,550+', 'Questions'],
                    ['11', 'Courses'],
                    ['192', 'Drug Monographs'],
                    ['10+', 'Board Exams'],
                    ['$9.99', '/month'],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <strong>{n}</strong>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
                <div className="product-preview">
                  <img src="/screenshots/bayan-preview.png" alt="Bayan Platform" className="product-preview-img" />
                </div>
                <div className="product-tech-stack">
                  {['Claude AI', 'GPT-4o', 'Gemini', 'PubMed API', 'Spaced Repetition', 'Psychometrics'].map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
                <div className="product-links">
                  <a
                    href="https://www.bayan.edu.om"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent"
                  >
                    Visit bayan.edu.om
                  </a>
                </div>
              </div>
            </div>

            {/* Medad */}
            <div className="product-card">
              <div className="product-card-inner">
                <div className="product-card-top">
                  <div className="product-icon product-icon--medad">
                    <span style={{ fontFamily: 'serif' }}>م</span>
                  </div>
                  <div>
                    <h3>Medad <span className="ar-text">مداد</span></h3>
                    <span className="product-tag product-tag--green">Grant-Funded</span>
                  </div>
                  <span className="product-status product-status--live">
                    <span className="pulse-dot"></span>Live
                  </span>
                </div>
                <p className="product-desc">
                  Ambient AI clinical documentation. Fine-tuned speech
                  recognition (Whisper) captures doctor-patient conversations,
                  NLP pipeline extracts clinical entities, and a medical
                  language model generates structured SOAP notes with ICD-10
                  codes. 100% on-premise deployment — zero patient data leaves
                  the hospital.
                </p>
                <div className="product-metrics">
                  {[
                    ['52', 'Annotators'],
                    ['5', 'Institutions'],
                    ['100%', 'On-Premise'],
                    ['25.5K', 'OMR Funded'],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <strong>{n}</strong>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
                <div className="product-tech-stack">
                  {['Whisper ASR', 'NLP Pipeline', 'ICD-10 Coding', 'On-Premise'].map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
                <div className="product-links">
                  <a href="https://www.medad.om" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    Visit medad.om
                  </a>
                </div>
              </div>
            </div>

            {/* JournalReady */}
            <div className="product-card">
              <div className="product-card-inner">
                <div className="product-card-top">
                  <div className="product-icon product-icon--jr">J</div>
                  <div>
                    <h3>JournalReady</h3>
                  </div>
                  <span className="product-status product-status--live">
                    <span className="pulse-dot"></span>Live
                  </span>
                </div>
                <p className="product-desc">
                  ML-assisted research lifecycle platform. 23 tools including
                  AI-powered statistical analysis (t-test through survival
                  analysis), automated reference verification via CrossRef,
                  intelligent journal matching by study design and quality
                  tier, and manuscript formatting for 800+ journal styles.
                </p>
                <div className="product-metrics">
                  {[
                    ['23', 'AI Tools'],
                    ['6', 'Stages'],
                    ['800+', 'Journals'],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <strong>{n}</strong>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
                <div className="product-links">
                  <a href="https://journal-ready.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Visit JournalReady</a>
                </div>
              </div>
            </div>

            {/* SmartRota */}
            <div className="product-card">
              <div className="product-card-inner">
                <div className="product-card-top">
                  <div className="product-icon product-icon--rota">S</div>
                  <div>
                    <h3>SmartRota</h3>
                  </div>
                  <span className="product-status product-status--live">
                    <span className="pulse-dot"></span>Live
                  </span>
                </div>
                <p className="product-desc">
                  Constraint optimization engine for medical training
                  schedules. Uses algorithmic scheduling to generate equitable,
                  curriculum-compliant rotation plans across multiple hospital
                  sites — reducing weeks of manual planning to minutes.
                </p>
                <div className="product-metrics">
                  {[
                    ['119', 'Residents'],
                    ['3', 'Hospitals'],
                    ['13', 'Blocks/Year'],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <strong>{n}</strong>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
                <div className="product-links">
                  <a href="https://rota.medresearch-academy.om" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Visit SmartRota</a>
                </div>
              </div>
            </div>

            {/* OHealth */}
            <div className="product-card">
              <div className="product-card-inner">
                <div className="product-card-top">
                  <div className="product-icon product-icon--ohealth">O</div>
                  <div>
                    <h3>OHealth</h3>
                    <span className="product-tag product-tag--teal">Health Intelligence</span>
                  </div>
                  <span className="product-status product-status--live">
                    <span className="pulse-dot"></span>Live
                  </span>
                </div>
                <p className="product-desc">
                  Predictive health intelligence platform. Machine learning
                  models for hospital capacity forecasting, disease trend
                  prediction with climate correlation, and equity gap analysis
                  — all built on national open data across 11 governorates.
                </p>
                <div className="product-metrics">
                  {[
                    ['98', 'Hospitals'],
                    ['9,706', 'Beds'],
                    ['27', 'Diseases'],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <strong>{n}</strong>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
                <div className="product-links">
                  <a href="https://ohealth.medresearch-academy.om" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Visit OHealth</a>
                </div>
              </div>
            </div>

            {/* OLearn */}
            <div className="product-card">
              <div className="product-card-inner">
                <div className="product-card-top">
                  <div className="product-icon product-icon--olearn">O</div>
                  <div>
                    <h3>OLearn</h3>
                    <span className="product-tag product-tag--indigo">Education Intelligence</span>
                  </div>
                  <span className="product-status product-status--live">
                    <span className="pulse-dot"></span>Live
                  </span>
                </div>
                <p className="product-desc">
                  Data analytics platform for education planning. Enrollment
                  trend analysis, school geospatial mapping, workforce
                  Omanization tracking, and research output benchmarking —
                  built on national open data from opendata.gov.om.
                </p>
                <div className="product-metrics">
                  {[
                    ['1,270', 'Schools'],
                    ['26yr', 'Data Span'],
                    ['11', 'Governorates'],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <strong>{n}</strong>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
                <div className="product-links">
                  <a href="https://olearn-sandy.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Visit OLearn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community Arm ── */}
      <section className="section section--muted">
        <div className="container">
          <div className="community-banner">
            <div className="community-icon">&#9825;</div>
            <div className="community-content">
              <div className="section-badge section-badge--warm">Community Service &middot; Non-Profit</div>
              <h2>MedResearch Academy</h2>
              <p>
                Our non-profit arm provides free research training, lectures,
                mentorship, and workshops to healthcare professionals across
                Oman and the GCC. 62+ students supervised, 200+ workshops delivered,
                and a growing community of physician-researchers.
              </p>
              <a href="https://www.medresearch-academy.om" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Visit MedResearch Academy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section id="founder" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Leadership</div>
            <h2>Built by a Physician Who Codes</h2>
            <p>Not just ideas — six production platforms, 88 publications, and the clinical domain expertise to know what actually matters for patient care.</p>
          </div>

          <div className="founder-layout">
            <div className="founder-photo-wrap">
              <div className="founder-photo-frame">
                <img
                  src="/dr-alawi.jpg"
                  alt="Dr. Abdullah M. Al Alawi"
                  className="founder-photo"
                />
                <div className="founder-photo-border"></div>
              </div>
              <div className="founder-name-card">
                <h3>Dr. Abdullah M. Al Alawi</h3>
                <p className="founder-creds">B.Sc., MD, M.Sc., M.Sc., FRACP, FACP</p>
                <p className="founder-role">Founder &amp; CEO</p>
              </div>
            </div>

            <div className="founder-info">
              <p className="founder-bio">
                A physician-innovator who bridges medicine and technology. Dual
                fellowships from the Royal Australasian College of Physicians and
                the American College of Physicians, two Master's degrees
                (Clinical Epidemiology with Distinction from the University of
                Newcastle; Health Research from Charles Darwin University — both
                in Australia), and membership in the American College of
                Artificial Intelligence and Medicine. With 88 peer-reviewed
                publications, an h-index of 18, and over 104,700 OMR in
                competitive research grants, he combines deep clinical insight
                with AI/ML expertise to build products that solve real problems
                in healthcare.
              </p>

              <div className="founder-stats">
                {[
                  ['88', 'Publications'],
                  ['1,777+', 'Citations'],
                  ['h-18', 'H-Index'],
                  ['104K+', 'OMR Grants'],
                  ['62+', 'Supervised'],
                  ['6', 'AI Platforms'],
                ].map(([n, l]) => (
                  <div key={l} className="founder-stat">
                    <div className="founder-stat-num">{n}</div>
                    <div className="founder-stat-label">{l}</div>
                  </div>
                ))}
              </div>

              <div className="founder-section">
                <h4>Credentials &amp; Fellowships</h4>
                <div className="creds-grid">
                  {[
                    'Fellow, Royal Australasian College of Physicians (FRACP)',
                    'Fellow, American College of Physicians (FACP)',
                    'Member, American College of AI and Medicine (ACAIM)',
                    'M.Sc. Health Research — Charles Darwin University, Australia (2026)',
                    'M.Sc. Clinical Epidemiology with Distinction — University of Newcastle, Australia',
                    'MD with Distinction — Sultan Qaboos University',
                  ].map((c) => (
                    <div key={c} className="cred-item">
                      <span className="cred-check">&#10003;</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="founder-section">
                <h4>Research Expertise</h4>
                <div className="founder-tags">
                  {[
                    'AI & Machine Learning in Medicine',
                    'Predictive Modelling',
                    'Clinical Epidemiology',
                    'Digital Health Innovation',
                    'NLP for Arabic Clinical Text',
                    'Medical Education Research',
                    'Biostatistics',
                    'Health Data Science',
                  ].map((t) => (
                    <span key={t} className="founder-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="founder-section">
                <h4>Selected Awards</h4>
                <div className="awards-grid">
                  {[
                    ['2026', 'Ejada Institutional Innovation Award — Bayan Platform'],
                    ['2025', 'Best Paper Award — Delirium Prediction via Machine Learning'],
                    ['2025', 'Best Poster — 6th Qatar International Internal Medicine Conference'],
                    ['2024', 'National Research Award — Best Published Research in Health'],
                    ['2023', 'National Research Award — Best Published Research in Health'],
                    ['2023', 'National Prize — Best Publication (non-PhD), MoHERI'],
                  ].map(([year, award]) => (
                    <div key={award} className="award-item">
                      <span className="award-year">{year}</span>
                      <span className="award-name">{award}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="founder-links">
                <a href="https://pubmed.ncbi.nlm.nih.gov/?term=Al+Alawi+AM" target="_blank" rel="noopener noreferrer" className="btn btn-outline">PubMed</a>
                <a href="https://orcid.org/0000-0003-2077-7186" target="_blank" rel="noopener noreferrer" className="btn btn-outline">ORCID</a>
                <a href="https://www.researchgate.net/profile/Abdullah-Al-Alawi-4" target="_blank" rel="noopener noreferrer" className="btn btn-outline">ResearchGate</a>
                <a href="https://www.linkedin.com/in/abdullah-al-alawi-4" target="_blank" rel="noopener noreferrer" className="btn btn-outline">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Oman Vision 2040 ── */}
      <section id="vision" className="section section--vision">
        <div className="vision-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <div className="section-badge section-badge--oman">Aligned with Oman Vision 2040</div>
            <h2>Building Oman's Knowledge Economy</h2>
          </div>

          <div className="vision-grid">
            {[
              {
                pillar: 'Health',
                title: 'A Healthy Society',
                desc: 'Bayan and Medad directly improve healthcare quality through AI-enhanced medical education and clinical documentation — training better doctors and reducing errors.',
                products: 'Bayan, Medad',
                icon: '&#9764;',
              },
              {
                pillar: 'Education',
                title: 'Education, Research & Innovation',
                desc: 'JournalReady and OLearn accelerate research output and provide data-driven insights for evidence-based education policy across Oman.',
                products: 'JournalReady, OLearn',
                icon: '&#9733;',
              },
              {
                pillar: 'Economy',
                title: 'Economic Diversification',
                desc: 'Exporting Omani-built AI solutions to 10+ countries, generating international revenue, and positioning Oman as a HealthTech hub for the Arabic-speaking world.',
                products: 'All Platforms',
                icon: '&#9670;',
              },
              {
                pillar: 'Data',
                title: 'A Data-Driven Government',
                desc: 'OHealth transforms national open data into actionable health intelligence, supporting evidence-based planning across all 11 governorates.',
                products: 'OHealth',
                icon: '&#9673;',
              },
            ].map((v) => (
              <div key={v.pillar} className="vision-card">
                <div className="vision-card-icon" dangerouslySetInnerHTML={{ __html: v.icon }}></div>
                <div className="vision-pillar">{v.pillar}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <div className="vision-products">Products: {v.products}</div>
              </div>
            ))}
          </div>

          <div className="oman-banner">
            <div className="oman-banner-inner">
              <div className="oman-quote">
                "We are building an economy based on knowledge, innovation, and
                technology — not just resources."
              </div>
              <div className="oman-attr">— Oman Vision 2040</div>
              <p className="oman-context">
                Bayan AI Technologies is 100% Omani-founded, Omani-built, and
                aligned with the national priority of transitioning to a
                knowledge-based, technology-driven economy. Every product we
                build is designed in Muscat and serves the Arabic-speaking
                world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Traction ── */}
      {/* ── Global Reach — Oman at Center ── */}
      <section className="section section--globe">
        <HexGrid />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="globe-layout">
            <div className="globe-text">
              <div className="section-badge">Global Reach</div>
              <h2>Born in Oman.<br />Built for the World.</h2>
              <p>
                Designed and engineered in Muscat, our platforms serve healthcare
                professionals across the Middle East, North Africa, South Asia,
                Europe, North America, and Oceania. Every product is built to
                international standards — competing with the best, from Oman.
              </p>
              <div className="globe-countries">
                {['Oman', 'Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Egypt', 'India', 'Pakistan', 'UK', 'USA', 'Australia'].map(c => (
                  <span key={c} className="country-tag">{c}</span>
                ))}
              </div>
            </div>
            <OmanGlobe />
          </div>
        </div>
      </section>

      <section id="traction" className="section section--dark">
        <div className="container">
          <div className="section-header">
            <div className="section-badge section-badge--accent">Traction</div>
            <h2>Not a Pitch. A Portfolio.</h2>
            <p>Every number below is live, verifiable, and growing.</p>
          </div>

          <div className="traction-grid">
            {[
              ['6', 'Live Platforms', 'Built, deployed, serving users'],
              ['3,550+', 'Clinical Questions', 'Physician-reviewed, evidence-based'],
              ['192', 'Drug Monographs', 'Clinical pharmacology reference'],
              ['11', 'Courses', 'Structured with CME credits'],
              ['52', 'Annotators', 'Across 11 governorates (Medad)'],
              ['5', 'Institutional Partners', 'Universities & government'],
              ['10+', 'Countries', 'Oman to US, UK, Egypt, India'],
              ['25,500', 'OMR Grants', 'Competitive research funding'],
              ['88', 'Publications', 'Peer-reviewed research'],
              ['1,777+', 'Citations', 'Global academic impact'],
              ['23', 'AI Tools', 'JournalReady suite'],
              ['800+', 'Journal Styles', 'Manuscript formatting'],
            ].map(([num, title, desc]) => (
              <div key={title} className="traction-card">
                <div className="traction-num">{num}</div>
                <div className="traction-title">{title}</div>
                <div className="traction-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section section--muted">
        <div className="container">
          <div className="contact-block">
            <h2>Partner With Us</h2>
            <p>
              Investors, institutions, and collaborators — let's build the
              future of healthcare AI together.
            </p>
            <div className="contact-methods">
              <a href="mailto:dr.abdullahalalawi@gmail.com" className="contact-item">
                <span className="contact-icon">&#9993;</span>
                <span>dr.abdullahalalawi@gmail.com</span>
              </a>
              <span className="contact-item">
                <span className="contact-icon">&#9872;</span>
                <span>Muscat, Sultanate of Oman</span>
              </span>
            </div>
            <div className="contact-social">
              <a href="https://www.linkedin.com/in/abdullah-al-alawi-4" target="_blank" rel="noopener noreferrer" className="social-btn">LinkedIn</a>
              <a href="https://x.com/Medresearch_om" target="_blank" rel="noopener noreferrer" className="social-btn">X</a>
              <a href="https://www.researchgate.net/profile/Abdullah-Al-Alawi-4" target="_blank" rel="noopener noreferrer" className="social-btn">ResearchGate</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-brand">
            <div className="brand-icon brand-icon--sm"><div className="brand-icon-inner">B</div></div>
            <span>Bayan AI Technologies LLC</span>
          </div>
          <div className="footer-tagline">
            AI-powered platforms for healthcare education, clinical documentation, and health intelligence.
          </div>
          <div className="footer-copy">
            &copy; 2026 Bayan AI Technologies LLC &middot; Muscat, Sultanate of Oman &middot; CR in progress
          </div>
        </div>
      </footer>
    </>
  )
}
