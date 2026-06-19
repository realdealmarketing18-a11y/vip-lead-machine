// api/pages.js — GET all pages (with auto-seeding on first run)
import { getDb } from './db.js';
import { SEED_PAGES } from './seed.js';

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const db = await getDb();
    const col = db.collection('pages');

    if (req.method === 'GET') {
      let pages = await col.find({}, { projection: { _id: 0 } }).toArray();

      // Auto-seed on first run
      if (pages.length === 0) {
        await col.insertMany(SEED_PAGES);
        pages = SEED_PAGES;
        console.log('[VIP CMS] Database seeded with', pages.length, 'city pages.');
      }

      return res.status(200).json({ success: true, pages });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[VIP API] Error:', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
