import type { TranscriptSegment } from "../../shared/messages";

function decodeHTMLEntities(text: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function extractCaptionTracksFromHtml(html: string): any[] | null {
  const index = html.indexOf('captionTracks');
  if (index === -1) return null;

  const startIndex = html.indexOf('[', index);
  if (startIndex === -1) return null;

  let bracketCount = 0;
  let endIndex = -1;

  for (let i = startIndex; i < html.length; i++) {
    if (html[i] === '[') bracketCount++;
    else if (html[i] === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }

  if (endIndex !== -1) {
    let jsonStr = html.substring(startIndex, endIndex);
    try {
      return JSON.parse(jsonStr);
    } catch {
      try {
        jsonStr = jsonStr.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        return JSON.parse(jsonStr);
      } catch (e) {
        console.error("Failed to parse extracted captionTracks JSON:", e);
      }
    }
  }

  return null;
}


export async function fetchYouTubeTranscript(videoId: string): Promise<TranscriptSegment[]> {
  let captionTracks: any[] | null = null;

  // 1. Try extracting captionTracks from page DOM script tags
  const scripts = Array.from(document.querySelectorAll("script"));
  for (const script of scripts) {
    if (script.textContent && script.textContent.includes("captionTracks")) {
      captionTracks = extractCaptionTracksFromHtml(script.textContent);
      if (captionTracks) break;
    }
  }

  // 2. Fallback: fetch watch page HTML directly from user's browser session
  if (!captionTracks) {
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await response.text();
    captionTracks = extractCaptionTracksFromHtml(html);
  }

  if (!captionTracks || captionTracks.length === 0) {
    throw new Error("No transcripts or captions available for this video.");
  }

  // Find preferred track (English or first track available)
  const track =
    captionTracks.find((t: any) => t.languageCode === "en" || t.languageCode?.startsWith("en")) ||
    captionTracks[0];

  if (!track || !track.baseUrl) {
    throw new Error("Transcript track URL not found.");
  }

  // Fetch the caption track XML/JSON
  const trackUrl = track.baseUrl;
  const trackRes = await fetch(trackUrl);
  const trackText = await trackRes.text();

  const segments: TranscriptSegment[] = [];

  if (trackText.trim().startsWith("{")) {
    // JSON3 format
    try {
      const json = JSON.parse(trackText);
      if (json.events) {
        for (const event of json.events) {
          if (event.segs && event.segs.length > 0) {
            const text = event.segs.map((s: any) => s.utf8 || "").join("").trim();
            if (text && text !== "\n") {
              segments.push({
                text: decodeHTMLEntities(text),
                start: (event.tStartMs || 0) / 1000,
                duration: (event.dDurationMs || 0) / 1000,
              });
            }
          }
        }
      }
    } catch (e) {
      console.error("Error parsing JSON3 caption track:", e);
    }
  } else {
    // XML format (<text start="0.1" dur="2.3">...</text>)
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(trackText, "text/xml");
    const textNodes = Array.from(xmlDoc.getElementsByTagName("text"));

    for (const node of textNodes) {
      const rawText = node.textContent || "";
      const text = decodeHTMLEntities(rawText.replace(/[\r\n]+/g, " ").trim());
      const start = parseFloat(node.getAttribute("start") || "0");
      const duration = parseFloat(node.getAttribute("dur") || "0");

      if (text) {
        segments.push({
          text,
          start,
          duration,
        });
      }
    }
  }

  if (segments.length === 0) {
    throw new Error("Transcript was found but contained no readable text segments.");
  }

  return segments;
}

