export interface ParsedJustificationPoint {
  number: number;
  label: string;
  content: string;
  isAction?: boolean;
}

export function parseJustificationText(text: string): ParsedJustificationPoint[] {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const patterns = [
    /\((\d+)\)\s*([^:]+):\s*([^;(]+?)(?=\s*\(\d+\)|$)/g,
    /(\d+)\.\s*([^:]+):\s*([^;.]+?)(?=\s*\d+\.|$)/g,
    /\((\d+)\)\s*([^:]+):\s*(.+?)(?=\s*\(\d+\)|$)/g,
  ];

  let matches: ParsedJustificationPoint[] = [];

  for (const pattern of patterns) {
    const tempMatches: ParsedJustificationPoint[] = [];
    let match;

    while ((match = pattern.exec(text)) !== null) {
      const number = parseInt(match[1], 10);
      const label = match[2].trim();
      const content = match[3].trim();

      tempMatches.push({
        number,
        label,
        content,
        isAction: number === 4 || label.toLowerCase().includes('action') || label.toLowerCase().includes('improve')
      });
    }

    if (tempMatches.length > 0) {
      matches = tempMatches;
      break;
    }
  }

  if (matches.length === 0 && text.includes(';')) {
    const parts = text.split(';').map(p => p.trim()).filter(p => p.length > 0);

    matches = parts.map((part, index) => {
      const colonIndex = part.indexOf(':');
      if (colonIndex > 0) {
        const label = part.substring(0, colonIndex).trim();
        const content = part.substring(colonIndex + 1).trim();
        return {
          number: index + 1,
          label,
          content,
          isAction: index === 3 || label.toLowerCase().includes('action') || label.toLowerCase().includes('improve')
        };
      }

      return {
        number: index + 1,
        label: `Point ${index + 1}`,
        content: part,
        isAction: index === 3
      };
    });
  }

  if (matches.length === 0 && text.length > 100) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    if (sentences.length >= 3) {
      matches = sentences.map((sentence, index) => ({
        number: index + 1,
        label: ['Evidence', 'Benchmark', 'Key Factor', 'Action'][index] || `Point ${index + 1}`,
        content: sentence.trim(),
        isAction: index === 3
      }));
    }
  }

  return matches.length > 0 ? matches : [];
}

export function shouldParseJustification(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const hasNumberedPoints = /\(\d+\)|^\d+\./m.test(text);
  const hasMultipleSentences = (text.match(/[.!?]/g) || []).length >= 2;
  const hasSemicolons = text.includes(';');
  const isLongText = text.length > 150;

  return hasNumberedPoints || (hasSemicolons && hasMultipleSentences) || isLongText;
}
