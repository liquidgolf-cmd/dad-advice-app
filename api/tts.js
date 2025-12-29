import https from 'https';

// Google Cloud TTS API handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if (!process.env.GOOGLE_CLOUD_TTS_API_KEY) {
    return res.status(500).json({ error: 'TTS API key not configured' });
  }

  try {
    // Check if text is SSML (starts with <speak>)
    const isSSML = text.trim().startsWith('<speak>');
    const input = isSSML ? { ssml: text } : { text };
    
    const requestBody = JSON.stringify({
      input,
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Neural2-D', // Reliable, natural male voice
        ssmlGender: 'MALE',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        pitch: 0.2, // Slightly warmer
        speakingRate: 0.95, // Slightly slower for clarity
      },
    });

    const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_CLOUD_TTS_API_KEY}`;
    
    const data = await new Promise((resolve, reject) => {
      const urlObj = new URL(apiUrl);
      const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody),
        },
      };

      const req = https.request(options, (response) => {
        let responseData = '';
        
        response.on('data', (chunk) => {
          responseData += chunk;
        });
        
        response.on('end', () => {
          if (response.statusCode !== 200) {
            console.error('Google TTS API error response:', response.statusCode, responseData);
            reject(new Error(`Google TTS API error: ${response.statusCode} ${responseData}`));
            return;
          }
          
          try {
            resolve(JSON.parse(responseData));
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(requestBody);
      req.end();
    });

    if (!data.audioContent) {
      throw new Error('No audio content received');
    }

    // audioContent is already base64 from the API
    const audioUrl = `data:audio/mp3;base64,${data.audioContent}`;

    res.status(200).json({ audioUrl });
  } catch (error) {
    console.error('TTS API error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('API key exists:', !!process.env.GOOGLE_CLOUD_TTS_API_KEY);
    res.status(500).json({ 
      error: 'Failed to generate speech',
      details: error.message || 'Unknown error',
    });
  }
}

