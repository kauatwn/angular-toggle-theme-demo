FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS deps
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build -- --configuration=production

FROM nginx:alpine AS final
COPY --from=build /app/dist/angular-toggle-theme-demo/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]