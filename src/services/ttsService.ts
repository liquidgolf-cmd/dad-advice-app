export async function textToSpeech(text: string): Promise<string> {
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.audioUrl;
  } catch (error) {
    console.error('Failed to generate speech:', error);
    throw error;
  }
}

// Audio cache to avoid regenerating the same audio
const audioCache = new Map<string, string>();

export async function getCachedAudio(text: string): Promise<string> {
  if (audioCache.has(text)) {
    return audioCache.get(text)!;
  }

  const audioUrl = await textToSpeech(text);
  audioCache.set(text, audioUrl);
  return audioUrl;
}

export function clearAudioCache(): void {
  audioCache.clear();
}

