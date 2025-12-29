import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, topic, imageData, systemPrompt } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  if (!systemPrompt) {
    return res.status(400).json({ error: 'System prompt is required' });
  }

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Build content array
    const content = [];
    
    // Add image if provided
    if (imageData) {
      const base64Data = imageData.split(',')[1];
      const mediaType = imageData.split(';')[0].split(':')[1];
      
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64Data,
        },
      });
    }

    // Add the latest user message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      content.push({
        type: 'text',
        text: lastMessage.content,
      });
    }

    // Build conversation history
    const conversationMessages = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'dad' ? 'assistant' : 'user',
      content: msg.content,
    }));

    // Add current message with image
    conversationMessages.push({
      role: 'user',
      content,
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: conversationMessages,
    });

    const textContent = response.content.find((c) => c.type === 'text');
    const messageText = textContent?.text || '';

    // Parse response indicators
    const needsProfessional = /PRO_RECOMMENDED/i.test(messageText);
    const videoMatch = messageText.match(/VIDEO_HELPFUL:\s*(.+?)(?:\n|$)/i);
    const moodMatch = messageText.match(/MOOD:\s*(\w+)/i);

    // Clean message text
    const cleanedMessage = messageText
      .replace(/^(DIY_OK|PRO_RECOMMENDED)\s*/i, '')
      .replace(/VIDEO_HELPFUL:.*?(\n|$)/gi, '')
      .replace(/MOOD:.*?(\n|$)/gi, '')
      .trim();

    // Extract professional type
    let professionalType;
    if (needsProfessional) {
      if (/electrician/i.test(messageText)) professionalType = 'electrician';
      else if (/plumber/i.test(messageText)) professionalType = 'plumber';
      else if (/mechanic/i.test(messageText)) professionalType = 'mechanic';
      else if (/therapist|counselor/i.test(messageText)) professionalType = 'therapist';
      else if (/lawyer|attorney/i.test(messageText)) professionalType = 'lawyer';
    }

    res.status(200).json({
      message: cleanedMessage,
      audioText: cleanedMessage,
      needsProfessional,
      professionalType,
      safetyLevel: needsProfessional ? 'professional_required' : 'safe_diy',
      videoSuggestion: videoMatch ? videoMatch[1].trim() : undefined,
      mood: moodMatch ? moodMatch[1].toLowerCase() : 'idle',
    });
  } catch (error) {
    console.error('Claude API error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to get response from Dad',
      details: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}

