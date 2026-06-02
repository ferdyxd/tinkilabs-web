// Script para convertir artículos MD a entradas TypeScript para blog-data.ts
import { readFileSync } from 'fs';

const BASE = '/home/alby/tinkilabs/marketing/seo/articulos';

const ARTICLES = [
  {
    file: 'como-hacer-lanzador-tapones.md',
    slug: 'como-hacer-lanzador-tapones',
    categoria: 'proyectos',
    coverEmoji: '🎯',
    fecha: '2026-06-02',
    tags: ['lanzador', 'gomas', 'física', 'proyectil', 'reciclaje'],
  },
  {
    file: 'como-hacer-catapulta-cuchara.md',
    slug: 'como-hacer-catapulta-cuchara',
    categoria: 'proyectos',
    coverEmoji: '🏗️',
    fecha: '2026-06-02',
    tags: ['catapulta', 'palancas', 'física', 'proyectil', 'reciclaje'],
  },
  {
    file: 'como-hacer-coche-goma-elastica.md',
    slug: 'como-hacer-coche-goma-elastica',
    categoria: 'proyectos',
    coverEmoji: '🚗',
    fecha: '2026-06-02',
    tags: ['coche', 'gomas', 'torsión', 'energía', 'reciclaje'],
  },
  {
    file: 'como-hacer-peonza-carton.md',
    slug: 'como-hacer-peonza-carton',
    categoria: 'proyectos',
    coverEmoji: '🌀',
    fecha: '2026-06-02',
    tags: ['peonza', 'giroscopio', 'rotación', 'física', 'cartón'],
  },
  {
    file: 'como-hacer-garra-pajitas.md',
    slug: 'como-hacer-garra-pajitas',
    categoria: 'proyectos',
    coverEmoji: '🦾',
    fecha: '2026-06-02',
    tags: ['garra', 'tendones', 'biomecánica', 'cartón', 'mecanismo'],
  },
];

function simpleMdToHtml(md) {
  let html = md;

  // bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // links [text](url)
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  // headings (### first to avoid conflict with ##)
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');

  // hr
  html = html.replace(/^---$/gm, '<hr>');

  // Split into paragraphs
  const lines = html.split('\n');
  const result = [];
  let inList = false;
  let listType = null; // 'ul' or 'ol'
  let listItems = [];

  function flushList() {
    if (!inList || listItems.length === 0) return;
    const tag = listType === 'ol' ? 'ol' : 'ul';
    result.push('<' + tag + '>');
    for (const item of listItems) {
      result.push('<li>' + item + '</li>');
    }
    result.push('</' + tag + '>');
    listItems = [];
    inList = false;
    listType = null;
  }

  for (const line of lines) {
    // Unordered list item
    const ulMatch = line.match(/^- (.+)$/);
    if (ulMatch) {
      if (inList && listType !== 'ul') flushList();
      inList = true;
      listType = 'ul';
      listItems.push(ulMatch[1]);
      continue;
    }

    // Ordered list item
    const olMatch = line.match(/^\d+\.\s(.+)$/);
    if (olMatch) {
      if (inList && listType !== 'ol') flushList();
      inList = true;
      listType = 'ol';
      listItems.push(olMatch[1]);
      continue;
    }

    // Not a list item — flush any open list
    if (inList) flushList();

    const trimmed = line.trim();
    if (trimmed === '') {
      continue; // skip blank lines, they'll be handled by block tags
    }

    // already a block tag
    if (trimmed.startsWith('<h') || trimmed.startsWith('<hr') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<li') || trimmed.startsWith('<p')) {
      result.push(trimmed);
      continue;
    }

    // wrap in <p>
    result.push('<p>' + trimmed + '</p>');
  }

  if (inList) flushList();

  return result.join('\n');
}

for (const art of ARTICLES) {
  const raw = readFileSync(BASE + '/' + art.file, 'utf-8');
  const lines = raw.split('\n');

  // Extract title (first # heading)
  let title = '';
  let contentStart = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('# ')) {
      title = lines[i].replace('# ', '').trim();
      contentStart = i + 1;
      break;
    }
  }

  // Skip metadata block: blockquote + image suggestion + surrounding ---
  // The metadata is: > **Keyword... lines, blank line, ---, **Imagen sugerida...**, ---
  let bodyStart = contentStart;
  let inMeta = true;
  for (let i = contentStart; i < lines.length; i++) {
    const line = lines[i].trim();
    if (inMeta) {
      // Skip blockquote lines
      if (line.startsWith('>')) continue;
      // Skip blank lines between metadata
      if (line === '') continue;
      // Skip --- separators
      if (line === '---') continue;
      // Skip image suggestion line
      if (line.startsWith('**Imagen sugerida')) continue;
      // If we reach here, metadata is done
      inMeta = false;
      bodyStart = i;
      break;
    }
  }
  // Skip any remaining blank lines after metadata
  while (bodyStart < lines.length && lines[bodyStart].trim() === '') {
    bodyStart++;
  }

  const body = lines.slice(bodyStart).join('\n');
  const html = simpleMdToHtml(body);

  // Generate excerpt (first <p> without HTML tags, max 150 chars)
  const firstP = html.match(/<p>(.+?)<\/p>/);
  let excerpt = '';
  if (firstP) {
    excerpt = firstP[1].replace(/<[^>]+>/g, '').trim();
    if (excerpt.length > 150) {
      excerpt = excerpt.substring(0, 147) + '...';
    }
  }

  // Estimate reading time (~200 words/min for Spanish)
  const wordCount = body.split(/\s+/).length;
  const lecturaMin = Math.max(3, Math.round(wordCount / 200));

  // Output as TypeScript object
  console.log('  {');
  console.log('    slug: \'' + art.slug + '\',');
  console.log('    titulo: \'' + title.replace(/'/g, "\\'") + '\',');
  console.log('    excerpt: \'' + excerpt.replace(/'/g, "\\'") + '\',');
  console.log('    contenido: `' + html.replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`,');
  console.log('    categoria: \'' + art.categoria + '\',');
  console.log('    autor: \'Tinki\',');
  console.log('    fecha: \'' + art.fecha + '\',');
  console.log('    lecturaMin: ' + lecturaMin + ',');
  console.log('    coverEmoji: \'' + art.coverEmoji + '\',');
  console.log('    tags: ' + JSON.stringify(art.tags) + ',');
  console.log('  },');
  console.log('');
}
