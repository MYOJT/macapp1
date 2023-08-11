# DockerイメージのベースとなるAlpine Linuxを指定
FROM node:14-alpine

# アプリケーションのソースコードをコピー
COPY . /app
WORKDIR /app

# 必要なパッケージをインストール
RUN apk --no-cache add bash curl postgresql-client

# アプリケーションの依存パッケージをインストール
RUN npm install

# シェルを起動するようにCMDを変更
CMD ["/bin/sh"]

