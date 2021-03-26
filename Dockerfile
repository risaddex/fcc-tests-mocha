FROM node:12.18-alpine
#create root
RUN mkdir -p /user/src/app
WORKDIR /app
# move src
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
