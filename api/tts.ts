import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export default async function handler(req: any, res: any) {
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
    const client = new TextToSpeechClient({
      apiKey: process.env.GOOGLE_CLOUD_TTS_API_KEY,
    });

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Neural2-D', // Warm male voice
        ssmlGender: 'MALE',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        pitch: 0,
        speakingRate: 1.0,
      },
    });

    if (!response.audioContent) {
      throw new Error('No audio content received');
    }

    // Convert to base64
    const audioBase64 = Buffer.from(response.audioContent).toString('base64');
    const audioUrl = `data:audio/mp3;base64,${audioBase64}`;

    res.status(200).json({ audioUrl });
  } catch (error: any) {
    console.error('TTS API error:', error);
    res.status(500).json({ 
      error: 'Failed to generate speech',
      details: error.message,
    });
  }
}

