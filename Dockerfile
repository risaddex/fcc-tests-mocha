FROM node:12.18-alpine
#create root
RUN mkdir -p /app
WORKDIR /app
# move src
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000
