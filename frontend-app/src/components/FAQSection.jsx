import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const FAQS = [
  {
    q: 'How much does exterior painting cost in Orange County?',
    a: 'Exterior painting for luxury estates in Orange County typically ranges from $15,000 to $45,000 depending on home size, surface condition, and color complexity. For Newport Beach estates, our pricing starts at $5.50/sqft for exterior and $4.50/sqft for interior, while Irvine estates average $4.75/sqft for exterior and $3.95/sqft for interior. We provide custom color visualizations and precise investment estimates prior to commencing work.'
  },
  {
    q: 'Do you offer the Custom Visualization Service for every estate?',
    a: 'Yes — this is our signature service. Our Custom Visualization Service shows your exact home in three premium color schemes before we touch a single brush, ensuring flawless execution and absolute confidence in your color selection.'
  },
  {
    q: 'How long does a typical residential painting project take?',
    a: 'Most luxury residential projects in Orange County are completed in 3 to 5 days. Our design team and professional crews work Monday through Saturday to minimize disruption and maintain the architectural integrity of your property.'
  },
  {
    q: 'Do you understand the specific HOA requirements for Orange County luxury communities?',
    a: 'Absolutely. We routinely work within prestigious Orange County communities, including Pelican Hill, Crystal Cove, Shady Canyon, Ladera Ranch, and Coto de Caza. We understand the specific Tuscan, Mediterranean, and Spanish Colonial architectural styles and the rigorous HOA guidelines required for these estates.'
  },
  {
    q: 'Have you painted homes near us in Orange County?',
    a: 'Yes, we have transformed luxury properties throughout Orange County, including estates in Pelican Hill and Dover Shores in Newport Beach, Crystal Cove in Newport Coast, and Shady Canyon in Irvine.'
  },
  {
    q: 'What brand of paint and materials do you use?',
    a: 'We exclusively use Sherwin-Williams premium lines, including Emerald and Duration — the gold standard for luxury exterior protection. Every project represents a high-prestige investment, backed by our VIP concierge support and warranty.'
  }
];

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section ref={ref} id="faq" className="section" style={styles.section}>
      <div className="container" style={styles.inner}>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={inView ? { opacity: 1, x: 0 } : {}} 
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} 
          style={styles.colLeft}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '2px', background: '#C9A961' }} />
            <span className="overline">Knowledge Base</span>
          </div>
          <h2 className="headline headline-lg" style={{ color: '#1a1f4e', marginBottom: '24px' }}>
            Frequently Asked<br />
            <em className="headline-accent">Questions</em>
          </h2>
          <p className="headline headline-sm" style={{ color: '#595959', fontStyle: 'italic', maxWidth: '400px' }}>
            — Orange County Painting
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} 
          style={styles.colRight}
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={styles.faqItem}>
                <button 
                  style={styles.faqButton} 
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span className="headline headline-sm" style={{ ...styles.qText, color: isOpen ? '#C9A961' : '#1a1f4e' }}>
                    {faq.q}
                  </span>
                  <div style={{ ...styles.iconWrap, background: isOpen ? '#C9A961' : '#F8F7F4' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#FFF" : "#C9A961"} strokeWidth="2">
                      {isOpen ? <path d="M5 12h14" /> : <> <path d="M12 5v14" /> <path d="M5 12h14" /> </>}
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="body-text" style={styles.answerText}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

const styles = {
  section: {
    background: '#FFFFFF',
    borderTop: '1px solid rgba(26,31,78,0.05)',
  },
  inner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '64px',
    alignItems: 'flex-start',
  },
  '@media (max-width: 900px)': {
    inner: {
      gridTemplateColumns: '1fr',
    }
  },
  colLeft: {
    position: 'sticky',
    top: '120px',
  },
  colRight: {
    display: 'flex',
    flexDirection: 'column',
  },
  faqItem: {
    borderBottom: '1px solid rgba(26,31,78,0.1)',
  },
  faqButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    padding: '32px 0',
    cursor: 'pointer',
    textAlign: 'left',
  },
  qText: {
    margin: 0,
    transition: 'color 200ms',
    paddingRight: '32px',
  },
  iconWrap: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background 200ms',
  },
  answerText: {
    paddingBottom: '32px',
    maxWidth: '600px',
  }
};
