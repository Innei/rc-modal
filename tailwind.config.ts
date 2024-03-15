import type { Config } from 'tailwindcss'

const twConfig: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
}
export default twConfig
