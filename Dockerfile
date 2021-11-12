FROM node:16.13.0-bullseye

WORKDIR /ai

RUN apt-get update
RUN apt-get install -y build-essential mecab mecab-ipadic fonts-mplus

COPY . ./
RUN yarn install
RUN yarn build
RUN ln -s /usr/share/fonts/truetype/mplus/mplus-1p-regular.ttf font.ttf

CMD ["npm", "start"]
