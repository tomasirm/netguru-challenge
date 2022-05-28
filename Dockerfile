FROM node
WORKDIR /src
COPY . /src
COPY .env .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
