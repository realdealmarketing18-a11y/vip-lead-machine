// api/pages/[slug].js — GET single page | POST update page
import { getDb } from '../db.js';

const ADMIN_PASSWORD = process.env.VIP_ADMIN_PASSWORD;

function authCheck(req) {
  const pw = req.headers['x-admin-password'];
  return pw && pw === ADMIN_PASSWORD;
}

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'Missing slug' });

  try {
    const db = await getDb();
    const col = db.collection('pages');

    // ── GET ──────────────────────────────────────────────────
    if (req.method === 'GET') {
      const page = await col.findOne({ slug }, { projection: { _id: 0 } });
      if (!page) return res.status(404).json({ error: 'Page not found', slug });
      return res.status(200).json({ success: true, page });
    }

    // ── POST / PUT (update) ───────────────────────────────────
    if (req.method === 'POST' || req.method === 'PUT') {
      if (!authCheck(req)) {
        return res.status(401).json({ error: 'Unauthorized — invalid admin password' });
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const update = { ...body, updatedAt: new Date().toISOString() };
      delete update._id; // Safety — don't overwrite mongo _id

      const result = await col.updateOne(
        { slug },
        { $set: update },
        { upsert: true }
      );

      return res.status(200).json({
        success: true,
        slug,
        matched: result.matchedCount,
        modified: result.modifiedCount,
        upserted: result.upsertedCount
      });
    }

    // ── DELETE ───────────────────────────────────────────────
    if (req.method === 'DELETE') {
      if (!authCheck(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      await col.deleteOne({ slug });
      return res.status(200).json({ success: true, deleted: slug });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[VIP API][slug]', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
