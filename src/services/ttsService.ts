// Remove emojis from text for TTS
function removeEmojis(text: string): string {
  // Remove emoji and other symbols using Unicode ranges
  return text
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Misc Symbols and Pictographs
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport and Map
    .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Flags
    .replace(/[\u{2600}-\u{26FF}]/gu, '') // Misc symbols
    .replace(/[\u{2700}-\u{27BF}]/gu, '') // Dingbats
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols and Pictographs
    .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '') // Chess Symbols
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // Symbols and Pictographs Extended-A
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '') // Variation Selectors
    .trim()
    .replace(/\s+/g, ' '); // Clean up extra spaces
}

// Clean text and add SSML pauses for natural speech
function prepareTextForTTS(text: string): string {
  // Remove quotes and brackets, keep punctuation for natural pauses
  let cleaned = text
    .replace(/["'`]/g, '') // Remove quotes
    .replace(/[()[\]{}]/g, ' ') // Remove brackets
    .replace(/…/g, '...') // Convert ellipsis to periods
    .replace(/\s+/g, ' ') // Clean up extra spaces
    .trim();
  
  // Add SSML pauses after punctuation for natural speech flow
  cleaned = cleaned
    .replace(/\./g, '.<break time="500ms"/>') // 500ms pause after periods
    .replace(/,/g, ',<break time="300ms"/>') // 300ms pause after commas
    .replace(/!/g, '!<break time="500ms"/>') // 500ms pause after exclamations
    .replace(/\?/g, '?<break time="500ms"/>') // 500ms pause after questions
    .replace(/;/g, ';<break time="400ms"/>') // 400ms pause after semicolons
    .replace(/:/g, ':<break time="300ms"/>'); // 300ms pause after colons
  
  // Wrap in SSML speak tag
  return `<speak>${cleaned}</speak>`;
}

export async function textToSpeech(text: string): Promise<string> {
  try {
    // Remove emojis and prepare text with SSML pauses
    let cleanText = removeEmojis(text);
    cleanText = prepareTextForTTS(cleanText);
    
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: cleanText }),
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

