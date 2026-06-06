import { useEffect, useState, type CSSProperties } from 'react'

type Metric = {
  value: string
  label: string
}

type Product = {
  name: string
  arabic?: string
  tag: string
  description: string
  metrics: Metric[]
  tech: string[]
  url: string
  cta: string
  accent: string
  logo?: string
  preview?: string
  featured?: boolean
  status?: string
}

const heroMetrics: Metric[] = [
  { value: '6', label: 'live platforms' },
  { value: '10+', label: 'countries served' },
  { value: '88', label: 'publications behind the work' },
  { value: '25.5K OMR', label: 'grant-backed build' },
]

const products: Product[] = [
  {
    name: 'Bayan',
    arabic: 'بيان',
    tag: 'Flagship adaptive learning platform',
    description:
      'Machine learning-driven medical education with spaced repetition, psychometric analysis, multi-model verification, virtual patients, and exam-focused learning paths for physicians and nurses.',
    metrics: [
      { value: '3,550+', label: 'questions' },
      { value: '11', label: 'courses' },
      { value: '192', label: 'drug monographs' },
      { value: '10+', label: 'board exams' },
    ],
    tech: ['Adaptive ML', 'Multi-model QA', 'Psychometrics', 'Arabic/English workflows'],
    url: 'https://www.bayan.edu.om',
    cta: 'Visit bayan.edu.om',
    accent: '#7de2d1',
    logo: '/logos/bayan-sm.png',
    preview: '/screenshots/bayan-preview.png',
    featured: true,
  },
  {
    name: 'Medad',
    arabic: 'مداد',
    tag: 'Ambient clinical documentation',
    description:
      'On-premise clinical documentation powered by speech recognition, Arabic-friendly NLP, SOAP note generation, and structured coding support for healthcare institutions.',
    metrics: [
      { value: '52', label: 'annotators' },
      { value: '5', label: 'institutions' },
      { value: '100%', label: 'on-premise' },
    ],
    tech: ['Whisper ASR', 'Arabic NLP', 'SOAP generation', 'ICD-10 support'],
    url: 'https://www.medad.om',
    cta: 'Visit medad.om',
    accent: '#70b8ff',
  },
  {
    name: 'JournalReady',
    tag: 'AI research workflow',
    description:
      'A research operations suite covering study design, statistics, reference checks, manuscript polishing, and journal matching for healthcare researchers.',
    metrics: [
      { value: '23', label: 'AI tools' },
      { value: '6', label: 'workflow stages' },
      { value: '800+', label: 'journal styles' },
    ],
    tech: ['Biostatistics', 'Reference validation', 'Journal matching', 'Formatting automation'],
    url: 'https://journal-ready.vercel.app',
    cta: 'Visit JournalReady',
    accent: '#b696ff',
  },
  {
    name: 'SmartRota',
    tag: 'Scheduling optimization',
    description:
      'Constraint-based rota generation for training programs, balancing curriculum requirements, fairness, hospital capacity, and workforce complexity.',
    metrics: [
      { value: '119', label: 'residents' },
      { value: '3', label: 'hospitals' },
      { value: '13', label: 'blocks per year' },
    ],
    tech: ['Constraint solving', 'Optimization', 'Curriculum rules', 'Multi-site scheduling'],
    url: 'https://rota.medresearch-academy.om',
    cta: 'Visit SmartRota',
    accent: '#7ddf92',
  },
  {
    name: 'OHealth',
    tag: 'Health intelligence',
    description:
      'Predictive health analytics for capacity planning, disease trends, and evidence-led public health decisions using national open datasets.',
    metrics: [
      { value: '98', label: 'hospitals' },
      { value: '9,706', label: 'beds analysed' },
      { value: '27', label: 'disease signals' },
    ],
    tech: ['Forecasting', 'Climate-linked analysis', 'Equity insights', 'Open-data pipelines'],
    url: 'https://ohealth.medresearch-academy.om',
    cta: 'Visit OHealth',
    accent: '#48d2bd',
  },
  {
    name: 'OLearn',
    tag: 'Education intelligence',
    description:
      'A planning and analytics platform for school capacity, enrolment patterns, workforce Omanization, and education benchmarking.',
    metrics: [
      { value: '1,270', label: 'schools' },
      { value: '26 years', label: 'data span' },
      { value: '11', label: 'governorates' },
    ],
    tech: ['Geospatial analysis', 'Planning dashboards', 'Trend modelling', 'Open-data integration'],
    url: 'https://olearn-sandy.vercel.app',
    cta: 'Visit OLearn',
    accent: '#9cb0ff',
  },
]

