FROM node:20-alpine
WORKDIR /src
COPY package*.json ./
COPY . .
EXPOSE 5000
RUN npm ci --only=production

# Health check
HEALTHCHECK --interval=60s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["npm", "start"]