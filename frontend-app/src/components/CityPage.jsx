import { useState, useEffect } from 'react'

/* ─────────────────────────────────────────────────────────────
   VIP CITY PAGE — Dynamic renderer
   Reads data from MongoDB via /api/pages/:slug
   Injects Schema.org JSON-LD + FAQ schema into <head>
   Uses the same design system as the static HTML pages
───────────────────────────────────────────────────────────── */

const API = '/api'

/* ── Design tokens (match static HTML pages) ── */
const gold = '#C9A961'
const navy = '#1A1F4E'
const goldGrad = 'linear-gradient(135deg,#C9A961 0%,#C9A961 60%,#e07010 100%)'
const cream = '#F8F7F4'
const beigeSoft = '#E8E0D6'
const goldBright = '#C9A961'

const styles = {
  body: { fontFamily: "'Inter',-apple-system,sans-serif", color: navy, background: beigeSoft, margin: 0, WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' },
  page: { maxWidth: 520, margin: '0 auto', background: '#fff', boxShadow: '0 0 80px rgba(26,31,78,0.18)', paddingBottom: 80 },
}

/* ── Component helpers ── */
function GoldBtn({ children, href, full }) {
  return (
    <a href={href || '#quote'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, width: full ? '100%' : 'auto', padding: '18px 24px', background: goldGrad, color: '#fff', border: 'none', borderRadius: 10, boxShadow: '0 8px 24px rgba(201,169,97,0.35),inset 0 1px 0 rgba(255,255,255,0.25)', textDecoration: 'none', cursor: 'pointer' }}>
      {children}
    </a>
  )
}

function Sec({ children, bg }) {
  return <section style={{ padding: '56px 24px', borderBottom: '1px solid rgba(26,31,78,0.10)', background: bg || '#fff' }}>{children}</section>
}

function Overline({ children }) {
  return <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: gold, marginBottom: 14 }}>{children}</div>
}

function H1({ children }) {
  return <h1 style={{ fontFamily: 'Fraunces,Georgia,serif', fontWeight: 600, fontSize: 'clamp(28px,7vw,38px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: navy, textWrap: 'balance', margin: 0 }}>{children}</h1>
}

function H2({ children, size = 32 }) {
  return <h2 style={{ fontFamily: 'Fraunces,Georgia,serif', fontWeight: 600, fontSize: size, lineHeight: 1.05, letterSpacing: '-0.02em', color: navy, textWrap: 'balance', margin: 0 }}>{children}</h2>
}

function VipCheck({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 14, alignItems: 'start', padding: '14px 16px', background: '#fff', border: '1px solid rgba(26,31,78,0.10)', borderRadius: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: goldGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5 9-11"/></svg>
      </div>
      <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 15, lineHeight: 1.6, color: '#4A4F70' }}>{children}</div>
    </div>
  )
}

function VipStep({ num, title, body }) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(26,31,78,0.10)', borderRadius: 16, padding: '28px 24px 26px', boxShadow: '0 4px 10px rgba(26,31,78,0.08)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', background: goldGrad, color: '#fff', fontFamily: 'Fraunces,Georgia,serif', fontSize: 24, fontWeight: 700, boxShadow: '0 8px 24px rgba(201,169,97,0.35)', marginBottom: 18 }}>{num}.</div>
      <h4 style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 22, fontWeight: 600, lineHeight: 1.2, color: navy, margin: '0 0 10px' }}>{title}</h4>
      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 15, lineHeight: 1.6, color: '#4A4F70', margin: 0 }}>{body}</p>
    </div>
  )
}

function VipStat({ icon, num, label, body }) {
  return (
    <div style={{ background: '#fff', border: `2px solid ${navy}`, borderRadius: 10, padding: '26px 24px 24px' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: cream, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>{icon}</div>
      <div style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 64, fontWeight: 700, lineHeight: 1, color: gold, letterSpacing: '-0.04em' }}>{num}</div>
      <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, fontWeight: 800, color: navy, margin: '6px 0 10px' }}>{label}</div>
      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.6, color: '#4A4F70', margin: 0 }}>{body}</p>
    </div>
  )
}

