FROM node:20-alpine

RUN apk add --no-cache postgresql-client bash
WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
RUN chmod +x wait-for-db.sh
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Wait for db -> initialize it -> start the application
CMD ["./wait-for-db.sh", "db", "sh", "-c", "npm run init-db && npm start"]