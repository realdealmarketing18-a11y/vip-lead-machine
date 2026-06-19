const https = require('https');

const videoId = 'ODNzk5x2tR4';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const oembedJson = await fetchUrl(oembedUrl);
    console.log('OEmbed Title:', JSON.parse(oembedJson).title);
  } catch (e) {
    console.error('OEmbed error:', e.message);
  }

  // Try fetching transcript from various public third-party web services if heroku is down or doesn't work
  try {
    const herokuUrl = `https://youtube-transcript-api.herokuapp.com/api/transcript/${videoId}`;
    const transcriptJson = await fetchUrl(herokuUrl);
    console.log('Transcript API result (first 500 chars):', transcriptJson.substring(0, 500));
  } catch (e) {
    console.error('Transcript API error:', e.message);
  }
}

run();
