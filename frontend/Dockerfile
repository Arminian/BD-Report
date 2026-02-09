FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build


FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit-dev

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["npm", "start"]