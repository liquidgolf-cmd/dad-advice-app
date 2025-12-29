export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

export async function searchYouTubeVideos(query: string): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch('/api/youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.videos;
  } catch (error) {
    console.error('Failed to search YouTube:', error);
    return [];
  }
}

// Explicit type export
export type { YouTubeVideo };

