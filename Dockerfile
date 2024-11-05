# Utilizar a imagem oficial do Node.js como base
FROM node:16

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o arquivo package.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o código da aplicação para o diretório de trabalho
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Definir o comando para executar a aplicação
CMD ["npm", "start"]