function VipReview({ initial, name, date, body, gradient }) {
  const GIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  )
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(26,31,78,0.10)', borderRadius: 10, padding: 22, boxShadow: '0 4px 10px rgba(26,31,78,0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces,Georgia,serif', fontWeight: 600, fontSize: 18, color: '#fff' }}>{initial}</div>
        <div>
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: 15, color: navy }}>{name}</div>
          <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 12, color: '#8a8aa3', marginTop: 2 }}>{date}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Inter,sans-serif', fontSize: 12, color: '#8a8aa3', fontWeight: 600 }}>
          <GIcon />Google
        </div>
      </div>
      <div style={{ color: goldBright, fontSize: 16, letterSpacing: 2, marginBottom: 10 }}>★★★★★</div>
      <p style={{ fontFamily: 'Fraunces,Georgia,serif', fontStyle: 'italic', fontSize: 14, lineHeight: 1.65, color: '#4A4F70', margin: 0 }}>{body}</p>
    </div>
  )
}

/* ── Schema injection ── */
function injectSchema(page) {
  const seo = page.seo || {}
  const maps = page.maps || {}
  const schema = seo.schema || {}

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': schema.name || `VIP Premier Painting — ${page.city}`,
    'description': seo.description || '',
    'telephone': '(909) 312-5400',
    'email': 'Contact@VIPHomePainting.com',
    'url': 'https://viphomepainting.com',
    'logo': 'https://viphomepainting.com/assets/logos/vip-logo-primary.png',
    'areaServed': { '@type': 'City', 'name': page.city, 'addressRegion': page.state },
    'address': { '@type': 'PostalAddress', 'addressLocality': page.city, 'addressRegion': page.state, 'addressCountry': 'US' },
    'priceRange': schema.priceRange || '$$$',
    'openingHours': 'Mo-Sa 07:00-18:00',
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '5', 'reviewCount': schema.reviewCount || '47', 'bestRating': '5' }
  }
  if (maps.lat) {
    ld.geo = { '@type': 'GeoCoordinates', 'latitude': maps.lat, 'longitude': maps.lng }
  }

  // FAQ schema
  const faqSchema = (page.faqs || []).length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': page.faqs.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
    }))
  } : null

  // Inject into head
  const removeExisting = (id) => { const el = document.getElementById(id); if (el) el.remove() }
  removeExisting('vip-ld-local')
  removeExisting('vip-ld-faq')

  const ldEl = document.createElement('script')
  ldEl.id = 'vip-ld-local'
  ldEl.type = 'application/ld+json'
  ldEl.textContent = JSON.stringify(ld)
  document.head.appendChild(ldEl)

  if (faqSchema) {
    const faqEl = document.createElement('script')
    faqEl.id = 'vip-ld-faq'
    faqEl.type = 'application/ld+json'
    faqEl.textContent = JSON.stringify(faqSchema)
    document.head.appendChild(faqEl)
  }

  // Update meta tags
  document.title = seo.title || `${page.city} Home Painting | VIP Premier Painting`
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) metaDesc.setAttribute('content', seo.description || '')
}

