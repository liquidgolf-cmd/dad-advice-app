const https = require('https');

module.exports = async function handler(req, res) {
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
    // Use Google Cloud TTS REST API
    const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_CLOUD_TTS_API_KEY}`;
    
    const requestBody = JSON.stringify({
      input: { text },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Neural2-D',
        ssmlGender: 'MALE',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        pitch: 0,
        speakingRate: 1.0,
      },
    });

    const url = new URL(apiUrl);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };

    const data = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Google TTS API error: ${res.statusCode} ${responseData}`));
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
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to generate speech',
      details: error.message || 'Unknown error',
    });
  }
};