const partnerLogos = [
  { src: '/logos/bayan.png', alt: 'Bayan AI' },
  { src: '/logos/medresearch.png', alt: 'MedResearch Academy' },
  { src: '/logos/omsb.png', alt: 'OMSB' },
  { src: '/logos/moh.png', alt: 'Ministry of Health Oman' },
  { src: '/logos/squ.png', alt: 'Sultan Qaboos University' },
]

const footprintPoints = [
  {
    title: 'Arabic-first product thinking',
    body: 'Interfaces, prompts, workflows, and clinical outputs are shaped for Arabic-speaking users rather than translated as an afterthought.',
  },
  {
    title: 'Institution-ready deployment',
    body: 'The product strategy accepts real hospital constraints: privacy, audit trails, operational complexity, and on-premise requirements.',
  },
  {
    title: 'Regional relevance with global quality',
    body: 'Built in Muscat, aligned to local reality, and structured to compete across GCC, MENA, South Asia, Europe, and North America.',
  },
]

const reachMarkets = ['Oman', 'Saudi Arabia', 'UAE', 'Qatar', 'Bahrain', 'Egypt', 'India', 'Pakistan', 'UK', 'USA', 'Australia']

const visionPillars = [
  {
    pillar: 'Health',
    title: 'A healthier, safer care environment',
    body: 'Bayan and Medad improve learning quality, documentation quality, and clinical consistency where mistakes are expensive.',
    products: 'Bayan, Medad',
  },
  {
    pillar: 'Education',
    title: 'Research and knowledge production',
    body: 'JournalReady and OLearn convert fragmented academic and public data into practical decisions for researchers and educators.',
    products: 'JournalReady, OLearn',
  },
  {
    pillar: 'Economy',
    title: 'Exportable Omani technology',
    body: 'These platforms are revenue-capable digital products built in Oman and deployable across multiple healthcare and education markets.',
    products: 'All platforms',
  },
  {
    pillar: 'Data',
    title: 'Evidence-led planning',
    body: 'OHealth and SmartRota translate operational and public datasets into planning tools that help leadership move faster and with more confidence.',
    products: 'OHealth, SmartRota',
  },
]

const founderStats: Metric[] = [
  { value: '88', label: 'publications' },
  { value: '1,777+', label: 'citations' },
  { value: 'h-18', label: 'h-index' },
  { value: '104K+ OMR', label: 'research grants' },
]

const expertise = [
  'AI and machine learning in medicine',
  'Clinical epidemiology',
  'Arabic clinical NLP',
  'Digital health innovation',
  'Predictive modelling',
  'Biostatistics',
  'Medical education research',
  'Health data science',
]

const awards = [
  ['2026', 'Ejada Institutional Innovation Award for Bayan'],
  ['2025', 'Best Paper Award for delirium prediction via machine learning'],
  ['2025', 'Best Poster at the 6th Qatar International Internal Medicine Conference'],
  ['2024', 'National Research Award for best published health research'],
]

const traction = [
  ['6', 'Live platforms', 'Built, deployed, and actively positioned around real healthcare and education workflows.'],
  ['3,550+', 'Clinical questions', 'Physician-reviewed adaptive learning content for board and licensing preparation.'],
  ['192', 'Drug monographs', 'Structured pharmacology references embedded in the learning product.'],
  ['23', 'Research tools', 'Statistical, formatting, matching, and manuscript support capabilities inside JournalReady.'],
  ['52', 'Annotators', 'The Medad build reflects serious annotation effort rather than a superficial demo workflow.'],
  ['5', 'Institutional settings', 'Products are shaped for hospitals, educators, and research-heavy environments.'],
  ['10+', 'Countries', 'Current footprint reaches beyond Oman into GCC, South Asia, and English-speaking markets.'],
  ['11', 'Governorates', 'National-scale public datasets already inform the intelligence platforms.'],
]

