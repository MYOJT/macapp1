# DockerイメージのベースとなるAlpine Linuxを指定
FROM node:14-alpine

# アプリケーションのソースコードをコピー
COPY . /app
WORKDIR /app

# 必要なパッケージをインストール
RUN apk --no-cache add bash curl postgresql-client

# bashシェルを使用するために /bin/sh を /bin/bash に変更
RUN ln -sf /bin/bash /bin/sh

# アプリケーションの依存パッケージをインストール
RUN npm install

# シェルを起動するようにCMDを変更
CMD bash -c "npm start"