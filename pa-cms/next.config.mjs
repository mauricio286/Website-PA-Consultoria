import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Caminho absoluto convertido para barras normais (Windows usa '\', Turbopack precisa de '/')
const payloadConfigPath = path.resolve(__dirname, 'src', 'payload.config.ts').split(path.sep).join('/')

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
    // No Next.js 16 o alias precisa estar aqui (o withPayload só configura para Next.js 15)
    // Usamos caminho relativo com './' para evitar que o Turbopack no Linux/Docker
    // interprete o caminho absoluto (iniciando com '/') como importação relativa ao servidor.
    resolveAlias: {
      '@payload-config': './src/payload.config.ts',
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

// Passa o caminho explícito para o withPayload configurar o alias para Webpack também
export default withPayload(nextConfig, { configPath: payloadConfigPath })