const omanPolygons: [number, number][][] = [
  [
    [55.208341, 22.70833],
    [55.234489, 23.110993],
    [55.525841, 23.524869],
    [55.528632, 23.933604],
    [55.981214, 24.130543],
    [55.804119, 24.269604],
    [55.886233, 24.920831],
    [56.396847, 24.924732],
    [56.84514, 24.241673],
    [57.403453, 23.878594],
    [58.136948, 23.747931],
    [58.729211, 23.565668],
    [59.180502, 22.992395],
    [59.450098, 22.660271],
    [59.80806, 22.533612],
    [59.806148, 22.310525],
    [59.442191, 21.714541],
    [59.282408, 21.433886],
    [58.861141, 21.114035],
    [58.487986, 20.428986],
    [58.034318, 20.481437],
    [57.826373, 20.243002],
    [57.665762, 19.736005],
    [57.7887, 19.06757],
    [57.694391, 18.94471],
    [57.234264, 18.947991],
    [56.609651, 18.574267],
    [56.512189, 18.087113],
    [56.283521, 17.876067],
    [55.661492, 17.884128],
    [55.269939, 17.632309],
    [55.2749, 17.228354],
    [54.791002, 16.950697],
    [54.239253, 17.044981],
    [53.570508, 16.707663],
    [53.108573, 16.651051],
    [52.782184, 17.349742],
    [52.00001, 19.000003],
    [54.999982, 19.999994],
    [55.666659, 22.000001],
    [55.208341, 22.70833],
  ],
  [
    [56.261042, 25.714606],
    [56.070821, 26.055464],
    [56.362017, 26.395934],
    [56.485679, 26.309118],
    [56.391421, 25.895991],
    [56.261042, 25.714606],
  ],
]

const omanCities = [
  { name: 'Muscat', lon: 58.4059, lat: 23.588, featured: true },
  { name: 'Sohar', lon: 56.7397, lat: 24.3419, featured: false },
  { name: 'Salalah', lon: 54.0924, lat: 17.0194, featured: false },
]

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={compact ? 'brand-mark brand-mark--compact' : 'brand-mark'}
      viewBox="0 0 72 72"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brand-surface" x1="8" y1="8" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16324b" />
          <stop offset="1" stopColor="#0b1c2d" />
        </linearGradient>
        <linearGradient id="brand-line" x1="20" y1="18" x2="56" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d8fff9" />
          <stop offset="1" stopColor="#7de2d1" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="60" height="60" rx="20" fill="url(#brand-surface)" />
      <rect x="6.5" y="6.5" width="59" height="59" rx="19.5" stroke="rgba(255,255,255,0.08)" />
      <path
        d="M24 18H39.5C47.1 18 51.5 22.1 51.5 28C51.5 33.7 47.1 36 40 36H24"
        fill="none"
        stroke="url(#brand-line)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M24 36H40.5C48.2 36 52.7 40.1 52.7 46.2C52.7 52.2 48.1 54 39 54H24"
        fill="none"
        stroke="url(#brand-line)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path d="M24 18V54" fill="none" stroke="url(#brand-line)" strokeLinecap="round" strokeWidth="4" />
      <circle cx="51.5" cy="28" r="4.8" fill="#f4b866" />
      <circle cx="52.7" cy="46.2" r="4.8" fill="#7de2d1" />
      <circle cx="24" cy="36" r="3.2" fill="#d8fff9" />
    </svg>
  )
}

function SectionIntro({
  kicker,
  title,
  body,
  align = 'center',
}: {
  kicker: string
  title: string
  body: string
  align?: 'center' | 'left'
}) {
  return (
    <div className={align === 'left' ? 'section-intro section-intro--left' : 'section-intro'}>
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-body">{body}</p>
    </div>
  )
}

