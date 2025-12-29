import { DadResponse, Message, Topic } from '../types';
import { DAD_SYSTEM_PROMPT } from '../utils/dadPersonality';

export async function sendMessageToDad(
  messages: Message[],
  topic: Topic,
  imageData?: string
): Promise<DadResponse> {
  try {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        topic,
        imageData,
        systemPrompt: DAD_SYSTEM_PROMPT(topic),
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as DadResponse;
  } catch (error) {
    console.error('Failed to get response from Dad:', error);
    throw error;
  }
}

