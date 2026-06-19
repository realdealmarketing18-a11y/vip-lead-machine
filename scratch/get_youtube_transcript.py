import urllib.request
import json
import re

def get_transcript(video_id):
    try:
        # We can try using a public YouTube transcript API/fetcher if available
        # or scraping from a public tool.
        # But first let's see if we can get the page source or transcript using a known public API
        url = f"https://youtube-transcript-api.herokuapp.com/api/transcript/{video_id}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            return " ".join([item['text'] for item in data])
    except Exception as e:
        return f"Heroku API failed: {e}"

def get_video_info(video_id):
    try:
        # Let's search via oembed to get the title
        url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            return data.get('title', 'Unknown Title')
    except Exception as e:
        return f"Oembed failed: {e}"

video_id = "ODNzk5x2tR4"
print("Title:", get_video_info(video_id))
print("Transcript:", get_transcript(video_id))
