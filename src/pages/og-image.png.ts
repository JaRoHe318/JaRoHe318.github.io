import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs/promises';

// Fetch Jost Bold
const fontURL = 'https://cdn.jsdelivr.net/npm/@fontsource/jost@5.0.0/files/jost-latin-700-normal.woff';

export const GET: APIRoute = async () => {
  const fontFile = await fetch(fontURL);
  if (!fontFile.ok) throw new Error('Failed to fetch font');
  const fontData = await fontFile.arrayBuffer();

  // Read Logo
  const logoUrl = new URL('../../public/android-chrome-512x512.png', import.meta.url);
  const logoBuffer = await fs.readFile(logoUrl);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  const svg = await satori(
    {
      type: 'div',
      props: {
        children: [
          // BACKGROUND: Petrol Blue Gradient
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: '#11221C', 
                backgroundImage: 'radial-gradient(circle at center, #2d5a45 0%, #11221C 100%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              },
            },
          },
          // CONTENT CARD
          {
            type: 'div',
            props: {
              style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '4px solid #FCD34D', // Gold
                backgroundColor: 'rgba(17, 34, 28, 0.85)',
                padding: '50px 80px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              },
              children: [
                // LOGO
                {
                  type: 'img',
                  props: {
                    src: logoBase64, width: 100, height: 100,
                    style: { marginBottom: '25px', borderRadius: '12px' },
                  },
                },
                // TITLE (SPLIT COLOR)
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: '54px', 
                      color: '#ffffff', // Default color for first part
                      marginBottom: '15px',
                      fontFamily: 'Jost', 
                      textAlign: 'center', 
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      display: 'flex', // Ensures spans sit on same line
                      gap: '12px',     // Space between words
                    },
                    children: [
                      {
                        type: 'span',
                        props: { children: 'Heat Shock' }
                      },
                      {
                        type: 'span',
                        props: { 
                          children: 'Pineapple',
                          style: { color: '#FCD34D' } // BRAND GOLD
                        }
                      }
                    ]
                  },
                },
                // SUBTITLE
                {
                  type: 'h2',
                  props: {
                    children: 'Biochemistry  ·  Computation  ·  Photography',
                    style: {
                      fontSize: '22px', color: '#FCD34D', textTransform: 'uppercase',
                      letterSpacing: '0.15em', fontFamily: 'Jost', textAlign: 'center',
                    },
                  },
                },
                // DIVIDER
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '100px', height: '2px', backgroundColor: '#FCD34D',
                      marginTop: '30px', marginBottom: '30px',
                    }
                  }
                },
                // DOMAIN
                {
                  type: 'div',
                  props: {
                    children: 'heatshockpineapple.com',
                    style: {
                      fontSize: '20px', color: '#94a3b8', fontFamily: 'Jost', letterSpacing: '0.05em',
                    },
                  },
                },
              ],
            },
          },
        ],
        style: {
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000',
        },
      },
    } as any,
    {
      width: 1200, height: 630,
      fonts: [{ name: 'Jost', data: fontData, style: 'normal' }],
    }
  );

  const resvg = new Resvg(svg);
  return new Response(resvg.render().asPng() as any, {
    headers: { 'Content-Type': 'image/png' },
  });
};