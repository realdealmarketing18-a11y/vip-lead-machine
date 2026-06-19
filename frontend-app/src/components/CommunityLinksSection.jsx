import { motion } from 'framer-motion';

const COMMUNITIES = [
  {
    name: 'Newport Beach',
    slug: 'newport-beach',
    tagline: 'Pelican Hill & Balboa Island',
    desc: 'Elite coastal residential painting services tailored for custom waterfront estates and gated enclaves.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Newport Coast',
    slug: 'newport-coast',
    tagline: 'Crystal Cove & Pelican Crest',
    desc: 'Concierge-level exterior finishing for Mediterranean-style architecture facing rigorous coastal climates.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Irvine',
    slug: 'irvine',
    tagline: 'Shady Canyon & Turtle Ridge',
    desc: 'Architectural-grade painting services adhering to precise HOA design aesthetics and luxury guidelines.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Coto de Caza',
    slug: 'coto-de-caza',
    tagline: 'The Summit & Golf Club',
    desc: 'High-end custom painting for massive private equestrian and golf-course luxury estates.',
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Ladera Ranch',
    slug: 'ladera-ranch',
    tagline: 'Covenant Hills',
    desc: 'Specialty finishes and custom color matching designed to elevate South Orange County estates.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Hidden Hills',
    slug: 'hidden-hills',
    tagline: 'Exclusive Gate-Guarded Estates',
    desc: 'Premium full-estate painting and cabinet customization services for private luxury properties.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80'
  }
];

export default function CommunityLinksSection() {
  return (
    <section id="communities" className="section" style={styles.section}>
      <div className="container" style={styles.inner}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '2px', background: '#C9A961' }} />
            <span className="overline">Our Service Areas</span>
            <div style={{ width: '40px', height: '2px', background: '#C9A961' }} />
          </div>
          <h2 className="headline headline-lg" style={{ color: '#1a1f4e', marginBottom: '16px' }}>
            Orange County <em className="headline-accent">Communities Served</em>
          </h2>
          <p className="body-text" style={{ maxWidth: '600px', margin: '0 auto', color: '#595959' }}>
            VIP Premier Painting brings flawless execution and custom visualization services to Southern California's most prestigious gated and coastal neighborhoods.
          </p>
        </div>

        <div style={styles.grid}>
          {COMMUNITIES.map((c, i) => (
            <motion.a
              key={c.slug}
              href={`/${c.slug}`}
              style={styles.card}
              whileHover={{ y: -6, boxShadow: '0 18px 40px rgba(26,31,78,0.12)', borderColor: '#C9A961' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div style={{ ...styles.cardImage, backgroundImage: `url(${c.image})` }} />
              <div style={styles.cardContent}>
                <span className="overline" style={{ fontSize: '0.6rem', color: '#C9A961', display: 'block', marginBottom: '4px' }}>
                  {c.tagline}
                </span>
                <h3 className="headline headline-sm" style={{ color: '#1a1f4e', margin: '0 0 10px', fontSize: '1.25rem' }}>
                  {c.name}
                </h3>
                <p className="body-text" style={{ fontSize: '0.82rem', color: '#595959', margin: '0 0 16px', lineHeight: '1.5' }}>
                  {c.desc}
                </p>
                <span style={styles.linkText}>
                  Explore Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: '#FFFFFF',
    padding: '80px 0',
    borderBottom: '1px solid rgba(26,31,78,0.05)',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '56px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '32px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    background: '#FFFFFF',
    border: '1px solid rgba(26,31,78,0.06)',
    borderRadius: '12px',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'border-color 200ms',
  },
  cardImage: {
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  cardContent: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  linkText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#C9A961',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginTop: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  }
};
