import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs/promises';
import path from 'node:path';

const fontBoldURL = 'https://cdn.jsdelivr.net/npm/@fontsource/jost@5.0.0/files/jost-latin-900-normal.woff';
const fontRegURL = 'https://cdn.jsdelivr.net/npm/@fontsource/jost@5.0.0/files/jost-latin-500-normal.woff';

export const GET: APIRoute = async () => {
  const fontBold = await fetch(fontBoldURL).then(res => res.arrayBuffer());
  const fontReg = await fetch(fontRegURL).then(res => res.arrayBuffer());

  const logoPath = path.resolve(process.cwd(), 'public/logo.png');
  let logoBase64 = '';
  try {
    const logoBuffer = await fs.readFile(logoPath);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  } catch (e) {
    console.error('Logo not found at:', logoPath);
  }

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%', width: '100%',
          display: 'flex', flexDirection: 'column',
          // TONE-ON-TONE: Deep Canopy Green (Instead of Black)
          backgroundColor: '#0f1c16', 
        },
        children: [
          
          // === ZONE 1: BRAND HEADER (Top 65%) ===
          {
            type: 'div',
            props: {
              style: {
                display: 'flex', flex: '65', 
                width: '100%',
                // Primary Brand Green
                backgroundColor: '#243b30', 
                alignItems: 'center', justifyContent: 'center',
                gap: '40px',
              },
              children: [
                logoBase64 ? {
                  type: 'img',
                  props: {
                    src: logoBase64, width: 150, height: 150,
                    style: { borderRadius: '12px', objectFit: 'contain' }
                  }
                } : null,
                
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', lineHeight: '1' },
                    children: [
                      { type: 'div', props: { children: 'HEATSHOCK', style: { color: 'white', fontFamily: 'Jost', fontWeight: 900, fontSize: '80px', letterSpacing: '0.3em' } } },
                      { type: 'div', props: { children: 'PINEAPPLE', style: { color: '#ffd700', fontFamily: 'Jost', fontWeight: 900, fontSize: '80px', marginTop: '12px', letterSpacing: '0.4065em' } } },
                    ]
                  }
                }
              ]
            }
          },

          // === ZONE 2: THE 3 PILLARS (Bottom 35%) ===
          {
            type: 'div',
            props: {
              style: {
                display: 'flex', flex: '35', 
                width: '100%', flexDirection: 'row',
                // Matches container background
                backgroundColor: '#0f1c16',
                borderTop: '4px solid #ffd700',
              },
              children: [
                // BLOCK 1: Biochemistry
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' },
                    children: [
                      { type: 'div', props: { children: 'BIOCHEMISTRY', style: { color: 'white', fontFamily: 'JostReg', fontSize: '24px', letterSpacing: '0.2em', opacity: 0.9 } } },
                    ]
                  }
                },
                // BLOCK 2: Computation
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' },
                    children: [
                      { type: 'div', props: { children: 'COMPUTATION', style: { color: 'white', fontFamily: 'JostReg', fontSize: '24px', letterSpacing: '0.2em', opacity: 0.9 } } },
                    ]
                  }
                },
                // BLOCK 3: Photography
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'center' },
                    children: [
                       { type: 'div', props: { children: 'PHOTOGRAPHY', style: { color: 'white', fontFamily: 'JostReg', fontSize: '24px', letterSpacing: '0.2em', opacity: 0.9 } } },
                    ]
                  }
                }
              ]
            }
          }

        ]
      }
    },
    {
      width: 1200, height: 630,
      fonts: [
        { name: 'Jost', data: fontBold, weight: 900, style: 'normal' },
        { name: 'JostReg', data: fontReg, weight: 500, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return new Response(resvg.render().asPng(), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
  });
};