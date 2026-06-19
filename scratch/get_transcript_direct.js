const https = require('https');
const fs = require('fs');
const zlib = require('zlib');

const videoIds = ['YX7nE-3rYEQ', '4mT8s_09DRM'];

function fetchUrl(url, extraHeaders = {}, returnHeaders = false) {
  return new Promise((resolve, reject) => {
    const headers = { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      ...extraHeaders
    };

    https.get(url, { headers }, (res) => {
      console.log(`Fetch: ${url.substring(0, 80)}... -> Status: ${res.statusCode}`);
      
      let stream = res;
      if (res.headers['content-encoding'] === 'gzip') {
        stream = res.pipe(zlib.createGunzip());
      } else if (res.headers['content-encoding'] === 'deflate') {
        stream = res.pipe(zlib.createInflate());
      } else if (res.headers['content-encoding'] === 'br') {
        stream = res.pipe(zlib.createBrotliDecompress());
      }
      
      let data = '';
      stream.on('data', (chunk) => { data += chunk; });
      stream.on('end', () => {
        if (returnHeaders) {
          resolve({ body: data, headers: res.headers });
        } else {
          resolve(data);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  for (const videoId of videoIds) {
    try {
      console.log(`Processing video: ${videoId}`);
      const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const watchResponse = await fetchUrl(watchUrl, {}, true);
      const html = watchResponse.body;
      const watchHeaders = watchResponse.headers;

      // Parse cookies from response headers
      let cookies = [];
      if (watchHeaders['set-cookie']) {
        cookies = watchHeaders['set-cookie'].map(cookie => cookie.split(';')[0]);
      }
      const cookieString = cookies.join('; ');
      
      // Find ytInitialPlayerResponse
      const regex = /ytInitialPlayerResponse\s*=\s*({.+?});/s;
      const match = html.match(regex);
      if (!match) {
        console.error(`Could not find ytInitialPlayerResponse in page source for ${videoId}`);
        continue;
      }

      const playerResponse = JSON.parse(match[1]);
      const captionTracks = playerResponse.captions?.playerCaptionsTracklistRenderer?.captionTracks;
      
      if (!captionTracks || captionTracks.length === 0) {
        console.error(`No caption tracks found for video ${videoId}`);
        continue;
      }

      // Use the first track (preferably English)
      const englishTrack = captionTracks.find(t => t.languageCode === 'en' || t.languageCode.startsWith('en')) || captionTracks[0];
      const transcriptUrl = englishTrack.baseUrl + '&fmt=json3';
      
      const timedtextResponse = await fetchUrl(transcriptUrl, {
        'Cookie': cookieString,
        'Referer': watchUrl
      }, true);
      
      const jsonContent = timedtextResponse.body;
      if (!jsonContent) {
        console.error(`Empty response received for transcript of ${videoId}`);
        continue;
      }

      const data = JSON.parse(jsonContent);
      const lines = [];
      if (data.events) {
        for (let event of data.events) {
          if (!event.segs) continue;
          const start = (event.tStartMs || 0) / 1000;
          const text = event.segs.map(s => s.utf8).join('').trim();
          if (text) {
            lines.push({ start, text });
          }
        }
      }

      const rawTranscript = lines.map(l => l.text).join(' ');
      const formattedTranscript = lines.map(l => {
        const minutes = Math.floor(l.start / 60);
        const seconds = Math.floor(l.start % 60).toString().padStart(2, '0');
        return `[${minutes}:${seconds}] ${l.text}`;
      }).join('\n');

      fs.writeFileSync(`c:\\Users\\Owner\\VIP-Lead-Machine\\scratch\\transcript_${videoId}_raw.txt`, rawTranscript);
      fs.writeFileSync(`c:\\Users\\Owner\\VIP-Lead-Machine\\scratch\\transcript_${videoId}_formatted.txt`, formattedTranscript);
      console.log(`Saved transcripts for ${videoId} to c:\\Users\\Owner\\VIP-Lead-Machine\\scratch\\`);
    } catch (e) {
      console.error(`Error processing ${videoId}:`, e);
    }
  }
}

run();
