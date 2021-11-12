FROM node:16.13.0-bullseye

RUN apt-get update
RUN apt-get install -y build-essential mecab libmecab-dev mecab-ipadic-utf8 sudo git make curl xz-utils file fonts-mplus

WORKDIR /mecab-ipadic-neologd
RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git
RUN cd mecab-ipadic-neologd && ./bin/install-mecab-ipadic-neologd -n -y

WORKDIR /ai
COPY . ./
RUN yarn install
RUN yarn build
RUN ln -s /usr/share/fonts/truetype/mplus/mplus-1p-regular.ttf font.ttf

CMD ["npm", "start"]