function MetricTile({ value, label }: Metric) {
  return (
    <div className="metric-tile">
      <span className="metric-value">{value}</span>
      <span className="metric-label">{label}</span>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const style = { '--card-accent': product.accent } as CSSProperties

  return (
    <article className={product.featured ? 'product-card product-card--featured' : 'product-card'} style={style}>
      <div className="product-top">
        <div className={product.logo ? 'product-mark product-mark--image' : 'product-mark'}>
          {product.logo ? <img src={product.logo} alt={`${product.name} logo`} /> : <span>{product.name[0]}</span>}
        </div>
        <div className="product-heading">
          <div className="product-title-row">
            <h3>{product.name}</h3>
            {product.arabic ? <span className="arabic-inline">{product.arabic}</span> : null}
          </div>
          <p className="product-tag">{product.tag}</p>
        </div>
        <span className="status-pill">{product.status ?? 'Live'}</span>
      </div>

      <p className="product-description">{product.description}</p>

      <div className="product-metrics">
        {product.metrics.map((metric) => (
          <div key={metric.label} className="product-metric">
            <span className="product-metric__value">{metric.value}</span>
            <span className="product-metric__label">{metric.label}</span>
          </div>
        ))}
      </div>

      {product.preview ? (
        <div className="product-preview">
          <img src={product.preview} alt={`${product.name} interface preview`} />
        </div>
      ) : null}

      <div className="tech-list">
        {product.tech.map((item) => (
          <span key={item} className="tech-pill">
            {item}
          </span>
        ))}
      </div>

      <a href={product.url} target="_blank" rel="noreferrer" className="button button--ghost">
        {product.cta}
      </a>
    </article>
  )
}

function OmanMapGraphic() {
  const minLon = 52
  const maxLon = 59.80806
  const minLat = 16.651051
  const maxLat = 26.395934
  const width = 460
  const height = 560
  const padX = 56
  const padY = 40

  const projectPoint = (lon: number, lat: number) => {
    const x = padX + ((lon - minLon) / (maxLon - minLon)) * (width - padX * 2)
    const y = height - padY - ((lat - minLat) / (maxLat - minLat)) * (height - padY * 2)
    return { x, y }
  }

  const toPath = (polygon: [number, number][]) =>
    `${polygon
      .map(([lon, lat], index) => {
        const point = projectPoint(lon, lat)
        return `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)} ${point.y.toFixed(2)}`
      })
      .join(' ')} Z`

  return (
    <div className="oman-map-card">
      <svg className="oman-map" viewBox="0 0 460 560" role="img" aria-label="Map of Oman highlighting Muscat, Sohar, and Salalah">
        <defs>
          <linearGradient id="oman-fill" x1="120" y1="120" x2="340" y2="460" gradientUnits="userSpaceOnUse">
            <stop stopColor="#86ecdb" />
            <stop offset="1" stopColor="#327f93" />
          </linearGradient>
          <linearGradient id="oman-stroke" x1="160" y1="80" x2="310" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f4f6f8" stopOpacity="0.95" />
            <stop offset="1" stopColor="#8fcbe1" stopOpacity="0.55" />
          </linearGradient>
          <filter id="oman-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#020810" floodOpacity="0.36" />
          </filter>
        </defs>

        <rect x="1" y="1" width="458" height="558" rx="28" fill="rgba(8, 19, 31, 0.42)" stroke="rgba(143, 188, 214, 0.14)" />

        {omanPolygons.map((polygon, index) => (
          <path
            key={index}
            d={toPath(polygon)}
            className="oman-shape"
            fill="url(#oman-fill)"
            stroke="url(#oman-stroke)"
            strokeWidth="3"
            filter="url(#oman-shadow)"
          />
        ))}

        <text x="32" y="54" className="oman-city-label">
          Sultanate of Oman
        </text>
        <text x="32" y="78" className="oman-city-label oman-city-label--arabic">
          سلطنة عُمان
        </text>

        {omanCities.map((city) => {
          const point = projectPoint(city.lon, city.lat)
          const lineEndX = city.featured ? point.x + 62 : point.x + 48
          const lineEndY = city.featured ? point.y - 34 : point.y - 22

          return (
            <g key={city.name} className={city.featured ? 'oman-city oman-city--featured' : 'oman-city'}>
              <line x1={point.x} y1={point.y} x2={lineEndX} y2={lineEndY} className="oman-city-line" />
              <circle cx={point.x} cy={point.y} r={city.featured ? 7 : 5} className="oman-city-dot" />
              <text x={lineEndX + 10} y={lineEndY + 4} className="oman-city-label">
                {city.name}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="oman-map-caption">
        <span>Arabic-first builds</span>
        <span>11 governorates in scope</span>
        <span>Deployment-ready for regional institutions</span>
      </div>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={scrolled ? 'site-nav is-scrolled' : 'site-nav'}>
        <div className="container nav-row">
          <a href="#top" className="brand-lockup">
            <BrandMark compact />
            <div className="brand-copy">
              <span className="brand-title">Bayan AI Technologies</span>
              <span className="brand-subtitle">Arabic healthcare AI from Muscat</span>
            </div>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#products">Platforms</a>
            <a href="#footprint">Oman Footprint</a>
            <a href="#founder">Founder</a>
            <a href="#contact" className="nav-button">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="container">
            <div className="hero-shell">
              <div className="hero-grid">
                <div className="hero-copy">
                  <p className="eyebrow">AI infrastructure for Arabic-speaking healthcare</p>
                  <h1 className="hero-title">Practical AI products for healthcare, education, and research.</h1>
                  <p className="hero-body">
                    Bayan AI Technologies builds deployable software, not speculative branding. The portfolio spans adaptive
                    medical learning, ambient documentation, research tooling, workforce scheduling, and national health
                    intelligence, all grounded in real institutional use cases.
                  </p>

                  <div className="hero-actions">
                    <a href="#products" className="button button--primary">
                      Explore the platforms
                    </a>
                    <a href="#founder" className="button button--secondary">
                      Meet the founder
                    </a>
                  </div>

                  <div className="hero-metrics">
                    {heroMetrics.map((metric) => (
                      <MetricTile key={metric.label} {...metric} />
                    ))}
                  </div>
                </div>

                <aside className="hero-panel">
                  <p className="panel-kicker">What makes the stack credible</p>
                  <h2 className="panel-title">Purpose-built for real Arabic clinical and education workflows.</h2>

                  <div className="signal-stack">
                    <div className="signal-card">
                      <h3 className="signal-card__title">Arabic-native workflow design</h3>
                      <p className="signal-card__body">
                        Prompts, interfaces, and outputs are shaped for bilingual clinical environments instead of being bolted on at the end.
                      </p>
                    </div>

                    <div className="signal-card">
                      <h3 className="signal-card__title">Privacy-aware deployment</h3>
                      <p className="signal-card__body">
                        Clinical documentation products are designed around on-premise operation, sensitive data controls, and auditability.
                      </p>
                    </div>

                    <div className="signal-card">
                      <h3 className="signal-card__title">Evidence-linked product logic</h3>
                      <p className="signal-card__body">
                        The learning and research platforms connect AI assistance to validation, review, and measurable outcomes.
                      </p>
                    </div>
                  </div>

                  <div className="panel-chip-row">
                    {['Arabic NLP', 'Whisper ASR', 'Predictive ML', 'Multi-model QA'].map((chip) => (
                      <span key={chip} className="panel-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                </aside>
              </div>
            </div>

            <div className="logo-ribbon">
              <p className="logo-ribbon__label">Relevant across Oman’s health, training, and research ecosystem</p>
              <div className="logo-ribbon__track">
                {partnerLogos.map((logo) => (
                  <div key={logo.alt} className="logo-ribbon__item">
                    <img src={logo.src} alt={logo.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="products">
          <div className="container">
            <SectionIntro
              kicker="Platform Portfolio"
              title="Six products. One operating thesis."
              body="Each product exists because there is a real workflow to fix: better learning, faster documentation, stronger research, fairer scheduling, sharper health intelligence, and clearer education planning."
            />

            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tinted" id="footprint">
          <div className="container footprint-grid">
            <div className="footprint-copy">
              <SectionIntro
                kicker="Oman Footprint"
                title="Built in Oman, with Oman kept visible."
                body="The visual system should reflect the company’s home market instead of hiding it behind generic startup graphics. The product story starts in Muscat, then expands outward."
                align="left"
              />

              <div className="footprint-points">
                {footprintPoints.map((point) => (
                  <div key={point.title} className="footprint-point">
                    <h3 className="footprint-point__title">{point.title}</h3>
                    <p className="footprint-point__body">{point.body}</p>
                  </div>
                ))}
              </div>

              <div className="footprint-markets">
                {reachMarkets.map((market) => (
                  <span key={market} className="market-chip">
                    {market}
                  </span>
                ))}
              </div>
            </div>

            <OmanMapGraphic />
          </div>
        </section>

        <section className="section" id="vision">
          <div className="container">
            <SectionIntro
              kicker="Oman Vision 2040"
              title="A knowledge-economy fit, not a decorative slogan."
              body="The portfolio maps directly onto national priorities: a healthier society, stronger research output, smarter planning, and digital products that can be exported beyond Oman."
            />

            <div className="vision-grid">
              {visionPillars.map((pillar) => (
                <article key={pillar.title} className="vision-card">
                  <p className="vision-pillar">{pillar.pillar}</p>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                  <span className="vision-product-line">Products: {pillar.products}</span>
                </article>
              ))}
            </div>

            <div className="vision-banner">
              <p className="vision-banner__quote">
                “We are building an economy based on knowledge, innovation, and technology.”
              </p>
              <p className="vision-banner__body">
                Bayan AI Technologies is Omani-founded, Omani-built, and structured to turn domain expertise into exportable
                software assets rather than presentation-only innovation.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--accent" id="founder">
          <div className="container founder-grid">
            <div className="founder-profile">
              <div className="founder-photo-frame">
                <img src="/dr-alawi.jpg" alt="Dr. Abdullah M. Al Alawi" className="founder-photo" />
              </div>
              <div className="founder-identity">
                <h2 className="founder-name">Dr. Abdullah M. Al Alawi</h2>
                <p className="founder-credentials">B.Sc., MD, M.Sc., M.Sc., FRACP, FACP</p>
                <p className="founder-role">Founder &amp; CEO</p>
              </div>
            </div>

            <div className="founder-summary">
              <SectionIntro
                kicker="Leadership"
                title="A physician who builds products, not just presentations."
                body="Clinical depth, epidemiology training, research output, and AI product execution sit in the same place. That is why the portfolio feels operational rather than theoretical."
                align="left"
              />

              <p className="founder-text">
                Dual fellowships from the Royal Australasian College of Physicians and the American College of Physicians,
                two master's degrees in health research and clinical epidemiology, and a publication record strong enough to
                support serious product work rather than speculative messaging.
              </p>

              <div className="founder-stats">
                {founderStats.map((stat) => (
                  <div key={stat.label} className="founder-stat">
                    <span className="founder-stat__value">{stat.value}</span>
                    <span className="founder-stat__label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="founder-block">
                <h3 className="founder-block__title">Core expertise</h3>
                <div className="expertise-list">
                  {expertise.map((item) => (
                    <span key={item} className="expertise-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="founder-block">
                <h3 className="founder-block__title">Selected awards</h3>
                <div className="awards-list">
                  {awards.map(([year, award]) => (
                    <div key={award} className="award-row">
                      <span className="award-year">{year}</span>
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="founder-links">
                <a href="https://pubmed.ncbi.nlm.nih.gov/?term=Al+Alawi+AM" target="_blank" rel="noreferrer" className="button button--ghost">
                  PubMed
                </a>
                <a href="https://orcid.org/0000-0003-2077-7186" target="_blank" rel="noreferrer" className="button button--ghost">
                  ORCID
                </a>
                <a href="https://www.researchgate.net/profile/Abdullah-Al-Alawi-4" target="_blank" rel="noreferrer" className="button button--ghost">
                  ResearchGate
                </a>
                <a href="https://www.linkedin.com/in/abdullah-al-alawi-4" target="_blank" rel="noreferrer" className="button button--ghost">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--dark" id="traction">
          <div className="container">
            <SectionIntro
              kicker="Traction"
              title="This is a portfolio with operating evidence."
              body="The numbers matter because they show repeated delivery: content volume, institutions, annotation effort, public datasets, cross-market usage, and a founder who has already done the hard domain work."
            />

            <div className="traction-grid">
              {traction.map(([value, title, body]) => (
                <article key={title} className="traction-card">
                  <span className="traction-card__value">{value}</span>
                  <h3 className="traction-card__title">{title}</h3>
                  <p className="traction-card__body">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tinted" id="contact">
          <div className="container">
            <div className="contact-card">
              <p className="section-kicker">Contact</p>
              <h2 className="section-title">Partner with Bayan AI Technologies.</h2>
              <p className="section-body">
                For institutions, investors, collaborators, and product conversations that need more substance than brand
                theatre.
              </p>

              <div className="contact-actions">
                <a href="mailto:dr.abdullahalalawi@gmail.com" className="contact-item">
                  <span className="contact-item__label">Email</span>
                  <span>dr.abdullahalalawi@gmail.com</span>
                </a>
                <div className="contact-item">
                  <span className="contact-item__label">Base</span>
                  <span>Muscat, Sultanate of Oman</span>
                </div>
              </div>

              <div className="contact-social">
                <a href="https://www.linkedin.com/in/abdullah-al-alawi-4" target="_blank" rel="noreferrer" className="button button--ghost">
                  LinkedIn
                </a>
                <a href="https://x.com/Medresearch_om" target="_blank" rel="noreferrer" className="button button--ghost">
                  X
                </a>
                <a href="https://www.researchgate.net/profile/Abdullah-Al-Alawi-4" target="_blank" rel="noreferrer" className="button button--ghost">
                  ResearchGate
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-row">
          <div className="footer-brand">
            <BrandMark compact />
            <div className="brand-copy">
              <span className="brand-title">Bayan AI Technologies LLC</span>
              <span className="brand-subtitle">Healthcare AI, education AI, and health intelligence from Oman</span>
            </div>
          </div>
          <p className="footer-copy">© 2026 Bayan AI Technologies LLC · Muscat, Sultanate of Oman</p>
        </div>
      </footer>
    </>
  )
}
