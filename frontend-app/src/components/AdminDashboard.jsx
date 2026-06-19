import { useState, useEffect, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────
   VIP CMS ADMIN DASHBOARD
   Route: /admin
   Sections: SEO · Maps · Schema · FAQs · Videos · Preview
───────────────────────────────────────────────────────────── */

const API = '/api'

const NAV_TABS = [
  { id: 'seo',    label: '🎯 SEO',        icon: '🎯' },
  { id: 'maps',   label: '📍 Maps & Local', icon: '📍' },
  { id: 'schema', label: '🧱 Schema',      icon: '🧱' },
  { id: 'faqs',   label: '❓ FAQs',        icon: '❓' },
  { id: 'videos', label: '🎬 Videos',      icon: '🎬' },
  { id: 'hero',   label: '🏠 Hero',        icon: '🏠' },
]

/* ── small utilities ── */
function charCount(str = '', max) {
  const len = str.length
  const color = len > max ? '#ef4444' : len > max * 0.85 ? '#f59e0b' : '#10b981'
  return <span style={{ color, fontSize: 11, fontWeight: 700 }}>{len}/{max}</span>
}

function Input({ label, value, onChange, placeholder, maxLen, hint, type = 'text' }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <label style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a8aa3' }}>{label}</label>
        {maxLen && charCount(value, maxLen)}
      </div>
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', background: '#fff', border: '1.5px solid rgba(26,31,78,0.15)', borderRadius: 8, padding: '10px 14px', fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#1A1F4E', outline: 'none', boxSizing: 'border-box' }}
      />
      {hint && <div style={{ marginTop: 5, fontSize: 11, color: '#8a8aa3' }}>{hint}</div>}
    </div>
  )
}

function Textarea({ label, value, onChange, placeholder, maxLen, rows = 4 }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <label style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a8aa3' }}>{label}</label>
        {maxLen && charCount(value, maxLen)}
      </div>
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{ width: '100%', background: '#fff', border: '1.5px solid rgba(26,31,78,0.15)', borderRadius: 8, padding: '10px 14px', fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#1A1F4E', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
      />
    </div>
  )
}

function Card({ title, children, accent }) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(26,31,78,0.10)', borderRadius: 16, padding: 24, marginBottom: 20, boxShadow: '0 4px 16px rgba(26,31,78,0.07)' }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 3, height: 18, background: accent || 'linear-gradient(135deg,#C9A961,#C9A961)', borderRadius: 2 }} />
          <h3 style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 18, fontWeight: 600, color: '#1A1F4E', margin: 0 }}>{title}</h3>
        </div>
      )}
      {children}
    </div>
  )
}

