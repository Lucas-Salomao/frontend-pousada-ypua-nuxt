# DEV
# FROM node:18-alpine

# # Defina o diretório de trabalho no container
# WORKDIR /app

# # Copie os arquivos de definição de dependências
# COPY package*.json ./

# # Instale as dependências do projeto
# RUN npm install

# # Copie o resto dos arquivos do projeto
# COPY . .

# # Exponha a porta padrão do Nuxt.js (geralmente 3000)
# EXPOSE 3000

# # Comando para iniciar a aplicação em modo de desenvolvimento
# CMD ["npm", "run", "dev"]

# PROD
# Etapa de build
FROM node:18-alpine AS builder

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos de definição de dependências
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o resto dos arquivos do projeto
COPY . .

# Construa a aplicação para produção
RUN npm run build

# Etapa de produção
FROM node:18-alpine

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos de build da etapa anterior
COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/nuxt.config.js ./
COPY --from=builder /app/static ./static

# Instale apenas as dependências de produção
RUN npm install --production

# Exponha a porta padrão do Nuxt.js
EXPOSE 3000

# Comando para iniciar a aplicação em produção
CMD ["npm", "start"]