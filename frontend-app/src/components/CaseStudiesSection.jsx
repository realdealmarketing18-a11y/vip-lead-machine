import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CASES = [
  {
    names: 'The Forbes Residence',
    role: 'Pelican Hill, Newport Beach Homeowners',
    videoTitle: 'Stunning Pelican Hill, Newport Beach Transformation',
    videoSub: 'The Forbes Residence — Newport Beach, CA',
    thumb: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop&q=80',
    headline: "The Forbes Residence — A Stunning Newport Beach Estate Transformation in Pelican Hill",
    reason: 'Restore the prestige and curb appeal of their Pelican Hill estate with a sophisticated coastal color scheme.',
    strategy: 'Through a FREE 30-Minute Personalized Color Consultation, VIP Premier Painting guided their palette selection for coastal luxury.',
    mood: 'Coastal elegance — refined, grand, and unmistakably Newport Beach.',
  },
  {
    names: 'Thomas & Carolyn Barnes',
    role: 'Newport Beach Homeowners',
    videoTitle: 'Exceptional Newport Beach Estate Transformation',
    videoSub: 'Thomas & Carolyn Barnes — Newport Beach, CA',
    thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    headline: "Thomas & Carolyn Barnes's Personalized Home Painting Transformation In Newport Beach, CA",
    reason: 'Elevate their Newport Beach home to match the prestige of the surrounding Pelican Hill community.',
    strategy: 'Through a FREE 30-Minute Personalized Color Consultation, VIP Premier Painting selected a timeless coastal palette.',
    mood: 'Refined coastal luxury — quiet confidence and architectural elegance.',
  },
]

function VideoPlaceholder({ thumb, title, sub }) {
  return (
    <div style={vStyles.wrap}>
      <img src={thumb} alt={title} style={vStyles.thumb} />
      <div style={vStyles.overlay} />
      <div style={vStyles.center}>
        <div style={vStyles.playCircle}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <span style={vStyles.watchLabel}>WATCH THE TRANSFORMATION</span>
      </div>
      <div style={vStyles.badge}>
        <p style={vStyles.badgeTitle}>{title}</p>
        <p style={vStyles.badgeSub}>{sub}</p>
      </div>
    </div>
  )
}

function CaseCard({ c, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={styles.card}
    >
      <VideoPlaceholder thumb={c.thumb} title={c.videoTitle} sub={c.videoSub} />

      <div style={styles.cardBody}>
        <div style={styles.nameRow}>
          <div style={styles.avatar}>
            {c.names.split(' ')[0][0]}{c.names.split('& ')[1]?.[0] || c.names.split(' ')[1]?.[0] || ''}
          </div>
          <div>
            <p style={styles.names}>{c.names}</p>
            <p style={styles.role}>{c.role}</p>
          </div>
        </div>

        <div style={styles.tagRow}>
          <span style={styles.tag}>HOME EXTERIOR PAINTING PROJECT DETAILS</span>
        </div>

        <h3 className="headline headline-sm" style={styles.caseHeadline}>{c.headline}</h3>

        <div style={styles.detailsGrid}>
          {[
            { label: 'REASON FOR PAINTING', text: c.reason },
            { label: 'STRATEGY', text: c.strategy },
            { label: 'MOOD DESIRED', text: c.mood },
          ].map((d) => (
            <div key={d.label} style={styles.detailRow}>
              <p style={styles.detailLabel}>{d.label}</p>
              <p className="body-text" style={styles.detailText}>{d.text}</p>
            </div>
          ))}
        </div>

        <div style={styles.accentBar} />
      </div>
    </motion.div>
  )
}

export default function CaseStudiesSection({ onBookClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section" style={styles.section}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={styles.header}
        >
          <div style={styles.labelRow}>
            <div style={styles.labelLine} />
            <span className="overline">Client Transformations</span>
          </div>
          <h2 className="headline headline-lg" style={styles.headline}>
            Orange County Luxury Home Painting Projects
          </h2>
          <p className="body-text" style={styles.sub}>
            Transforming Homes With Precision And Care
          </p>
        </motion.div>

        <div style={styles.grid}>
          {CASES.map((c, i) => (
            <CaseCard key={c.names} c={c} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={styles.ctaRow}
        >
          <button className="btn-primary" onClick={onBookClick} style={{ fontSize: '0.7rem', padding: '16px 40px' }}>
            Claim Free Color Consult + Irresistible Estimate
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

const vStyles = {
  wrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    background: '#1a1f4e',
    overflow: 'hidden',
  },
  thumb: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(26,31,78,0.9) 0%, rgba(26,31,78,0.2) 55%)',
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -60%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    zIndex: 5,
    cursor: 'pointer',
  },
  playCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: '#C9A961',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '4px',
    boxShadow: '0 6px 24px rgba(201,169,97,0.45)',
  },
  watchLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.55rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#FFFFFF',
    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
  },
  badge: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    zIndex: 5,
  },
  badgeTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: '0.95rem',
    color: '#FFFFFF',
    margin: '0 0 3px',
    fontWeight: 500,
  },
  badgeSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.52rem',
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.55)',
    textTransform: 'uppercase',
    margin: 0,
  },
}

const styles = {
  section: { background: '#FFFFFF' },
  header: { marginBottom: '56px', maxWidth: '700px' },
  labelRow: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' },
  labelLine: { width: '32px', height: '2px', background: '#C9A961' },
  headline: { color: '#1a1f4e', marginBottom: '12px' },
  sub: { fontSize: '1.05rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' },
  card: {
    background: '#FFFFFF',
    border: '1px solid rgba(26,31,78,0.08)',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(26,31,78,0.04)',
  },
  cardBody: { padding: '36px' },
  nameRow: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' },
  avatar: {
    width: '44px',
    height: '44px',
    background: 'rgba(201,169,97,0.1)',
    border: '1px solid rgba(201,169,97,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Fraunces', serif",
    fontSize: '1.1rem',
    color: '#C9A961',
    flexShrink: 0,
  },
  names: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#1a1f4e',
    margin: 0,
    letterSpacing: '0.05em',
  },
  role: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.7rem',
    color: '#9a9a9a',
    margin: '3px 0 0',
    fontWeight: 300,
  },
  tagRow: { marginBottom: '16px' },
  tag: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.52rem',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#C9A961',
  },
  caseHeadline: { color: '#1a1f4e', marginBottom: '24px', lineHeight: 1.3 },
  detailsGrid: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' },
  detailRow: { borderLeft: '2px solid rgba(201,169,97,0.3)', paddingLeft: '16px' },
  detailLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.55rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#C9A961',
    margin: '0 0 4px',
  },
  detailText: { fontSize: '0.85rem', lineHeight: 1.65, margin: 0 },
  accentBar: { width: '40px', height: '2px', background: '#C9A961' },
  ctaRow: { display: 'flex', justifyContent: 'center' },
}
