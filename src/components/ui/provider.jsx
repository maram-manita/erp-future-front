import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e7f8f6' },
          100: { value: '#c8f0eb' },
          200: { value: '#a0e5de' },
          300: { value: '#70d8cf' },
          400: { value: '#43cabc' },
          500: { value: '#13b9a7' },
          600: { value: '#0f9485' },
          700: { value: '#0d7468' },
          800: { value: '#0c5c53' },
          900: { value: '#0a4b44' },
          950: { value: '#052f2b' },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.brand.500}' },
          contrast: { value: 'white' },
          fg: { value: '{colors.brand.700}' },
          muted: { value: '{colors.brand.100}' },
          subtle: { value: '{colors.brand.200}' },
          emphasized: { value: '{colors.brand.300}' },
          focusRing: { value: '{colors.brand.500}' },
        },
      },
    },
  },
})

const system = createSystem(defaultConfig, config)

export function Provider({ children }) {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  )
}
