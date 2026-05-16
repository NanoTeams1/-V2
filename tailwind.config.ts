import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        konbini: {
          night: '#060b18',
          ink: '#0b1024',
          blue: '#1d355f',
          cyan: '#72f7ff',
          mint: '#9fffc8',
          red: '#ff4568',
          amber: '#ffd166',
          paper: '#d8e2dc',
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        crt: '0 0 24px rgba(114, 247, 255, 0.18), inset 0 0 42px rgba(0,0,0,0.72)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0.95' },
          '50%': { opacity: '0.82' },
          '52%': { opacity: '1' },
          '56%': { opacity: '0.7' },
        },
        drift: {
          '0%': { transform: 'translate3d(-1%, -1%, 0)' },
          '100%': { transform: 'translate3d(1%, 1%, 0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        flicker: 'flicker 5s infinite steps(1)',
        drift: 'drift 8s infinite alternate ease-in-out',
        scan: 'scan 6s infinite linear',
      },
    },
  },
  plugins: [],
};

export default config;
