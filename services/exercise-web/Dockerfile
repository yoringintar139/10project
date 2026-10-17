FROM node:24-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build --workspace=@fitmotion/exercise-web
EXPOSE 5173
CMD ["npm", "run", "dev", "--workspace=@fitmotion/exercise-web", "--", "--host", "0.0.0.0"]
