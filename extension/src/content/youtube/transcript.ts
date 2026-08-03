

import type { TranscriptSegment } from "../../shared/messages";
import { fetchYouTubeTranscript } from "./youtubeTranscript";

export async function getTranscript(videoId: string): Promise<TranscriptSegment[]> {
  return fetchYouTubeTranscript(videoId);
}
 