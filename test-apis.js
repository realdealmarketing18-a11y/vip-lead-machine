const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
    const [key, ...v] = line.split('=');
    if (key && v.length) env[key.trim()] = v.join('=').trim().replace(/['"]/g, '').replace('\r', '');
});

async function testApi(name, url, method = 'GET', headers = {}) {
    try {
        const response = await fetch(url, { method, headers });
        console.log(`[${name}] Status: ${response.status} ${response.statusText}`);
        if(response.ok) {
            console.log(`[${name}] ✅ SUCCESS`);
        } else {
            // Read response body if not ok to provide debugging info
            const text = await response.text();
            console.log(`[${name}] ❌ FAILED (Body: ${text.substring(0, 100)})`);
        }
    } catch (e) {
        console.log(`[${name}] ❌ ERROR: ${e.message}`);
    }
}

async function run() {
    console.log("Starting API integration tests...\n");

    // Anthropic
    if (env.ANTHROPIC_API_KEY) {
        await testApi('Anthropic', 'https://api.anthropic.com/v1/models', 'GET', {
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
        });
    } else {
        console.log('[Anthropic] ⚠️ NO KEY FOUND in .env');
    }

    // Gemini
    if (env.GEMINI_API_KEY) {
        await testApi('Gemini', `https://generativelanguage.googleapis.com/v1beta/models?key=${env.GEMINI_API_KEY}`);
    } else {
        console.log('[Gemini] ⚠️ NO KEY FOUND in .env');
    }

    // Firecrawl
    if (env.FIRECRAWL_API_KEY) {
        // Checking base team or search endpoint to test auth
        await testApi('Firecrawl', 'https://api.firecrawl.dev/v0/app', 'GET', { 
            'Authorization': `Bearer ${env.FIRECRAWL_API_KEY}`
        });
    } else {
        console.log('[Firecrawl] ⚠️ NO KEY FOUND in .env');
    }

    // Apify
    if (env.APIFY_TOKEN) {
        await testApi('Apify', `https://api.apify.com/v2/users/me?token=${env.APIFY_TOKEN}`);
    } else {
        console.log('[Apify] ⚠️ NO KEY FOUND in .env');
    }

    // Higgsfield
    if (env.HIGGSFIELD_API_KEY) {
        // Querying models endpoint as a generic auth test
        await testApi('Higgsfield', 'https://api.higgsfield.ai/v1/models', 'GET', {
            'Authorization': `Bearer ${env.HIGGSFIELD_API_KEY}`,
            'Content-Type': 'application/json'
        });
    } else {
        console.log('[Higgsfield] ⚠️ NO KEY FOUND in .env');
    }

    // Manus
    if (env.MANUS_API_KEY) {
        await testApi('Manus', 'https://api.manus.gg/v1/health', 'GET', {
            'Authorization': `Bearer ${env.MANUS_API_KEY}`
        });
    } else {
         console.log('[Manus] ⚠️ NO KEY FOUND in .env');
    }
}

run();
