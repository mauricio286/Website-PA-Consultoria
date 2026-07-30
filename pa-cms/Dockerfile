# ── Estágio 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências antes de copiar o restante (aproveita cache do Docker)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copia o código e faz o build
COPY . .
ENV NEXT_PUBLIC_SERVER_URL=https://pa-cms-187712348679.us-central1.run.app
RUN npm run build

# ── Estágio 2: Produção ───────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copia apenas o necessário do estágio de build para o servidor Next.js
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/payload-types.ts ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

# Porta padrão do Cloud Run
EXPOSE 3000

# Inicia o servidor Next.js em modo produção com limpeza de flag de dev e migração automática via Next.js
CMD ["sh", "-c", "node src/clean-migration-flag.js && npx next start -p 3000"]
