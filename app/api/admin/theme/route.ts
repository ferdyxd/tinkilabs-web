import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const themeFilePath = path.join(process.cwd(), 'lib', 'theme.ts');

// GET: devolver el tema actual
export async function GET() {
  try {
    const raw = fs.readFileSync(themeFilePath, 'utf-8');

    // Extraer la paleta activa
    const activeMatch = raw.match(/export const activePalette: PaletteName = '(\w+)'/);
    const activePalette = activeMatch ? activeMatch[1] : 'tinkilabs';

    // Extraer valores de la paleta activa del objeto palettes
    const palettesMatch = raw.match(/export const palettes[\s\S]*?};/);
    const palettesRaw = palettesMatch ? palettesMatch[0] : '';

    // Extraer tipografía
    const fontSansMatch = raw.match(/fontSans:\s*\[([^\]]+)\]/);

    return NextResponse.json({
      activePalette,
      palettesRaw,
      fullContent: raw,
    });
  } catch (err) {
    return NextResponse.json({ error: 'No se pudo leer el tema' }, { status: 500 });
  }
}

// POST: guardar cambios
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activePalette, palettes } = body;

    let content = fs.readFileSync(themeFilePath, 'utf-8');

    // Actualizar paleta activa
    if (activePalette) {
      content = content.replace(
        /export const activePalette: PaletteName = '\w+'/,
        `export const activePalette: PaletteName = '${activePalette}'`
      );
    }

    // Actualizar colores de paletas
    if (palettes) {
      for (const [name, colors] of Object.entries(palettes)) {
        const c = colors as Record<string, string>;
        for (const [key, value] of Object.entries(c)) {
          if (key === 'name') continue;
          const regex = new RegExp(`(${name}:\\s*\\{[^}]*?${key}:\\s*')([^']+)(')`, 's');
          content = content.replace(regex, `$1${value}$3`);
        }
      }
    }

    // Guardar
    fs.writeFileSync(themeFilePath, content, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'No se pudo guardar' }, { status: 500 });
  }
}