function Badge({ label, color = '#10b981' }) {
  return <span style={{ background: color + '18', color, border: `1px solid ${color}40`, borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
}

/* ─────────────────────────────────────────────────────────────
   TAB: SEO
───────────────────────────────────────────────────────────── */
function SeoTab({ page, onChange }) {
  const seo = page.seo || {}
  const set = (key, val) => onChange({ ...page, seo: { ...seo, [key]: val } })

  return (
    <>
      <Card title="Meta Tags — Google Snippet">
        <Input label="Meta Title" value={seo.title} onChange={v => set('title', v)} maxLen={60} placeholder="House Painting Newport Beach, CA | VIP Premier Painting" hint="60 chars max. Include city + primary keyword." />
        <Textarea label="Meta Description" value={seo.description} onChange={v => set('description', v)} maxLen={160} rows={3} placeholder="VIP Premier Painting serves Newport Beach homeowners with premium exterior & interior painting..." />
        <Input label="Focus Keywords" value={seo.keywords} onChange={v => set('keywords', v)} placeholder="painting contractor Newport Beach, house painting Newport Beach CA..." hint="Comma-separated. Lead with city + service combos." />
        <Input label="H1 Headline" value={seo.h1} onChange={v => set('h1', v)} placeholder="Newport Beach Home Painting — Free Custom Color Consultation" maxLen={70} />
      </Card>

      <Card title="Page Content — SEO Body Block">
        <Textarea label="Local SEO Paragraph (shown at bottom of page)" value={page.seoBlock} onChange={v => onChange({ ...page, seoBlock: v })} rows={6} placeholder="Write a city-specific paragraph mentioning key neighborhoods, services, and differentiators..." />
        <Input label="Communities / Neighborhoods (comma-separated)" value={(page.communities || []).join(', ')} onChange={v => onChange({ ...page, communities: v.split(',').map(s => s.trim()) })} placeholder="Pelican Hill, Big Canyon, Harbor Ridge, Balboa Island" />
      </Card>

      <Card title="Pricing">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Input label="Exterior Price" value={page.priceExt} onChange={v => onChange({ ...page, priceExt: v })} placeholder="$5.50/sqft" />
          <Input label="Interior Price" value={page.priceInt} onChange={v => onChange({ ...page, priceInt: v })} placeholder="$4.50/sqft" />
        </div>
      </Card>

      <Card title="Page Status">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <label style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#1A1F4E', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={page.published !== false} onChange={e => onChange({ ...page, published: e.target.checked })} style={{ width: 18, height: 18, accentColor: '#C9A961' }} />
            Published (visible to visitors)
          </label>
          {page.published !== false ? <Badge label="Live" color="#10b981" /> : <Badge label="Draft" color="#f59e0b" />}
        </div>
      </Card>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB: MAPS & LOCAL SEO
───────────────────────────────────────────────────────────── */
function MapsTab({ page, onChange }) {
  const maps = page.maps || {}
  const set = (key, val) => onChange({ ...page, maps: { ...maps, [key]: val } })

  return (
    <>
      <Card title="Google Maps Embed">
        <Textarea label="Google Maps Embed URL" value={maps.embedUrl} onChange={v => set('embedUrl', v)} rows={3} placeholder="https://www.google.com/maps/embed?pb=..." hint='Go to Google Maps → Share → Embed a map → copy the src="..." URL only.' />
        {maps.embedUrl && (
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '2px solid #C9A961', marginTop: 8 }}>
            <iframe src={maps.embedUrl} width="100%" height="260" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" title="Service Area Map" />
          </div>
        )}
      </Card>

      <Card title="Geolocation (for Schema.org)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Input label="Latitude" value={maps.lat} onChange={v => set('lat', parseFloat(v) || v)} type="number" placeholder="33.6189" hint="Center of service area" />
          <Input label="Longitude" value={maps.lng} onChange={v => set('lng', parseFloat(v) || v)} type="number" placeholder="-117.9289" />
        </div>
        <Input label="Service Radius" value={maps.serviceRadius} onChange={v => set('serviceRadius', v)} placeholder="10 miles" />
      </Card>

      <Card title="NAP — Name, Address, Phone">
        <Input label="Service Address Line" value={maps.napAddress} onChange={v => set('napAddress', v)} placeholder="Serving Newport Beach, CA 92657" hint="Must match exactly across Google Business Profile, Yelp, and site." />
        <Input label="Phone (consistent)" value={maps.napPhone} onChange={v => set('napPhone', v)} placeholder="(909) 312-5400" />
      </Card>

      <Card title="Local Landmarks & Driving Directions">
        <Input label="Nearby Landmarks (comma-separated)" value={(maps.landmarks || []).join(', ')} onChange={v => set('landmarks', v.split(',').map(s => s.trim()))} placeholder="Fashion Island, Balboa Peninsula, Corona del Mar, Crystal Cove State Park" hint="Used in local SEO copy and Schema.org hasMap." />
      </Card>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB: SCHEMA.ORG
───────────────────────────────────────────────────────────── */
function SchemaTab({ page, onChange }) {
  const seo = page.seo || {}
  const maps = page.maps || {}
  const schema = seo.schema || {}

  // Auto-generate full schema from page data
  const autoSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `VIP Premier Painting — ${page.city}`,
    'description': seo.description || '',
    'telephone': '(909) 312-5400',
    'email': 'Contact@VIPHomePainting.com',
    'url': 'https://viphomepainting.com',
    'logo': 'https://viphomepainting.com/assets/logos/vip-logo-primary.png',
    'image': 'https://viphomepainting.com/assets/logos/vip-logo-primary.png',
    'areaServed': {
      '@type': 'City',
      'name': page.city,
      'addressRegion': page.state
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': page.city,
      'addressRegion': page.state,
      'addressCountry': 'US'
    },
    'geo': maps.lat ? {
      '@type': 'GeoCoordinates',
      'latitude': maps.lat,
      'longitude': maps.lng
    } : undefined,
    'hasMap': maps.embedUrl || undefined,
    'priceRange': '$$$',
    'currenciesAccepted': 'USD',
    'paymentAccepted': 'Cash, Check, Credit Card, Financing',
    'openingHours': 'Mo-Sa 07:00-18:00',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '5',
      'reviewCount': '47',
      'bestRating': '5'
    },
    'servesCuisine': undefined,
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Painting Services',
      'itemListElement': [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Exterior House Painting' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Interior House Painting' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Free Color Consultation' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Cabinet Refinishing' } }
      ]
    }
  }

  // Clean undefined
  const cleanSchema = JSON.parse(JSON.stringify(autoSchema))
  const schemaStr = JSON.stringify(cleanSchema, null, 2)

  const setSchema = (key, val) => onChange({ ...page, seo: { ...seo, schema: { ...schema, [key]: val } } })

  return (
    <>
      <Card title="Auto-Generated Schema.org JSON-LD">
        <div style={{ background: '#f8f7f4', borderRadius: 10, padding: 16, fontFamily: 'ui-monospace,monospace', fontSize: 12, lineHeight: 1.7, color: '#1A1F4E', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: 400, overflow: 'auto', border: '1px solid rgba(26,31,78,0.10)' }}>
          {schemaStr}
        </div>
        <p style={{ fontSize: 12, color: '#8a8aa3', marginTop: 10, fontFamily: 'Inter,sans-serif' }}>
          ✅ This JSON-LD is auto-generated from your city page data and injected into the page &lt;head&gt; on render. Update geo, SEO, and maps fields to update this schema.
        </p>
      </Card>

      <Card title="Schema Overrides">
        <Input label="Business Name Override" value={schema.name} onChange={v => setSchema('name', v)} placeholder={`VIP Premier Painting — ${page.city}`} hint="Leave blank to use auto-generated." />
        <Input label="Review Count (for AggregateRating)" value={schema.reviewCount} onChange={v => setSchema('reviewCount', v)} placeholder="47" type="number" />
        <Input label="Price Range" value={schema.priceRange} onChange={v => setSchema('priceRange', v)} placeholder="$$$" />
      </Card>

      <Card title="FAQ Schema (auto-built from FAQs tab)">
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#4A4F70', lineHeight: 1.6 }}>
          Your FAQs are automatically converted to <code style={{ background: '#f0eef8', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>FAQPage</code> schema markup. Add FAQs in the ❓ FAQs tab — they'll appear in Google's rich results automatically.
        </p>
        {(page.faqs || []).length > 0 && (
          <div style={{ marginTop: 12 }}>
            <Badge label={`${page.faqs.length} FAQs → Rich Results Ready`} color="#10b981" />
          </div>
        )}
      </Card>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB: FAQs
───────────────────────────────────────────────────────────── */
function FaqsTab({ page, onChange }) {
  const faqs = page.faqs || []

  const addFaq = () => onChange({ ...page, faqs: [...faqs, { q: '', a: '' }] })
  const removeFaq = (i) => onChange({ ...page, faqs: faqs.filter((_, idx) => idx !== i) })
  const updateFaq = (i, field, val) => {
    const updated = faqs.map((f, idx) => idx === i ? { ...f, [field]: val } : f)
    onChange({ ...page, faqs: updated })
  }

  return (
    <>
      <Card title="FAQ Manager">
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#4A4F70', marginBottom: 20, lineHeight: 1.6 }}>
          FAQs appear on the city page and are automatically converted to FAQ schema markup for Google rich results. Aim for 4–8 city-specific questions.
        </p>

        {faqs.map((faq, i) => (
          <div key={i} style={{ background: '#f8f7f4', border: '1px solid rgba(26,31,78,0.10)', borderRadius: 12, padding: 18, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 14, fontWeight: 600, color: '#C9A961' }}>FAQ #{i + 1}</span>
              <button onClick={() => removeFaq(i)} style={{ background: '#fee2e2', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', color: '#ef4444', fontSize: 12, fontWeight: 700 }}>Remove</button>
            </div>
            <Input label="Question" value={faq.q} onChange={v => updateFaq(i, 'q', v)} placeholder="How much does exterior painting cost in Newport Beach?" />
            <Textarea label="Answer" value={faq.a} onChange={v => updateFaq(i, 'a', v)} rows={3} placeholder="VIP Premier Painting charges $5.50/sqft for exterior painting in Newport Beach..." />
          </div>
        ))}

        <button onClick={addFaq} style={{ width: '100%', padding: '12px 20px', background: 'linear-gradient(135deg,#C9A961,#C9A961)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
          + Add FAQ
        </button>
      </Card>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB: VIDEOS
───────────────────────────────────────────────────────────── */
function VideosTab({ page, onChange }) {
  const videos = page.videos || {}
  const set = (key, val) => onChange({ ...page, videos: { ...videos, [key]: val } })

  const VideoSlot = ({ label, field, hint, color }) => (
    <Card title={label} accent={color}>
      <Input
        label="YouTube Video ID"
        value={videos[field]}
        onChange={v => set(field, v.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '').trim())}
        placeholder="dQw4w9WgXcQ"
        hint={hint}
      />
      {videos[field] && (
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '2px solid #C9A961', marginTop: 8 }}>
          <iframe
            src={`https://www.youtube.com/embed/${videos[field]}`}
            width="100%" height="200"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            title={label}
          />
        </div>
      )}
    </Card>
  )

  return (
    <>
      <VideoSlot label="🎬 Hero Video (TOFU — Awareness)" field="tofu" hint="Top of funnel. Brand story, transformation reel. Plays in the hero section." color="#3b82f6" />
      <VideoSlot label="🎯 Why Us Video (MOFU — Consideration)" field="mofu" hint="Middle of funnel. Testimonials, process walkthrough, before/after." color="#8b5cf6" />
      <VideoSlot label="✅ CTA Video (BOFU — Decision)" field="bofu" hint="Bottom of funnel. Urgency, offer, call-to-action. Plays near the quote form." color="#10b981" />
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB: HERO
───────────────────────────────────────────────────────────── */
function HeroTab({ page, onChange }) {
  const hero = page.hero || {}
  const set = (key, val) => onChange({ ...page, hero: { ...hero, [key]: val } })

  return (
    <>
      <Card title="Hero Section Content">
        <Input label="Overline (above H1)" value={hero.overline} onChange={v => set('overline', v)} placeholder="Newport Beach Customized Home Painting Services" />
        <Input label="Client Family Name" value={hero.clientName} onChange={v => set('clientName', v)} placeholder="The Gallagher Family" hint="Used in H1: 'Discover How VIP Transformed [Client Name]'s Home'" />
        <Input label="Client Neighborhood / Role" value={hero.clientNeighborhood} onChange={v => set('clientNeighborhood', v)} placeholder="Pelican Hill" hint="Shown under avatar pill: '[Name] · [Neighborhood] Homeowner'" />
        <Input label="Video Caption" value={hero.heroCaption} onChange={v => set('heroCaption', v)} placeholder="From Drab to Fab in 5 Days · Pelican Hill" />
      </Card>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [pages, setPages] = useState([])
  const [selectedSlug, setSelectedSlug] = useState(null)
  const [activePage, setActivePage] = useState(null)
  const [activeTab, setActiveTab] = useState('seo')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [loading, setLoading] = useState(false)

  // Load pages after auth
  const loadPages = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch(`${API}/pages`)
      const data = await r.json()
      if (data.pages) setPages(data.pages)
    } catch (e) {
      console.error('Load pages error', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed) loadPages()
  }, [authed, loadPages])

  // Load single page
  const loadPage = async (slug) => {
    setSelectedSlug(slug)
    setActivePage(null)
    try {
      const r = await fetch(`${API}/pages/${slug}`)
      const data = await r.json()
      if (data.page) setActivePage(data.page)
    } catch (e) {
      console.error('Load page error', e)
    }
  }

  // Save page
  const savePage = async () => {
    if (!activePage || !password) return
    setSaving(true)
    setSaveMsg('')
    try {
      const r = await fetch(`${API}/pages/${activePage.slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
        body: JSON.stringify(activePage)
      })
      const data = await r.json()
      if (data.success) {
        setSaveMsg('✅ Saved successfully!')
        await loadPages()
      } else {
        setSaveMsg('❌ Save failed: ' + (data.error || 'Unknown error'))
      }
    } catch (e) {
      setSaveMsg('❌ Network error: ' + e.message)
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(''), 4000)
    }
  }

  // Export HTML
  const exportHtml = () => {
    if (!activePage) return
    const url = `/${activePage.slug}`
    window.open(url, '_blank')
  }

  // ── AUTH SCREEN ──────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#1A1840 0%,#1A1F4E 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 40, maxWidth: 440, width: '100%', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: 'linear-gradient(135deg,#C9A961,#C9A961)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28, boxShadow: '0 8px 24px rgba(201,169,97,0.35)' }}>
              👑
            </div>
            <h1 style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 28, fontWeight: 700, color: '#1A1F4E', margin: '0 0 8px' }}>VIP CMS</h1>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#8a8aa3', margin: 0 }}>Admin Dashboard · Enter your password</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { setAuthed(true); setAuthError('') } }}
            placeholder="Dashboard password"
            style={{ width: '100%', border: '2px solid rgba(26,31,78,0.20)', borderRadius: 10, padding: '14px 16px', fontFamily: 'Inter,sans-serif', fontSize: 15, color: '#1A1F4E', outline: 'none', boxSizing: 'border-box', marginBottom: 14 }}
          />
          {authError && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12, fontFamily: 'Inter,sans-serif' }}>{authError}</p>}
          <button
            onClick={() => { setAuthed(true); setAuthError('') }}
            style={{ width: '100%', padding: '14px 24px', background: 'linear-gradient(135deg,#C9A961,#C9A961)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'Inter,sans-serif', fontSize: 14, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 8px 24px rgba(201,169,97,0.35)' }}
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    )
  }

  // ── MAIN DASHBOARD ───────────────────────────────────────
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0eef8', fontFamily: 'Inter,sans-serif' }}>

      {/* SIDEBAR */}
      <aside style={{ width: 280, background: 'linear-gradient(180deg,#1A1F4E 0%,#1A1840 100%)', color: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#C9A961,#C9A961)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 4px 14px rgba(201,169,97,0.40)' }}>👑</div>
            <div>
              <div style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 17, fontWeight: 700, letterSpacing: '0.04em' }}>VIP CMS</div>
              <div style={{ fontSize: 10, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginTop: 2 }}>Admin Dashboard</div>
            </div>
          </div>
        </div>

        {/* City list */}
        <div style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', padding: '0 8px', marginBottom: 10 }}>
            City Pages {loading && '…'}
          </div>
          {pages.map(p => (
            <button key={p.slug} onClick={() => loadPage(p.slug)}
              style={{
                width: '100%', textAlign: 'left', background: selectedSlug === p.slug ? 'rgba(201,169,97,0.18)' : 'transparent',
                border: selectedSlug === p.slug ? '1px solid rgba(201,169,97,0.40)' : '1px solid transparent',
                borderRadius: 10, padding: '10px 12px', cursor: 'pointer', marginBottom: 4,
                transition: 'all 200ms'
              }}>
              <div style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 14, fontWeight: 600, color: selectedSlug === p.slug ? '#C9A961' : '#fff' }}>{p.city}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 2, letterSpacing: '0.1em' }}>/{p.slug} · {p.published !== false ? '🟢 Live' : '🟡 Draft'}</div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.10)', fontSize: 11, color: 'rgba(255,255,255,0.40)' }}>
          VIP Home Painting · viphomepainting.com
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <header style={{ background: '#fff', borderBottom: '1px solid rgba(26,31,78,0.10)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            {activePage ? (
              <>
                <h2 style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 20, fontWeight: 600, color: '#1A1F4E', margin: '0 0 2px' }}>{activePage.city}, {activePage.state}</h2>
                <div style={{ fontSize: 12, color: '#8a8aa3' }}>/{activePage.slug} · {activePage.region}</div>
              </>
            ) : (
              <h2 style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 20, fontWeight: 600, color: '#1A1F4E', margin: 0 }}>Select a city page from the sidebar</h2>
            )}
          </div>
          {activePage && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {saveMsg && <span style={{ fontSize: 13, color: saveMsg.startsWith('✅') ? '#10b981' : '#ef4444' }}>{saveMsg}</span>}
              <button onClick={exportHtml} style={{ padding: '9px 16px', background: 'transparent', border: '1.5px solid rgba(26,31,78,0.20)', borderRadius: 8, fontFamily: 'Inter,sans-serif', fontSize: 12, fontWeight: 700, color: '#1A1F4E', cursor: 'pointer', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                👁 Preview
              </button>
              <button onClick={savePage} disabled={saving} style={{ padding: '9px 20px', background: saving ? '#ccc' : 'linear-gradient(135deg,#C9A961,#C9A961)', border: 'none', borderRadius: 8, fontFamily: 'Inter,sans-serif', fontSize: 12, fontWeight: 800, color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase', boxShadow: '0 4px 14px rgba(201,169,97,0.30)' }}>
                {saving ? 'Saving…' : '💾 Save Changes'}
              </button>
            </div>
          )}
        </header>

        {/* Tab nav + content */}
        {activePage ? (
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

            {/* Tab sidebar */}
            <nav style={{ width: 160, background: '#fff', borderRight: '1px solid rgba(26,31,78,0.08)', padding: '16px 10px', flexShrink: 0 }}>
              {NAV_TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '10px 12px',
                    background: activeTab === t.id ? 'rgba(201,169,97,0.10)' : 'transparent',
                    border: activeTab === t.id ? '1px solid rgba(201,169,97,0.30)' : '1px solid transparent',
                    borderRadius: 8, cursor: 'pointer', fontFamily: 'Inter,sans-serif',
                    fontSize: 12, fontWeight: activeTab === t.id ? 700 : 500,
                    color: activeTab === t.id ? '#C9A961' : '#4A4F70',
                    marginBottom: 4, transition: 'all 150ms'
                  }}>
                  {t.label}
                </button>
              ))}
            </nav>

            {/* Tab content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
              {activeTab === 'seo'    && <SeoTab    page={activePage} onChange={setActivePage} />}
              {activeTab === 'maps'   && <MapsTab   page={activePage} onChange={setActivePage} />}
              {activeTab === 'schema' && <SchemaTab page={activePage} onChange={setActivePage} />}
              {activeTab === 'faqs'   && <FaqsTab   page={activePage} onChange={setActivePage} />}
              {activeTab === 'videos' && <VideosTab page={activePage} onChange={setActivePage} />}
              {activeTab === 'hero'   && <HeroTab   page={activePage} onChange={setActivePage} />}
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, color: '#8a8aa3' }}>
            <div style={{ fontSize: 48 }}>🏡</div>
            <p style={{ fontFamily: 'Fraunces,Georgia,serif', fontSize: 20, color: '#1A1F4E' }}>Select a city page to start editing</p>
            <p style={{ fontSize: 13 }}>{pages.length} pages loaded · SEO · Maps · Schema · FAQs · Videos</p>
          </div>
        )}
      </main>
    </div>
  )
}
