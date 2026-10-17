FROM node:24-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build --workspace=@fitmotion/exercise-api && npm run catalog:init --workspace=@fitmotion/exercise-api && npm prune --omit=dev
ENV NODE_ENV=production
ENV EXERCISE_DB_PATH=/app/services/exercise-api/src/db/exercises.sqlite
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=@fitmotion/exercise-api"]
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/services/exercise-api/src/index.js"]
