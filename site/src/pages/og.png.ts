import type { APIContext } from 'astro';
import { ImageResponse } from '@vercel/og';

export const prerender = false;

const FONT_REGULAR = 'https://rsms.me/inter/font-files/Inter-Regular.woff';
const FONT_SEMIBOLD = 'https://rsms.me/inter/font-files/Inter-SemiBold.woff';

let fontCache: { regular: ArrayBuffer; semibold: ArrayBuffer } | null = null;

async function loadFonts() {
  if (fontCache) return fontCache;
  const [regular, semibold] = await Promise.all([
    fetch(FONT_REGULAR).then((r) => r.arrayBuffer()),
    fetch(FONT_SEMIBOLD).then((r) => r.arrayBuffer()),
  ]);
  fontCache = { regular, semibold };
  return fontCache;
}

const DEFAULT_TITLE = 'John Montgomery, DevAi';
const DEFAULT_DESCRIPTION =
  'Quant research pipelines, AI and agent systems, and 22 years of software practice.';

const MAX_TITLE = 120;
const MAX_DESCRIPTION = 200;

const COLORS = {
  bg: '#fbfbfb',
  brand: '#2d5bff',
  ink: '#242424',
  muted: '#6b7280',
  faded: '#9ca3af',
  ruler: '#e1e2e3',
};

export async function GET({ url }: APIContext): Promise<Response> {
  const rawTitle = url.searchParams.get('title') ?? DEFAULT_TITLE;
  const rawDescription = url.searchParams.get('description') ?? DEFAULT_DESCRIPTION;
  const title = rawTitle.slice(0, MAX_TITLE);
  const description = rawDescription.slice(0, MAX_DESCRIPTION);

  const fonts = await loadFonts();

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '80px',
          background: COLORS.bg,
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', alignItems: 'center', gap: '14px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: COLORS.brand,
                    },
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { fontSize: '32px', fontWeight: 600, color: COLORS.ink },
                    children: 'DevAi',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '24px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '64px',
                      fontWeight: 600,
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      color: COLORS.ink,
                      maxWidth: '1040px',
                    },
                    children: title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '30px',
                      lineHeight: 1.4,
                      color: COLORS.muted,
                      maxWidth: '1040px',
                    },
                    children: description,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '24px',
                borderTop: `1px solid ${COLORS.ruler}`,
                fontSize: '24px',
                color: COLORS.faded,
              },
              children: [
                {
                  type: 'span',
                  props: { style: { color: COLORS.ink }, children: 'John Montgomery' },
                },
                { type: 'span', props: { children: 'devai.co.za' } },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: fonts.regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: fonts.semibold, weight: 600, style: 'normal' },
      ],
      headers: {
        'Cache-Control': 'public, immutable, no-transform, s-maxage=86400',
      },
    },
  );
}
