FROM node:18-alpine

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos de definição de dependências
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o resto dos arquivos do projeto
COPY . .

# Exponha a porta padrão do Nuxt.js (geralmente 3000)
EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]