/* ─────────────────────────────────────────────────────────────
   CITY PAGE RENDER
───────────────────────────────────────────────────────────── */
export default function CityPage({ slug }) {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetch(`${API}/pages/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.page) {
          setPage(data.page)
          injectSchema(data.page)
        } else {
          setError('Page not found')
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: beigeSoft }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: goldGrad, margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(201,169,97,0.35)' }} />
        <p style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 18, color: navy }}>Loading {slug}…</p>
      </div>
    </div>
  )

  if (error || !page) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: beigeSoft, flexDirection: 'column', gap: 16 }}>
      <p style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 24, color: navy }}>Page Not Found</p>
      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#8a8aa3' }}>{error}</p>
      <a href="/" style={{ color: gold, fontWeight: 700 }}>← Back to Home</a>
    </div>
  )

  const { hero = {}, maps = {}, seo = {}, videos = {}, faqs = [] } = page
  const city = page.city
  const overline = hero.overline || `${city} Customized Home Painting Services`
  const clientName = hero.clientName || 'Our Clients'
  const neighborhood = hero.clientNeighborhood || city

  return (
    <div style={styles.body}>
      <div style={styles.page}>

        {/* TOP BAR */}
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(26,31,78,0.10)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#1A1F4E"/>
              <path d="M20 7L13 21L7 15L11 29H29L33 15L27 21L20 7Z" fill="#C9A961" stroke="#C9A961" strokeWidth="0.5"/>
              <rect x="11" y="29" width="18" height="3" rx="1.5" fill="#A88A47"/>
            </svg>
            <div>
              <div style={{ fontFamily: 'Fraunces,Georgia,serif', fontWeight: 700, fontSize: 18, color: navy, letterSpacing: '0.04em', lineHeight: 1 }}>VIP</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 8, letterSpacing: '0.30em', color: '#8a8aa3', marginTop: 2 }}>HOME PAINTING</div>
            </div>
          </div>
          <a href="tel:9093125400" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: navy, textDecoration: 'none', fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.04em' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            (909) 312-5400
          </a>
        </header>

        {/* HERO */}
        <Sec>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
              <svg width="140" height="40" viewBox="0 0 200 50" fill="none">
                <rect x="0" y="5" width="38" height="38" rx="8" fill="#1A1F4E"/>
                <path d="M19 9L13 22L7 16L11 31H27L31 16L25 22L19 9Z" fill="#C9A961" stroke="#C9A961" strokeWidth="0.5"/>
                <rect x="9" y="31" width="18" height="3" rx="1.5" fill="#A88A47"/>
                <text x="48" y="26" fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill="#1A1F4E" letterSpacing="2">VIP</text>
                <text x="48" y="40" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="600" fill="#8a8aa3" letterSpacing="3">HOME PAINTING</text>
              </svg>
            </div>

            <Overline>{overline}</Overline>
            <H1>
              Discover How VIP Home Painting <em style={{ color: gold, fontStyle: 'italic' }}>Transformed {clientName}'s Home</em> In Just 5 Days With Custom Color Consultation
            </H1>

            {/* Avatar pill */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '6px 18px 6px 6px', background: '#fff', border: '1px solid rgba(26,31,78,0.20)', borderRadius: 999, boxShadow: '0 1px 3px rgba(26,31,78,0.06)' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#C9B59A,#8B7355)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 17, fontWeight: 600, color: navy, lineHeight: 1.1 }}>{clientName}</div>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a8aa3', marginTop: 2 }}>{neighborhood} Homeowner</div>
                </div>
              </div>
            </div>

            {/* Hero video slot */}
            {videos.tofu ? (
              <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: `3px solid ${gold}`, boxShadow: '0 14px 34px rgba(26,31,78,0.18)', aspectRatio: '16/10', marginBottom: 24 }}>
                <iframe src={`https://www.youtube.com/embed/${videos.tofu}`} width="100%" height="100%" style={{ border: 0, position: 'absolute', inset: 0 }} allowFullScreen title="Hero Video" />
              </div>
            ) : (
              /* Before/After placeholder */
              <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: `3px solid ${gold}`, boxShadow: '0 14px 34px rgba(26,31,78,0.18)', aspectRatio: '16/10', background: '#2A2A2A', marginBottom: 24 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(180deg,rgba(60,55,50,0.4),rgba(40,35,30,0.7)),linear-gradient(135deg,#8C7E6E,#4A3F32)', filter: 'saturate(0.7) brightness(0.85)' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(180deg,rgba(255,200,140,0.18),rgba(120,90,60,0.35)),linear-gradient(135deg,#E8C9A0,#8B5E3A)' }} />
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'rgba(255,255,255,0.85)', transform: 'translateX(-50%)' }} />
                <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', padding: '5px 10px', borderRadius: 4, backdropFilter: 'blur(4px)' }}>BEFORE</div>
                <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', padding: '5px 10px', borderRadius: 4, backdropFilter: 'blur(4px)' }}>AFTER</div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 68, height: 48, borderRadius: 12, background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.4)', cursor: 'pointer' }}>
                  <svg viewBox="0 0 24 24" width="28" height="28"><path fill="#FFF" d="M8 5v14l11-7z"/></svg>
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 14, background: 'rgba(0,0,0,0.6)', color: '#fff', fontFamily: 'Inter,sans-serif', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 4 }}>{hero.heroCaption || `${city} Transformation`}</div>
              </div>
            )}

            <p style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: navy, fontSize: '1.0625rem', lineHeight: 1.55, textAlign: 'center', margin: '0 0 20px' }}>
              CLAIM YOUR FREE 30-MINUTE CUSTOMIZED HOME COLOR CONSULTATION AND{' '}
              <em style={{ color: gold, fontStyle: 'italic', fontWeight: 600 }}>SAVE $1,000'S ON EXPENSIVE CONSULTANTS AND AVOID COMMON HOME PAINTING MISTAKES.</em>
            </p>

            <GoldBtn href="#quote" full>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.2 }}>Claim Free Color Consultation</span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.92 }}>Irresistible Painting Estimates Included</span>
            </GoldBtn>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', marginTop: 22 }}>
              <div style={{ background: '#fff', border: '1px solid rgba(168,138,71,0.30)', borderRadius: 12, padding: 12, boxShadow: '0 4px 10px rgba(26,31,78,0.08)', aspectRatio: 1, width: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/badges/vip-custom-color-schemes.png" alt="Custom Color Schemes" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ background: '#fff', border: '1px solid rgba(168,138,71,0.30)', borderRadius: 12, padding: 12, boxShadow: '0 4px 10px rgba(26,31,78,0.08)', aspectRatio: 1, width: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/badges/vip-warranty-laurel.png" alt="Insane 1-Year Warranty" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </Sec>

        {/* ACCENT BAND */}
        <div style={{ background: '#C9A961', color: '#fff', padding: '13px 24px', textAlign: 'center', fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          Free Consultation · Limited Spots Available · (909) 312-5400
        </div>

        {/* WHY */}
        <Sec bg={cream}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: goldGrad, color: '#fff', fontFamily: 'Fraunces,Georgia,serif', fontSize: 36, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(201,169,97,0.35)' }}>?</div>
            <Overline>Why Get A FREE Custom Color Consultation</Overline>
            <H2 size={28}>Avoid Costly Mistakes—Our Free Consultation Ensures Your {city} Home <em style={{ color: gold, fontStyle: 'italic' }}>Stands Out For The Right Reasons</em></H2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <VipCheck><strong style={{ color: navy, fontWeight: 700 }}>Unlock $1,000 Value in 30 Minutes:</strong> Our free consultation saves you thousands in costly repainting by getting the right colors for your {city} home the first time.</VipCheck>
            <VipCheck><strong style={{ color: navy, fontWeight: 700 }}>Fast-Track Your Home Transformation:</strong> Expert color advice in 30 minutes, designed to elevate your {(page.communities || [])[0] || city} home's curb appeal instantly.</VipCheck>
            <VipCheck><strong style={{ color: navy, fontWeight: 700 }}>Why Waste Money on Guesswork?</strong> Our free consultation ensures you avoid expensive mistakes and achieve a timeless look for your {page.region} estate — at no cost.</VipCheck>
          </div>
        </Sec>

        {/* PROCESS */}
        <Sec>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Overline>Here's A Taste Of What To Expect</Overline>
            <H2 size={28}>When You Go Through Our <em style={{ color: gold, fontStyle: 'italic' }}>Color Consult</em> And Painting Service In {city}</H2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <VipStep num="1" title="Personalized Color Consultation" body={`We start by understanding your vision — discussing the colors, mood, and architectural style you want for your ${city} home.`} />
            <VipStep num="2" title="Customized Visualizations In 30 Minutes" body={`We create detailed color visualizations showing how different schemes will transform your ${city} estate — within minutes.`} />
            <VipStep num="3" title="Irresistible Estimate" body={`Receive a competitive estimate tailored to bring your dream ${city} home to life — without compromising on quality.`} />
          </div>
        </Sec>

        {/* TESTIMONIALS */}
        <Sec bg={cream}>
          <div style={{ textAlign: 'center', marginBottom: 26 }}>
            <Overline>Testimonials</Overline>
            <H2 size={28}>What Our Clients Are <em style={{ color: gold, fontStyle: 'italic' }}>Saying About Us</em></H2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <VipReview initial="L" name="Linda Quarry" date="May 24, 2024" gradient="linear-gradient(135deg,#E8B888,#B07A4A)" body={`"I chose VIP painting services for my interior painting job after generating a few estimates — the pricing was competitive. I felt confident they would complete the job to my satisfaction. Professional from start to finish."`} />
            <VipReview initial="C" name="Carol Brown" date="July 31, 2023" gradient="linear-gradient(135deg,#C2A1D6,#6B4A85)" body={`"VIP painting services did an excellent job painting the interior of our home. Fabian went above and beyond our expectations. Fair pricing, professional, and easy to communicate with throughout the project."`} />
            <VipReview initial="T" name="Tony Minardi" date="March 7, 2023" gradient="linear-gradient(135deg,#A8C4A0,#4A7A45)" body={`"VIP Painting Services recently painted the exterior of our house. They did an amazing job! The crew was professional, tidy, and on time every day."`} />
          </div>
        </Sec>

        {/* STATS */}
        <Sec>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <VipStat icon={<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#C9A961" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>} num="5" label="Star Reviews" body={`Every ${city} client leaves thrilled with their transformed home.`} />
            <VipStat icon={<svg viewBox="0 0 24 24" width="20" height="20"><path fill="none" stroke="#C9A961" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5 9-11"/></svg>} num={<>100<span style={{fontSize:'0.5em'}}>%</span></>} label="Clients Satisfied" body="Luxury results every time — across all of Orange County." />
            <VipStat icon={<svg viewBox="0 0 24 24" width="20" height="20"><path fill="none" stroke="#C9A961" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 21V9l9-6 9 6v12M9 21v-7h6v7"/></svg>} num="120" label="Projects Done" body={`Trusted across ${city} and Orange County — every project, every time.`} />
          </div>
        </Sec>

        {/* QUOTE FORM + OFFERS */}
        <Sec id="quote" bg={cream}>
          <div>
            <Overline>Exclusive Offers — {city}</Overline>
            <H2 size={26}>Providing The Best Luxury <em style={{ color: gold, fontStyle: 'italic' }}>{city} Home Painting Services</em></H2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, margin: '20px 0 10px' }}>
              {[{ amt: '$750', tag: 'OFF', desc: 'Any Full Exterior Paint Job' }, { amt: 'FREE', tag: null, desc: 'Color Consultation', sub: '($250 Value)' }, { amt: 'FREE', tag: null, desc: 'Pressure Wash', sub: '($300 Value)' }].map((o, i) => (
                <div key={i} style={{ background: '#fff', border: `1.5px solid ${gold}`, borderRadius: 6, padding: '16px 10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Fraunces,Georgia,serif', fontWeight: 700, fontSize: i === 0 ? 26 : 20, color: navy, lineHeight: 1 }}>{o.amt}{o.tag && <span style={{ fontSize: 11, color: gold, letterSpacing: '0.14em', fontWeight: 700, marginLeft: 3, verticalAlign: 3 }}>{o.tag}</span>}</div>
                  <div style={{ fontFamily: 'Fraunces,Georgia,serif', fontStyle: 'italic', fontSize: 11, color: navy, lineHeight: 1.4, marginTop: 6 }}>{o.desc}{o.sub && <span style={{ display: 'block', color: '#8a8aa3', fontSize: 9, fontStyle: 'normal', fontFamily: 'Inter,sans-serif' }}>{o.sub}</span>}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontFamily: 'Inter,sans-serif', fontSize: 10, letterSpacing: '0.14em', color: gold, marginBottom: 20, fontWeight: 600 }}>Limited Time Only · Limited Spots Available</div>

            <GoldBtn href="tel:9093125400" full>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Claim Free Color Consult</span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.92 }}>Irresistible Painting Estimates Included</span>
            </GoldBtn>

            <div style={{ marginTop: 28 }}>
              <Overline>Our Complete Scope of Work</Overline>
              <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                {['Full Exterior Painting','Stucco Repair','Surface Preparation','Interior Walls','Wood Trim Replacement','Premium Paints Only','Cabinet Refinishing','Color Consultation','Clean Worksites','Garage Floor Coatings','Pressure Washing','Final Inspection'].map(item => (
                  <li key={item} style={{ fontFamily: 'Fraunces,Georgia,serif', fontStyle: 'italic', fontSize: 13.5, color: navy, padding: '4px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: gold, fontWeight: 700, fontStyle: 'normal', fontFamily: 'Inter,sans-serif' }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Sec>

        {/* MAPS */}
        {maps.embedUrl && (
          <Sec>
            <Overline>Service Area — {city}</Overline>
            <H2 size={22} style={{ marginBottom: 16 }}>We Serve {city} & Surrounding Communities</H2>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: `2px solid ${gold}`, marginTop: 16, boxShadow: '0 14px 34px rgba(26,31,78,0.18)' }}>
              <iframe src={maps.embedUrl} width="100%" height="280" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" title={`${city} Service Area Map`} />
            </div>
            {(maps.landmarks || []).length > 0 && (
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#4A4F70', marginTop: 14, lineHeight: 1.65 }}>
                Serving {maps.landmarks.join(', ')} and all of {city}, {page.state}. {maps.napPhone}
              </p>
            )}
          </Sec>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <Sec bg={cream}>
            <Overline>Frequently Asked Questions</Overline>
            <H2 size={26}>{city} Painting — Common Questions</H2>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faqs.map((faq, i) => (
                <details key={i} style={{ background: '#fff', border: '1px solid rgba(26,31,78,0.10)', borderRadius: 10, padding: '14px 18px', cursor: 'pointer' }}>
                  <summary style={{ fontFamily: 'Fraunces,Georgia,serif', fontWeight: 600, fontSize: 16, color: navy, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {faq.q}
                    <span style={{ color: gold, fontSize: 20, marginLeft: 10 }}>+</span>
                  </summary>
                  <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.65, color: '#4A4F70', margin: '12px 0 0' }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </Sec>
        )}

        {/* SEO BLOCK */}
        {page.seoBlock && (
          <Sec>
            <Overline>About Our {city} Service</Overline>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.75, color: '#4A4F70', marginTop: 16 }} dangerouslySetInnerHTML={{ __html: page.seoBlock }} />
          </Sec>
        )}

        {/* FOOTER */}
        <div style={{ background: '#1A1840', padding: '48px 24px', textAlign: 'center', color: 'rgba(255,255,255,0.85)' }}>
          <svg width="140" height="48" viewBox="0 0 180 60" fill="none" style={{ margin: '0 auto 18px', display: 'block' }}>
            <rect x="0" y="10" width="40" height="40" rx="8" fill="#C9A961"/>
            <path d="M20 14L14 27L8 21L12 36H28L32 21L26 27L20 14Z" fill="#FFF" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5"/>
            <rect x="10" y="36" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.5)"/>
            <text x="52" y="32" fontFamily="Georgia,serif" fontSize="22" fontWeight="700" fill="#FFF" letterSpacing="2">VIP</text>
            <text x="52" y="48" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.6)" letterSpacing="3">HOME PAINTING</text>
          </svg>
          <div style={{ fontFamily: 'Fraunces,Georgia,serif', fontStyle: 'italic', color: goldBright, fontSize: 18, marginBottom: 14 }}>"Visualize it. See it. Paint it."</div>
          <div style={{ fontSize: 13, letterSpacing: '0.06em', marginBottom: 6 }}>(909) 312-5400 · viphomepainting.com</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.60)' }}>Proudly Serving {city} &amp; {page.region} · Licensed · Bonded · Insured</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 16, letterSpacing: '0.04em' }}>© 2026 VIP Home Painting · CA Licensed &amp; Bonded</div>
        </div>

      </div>

      {/* STICKY CTA */}
      <div style={{ position: 'fixed', bottom: 12, left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 24px)', maxWidth: 496, background: navy, color: '#fff', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, borderRadius: 12, boxShadow: '0 14px 36px rgba(26,31,78,0.45)', zIndex: 100, border: '1px solid rgba(201,169,97,0.35)' }}>
        <div>
          <div style={{ fontFamily: 'Fraunces,Georgia,serif', fontWeight: 600, fontSize: 13.5, lineHeight: 1.2 }}>Free Color Consult</div>
          <div style={{ fontSize: 9.5, fontFamily: 'Inter,sans-serif', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2, fontWeight: 500 }}>30 Min · No Obligation · {city}</div>
        </div>
        <a href="tel:9093125400" style={{ background: goldGrad, color: '#fff', textDecoration: 'none', fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '11px 14px', borderRadius: 6, boxShadow: '0 4px 14px rgba(201,169,97,0.35)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          Call Now →
        </a>
      </div>
    </div>
  )
}
