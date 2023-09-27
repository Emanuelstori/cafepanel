const {nextui} = require("@nextui-org/react");
import type { Config } from 'tailwindcss';
const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        myprimary: "var(--myprimary)",
        mysecondary: "var(--mysecondary)",
        mythird: "var(--mythird)",
        selected: "var(--selected)",
        content: "var(--content)"
      }
    },
  },
  plugins: [nextui()],
}
export default config
