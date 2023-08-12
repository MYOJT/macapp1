【開発用】
・docker停止
zsh stop_docker.sh
・docker起動
zsh start_docker.sh

【確認用】
・ログイン
curl -X POST -H "Content-Type: application/json" -d '{"name":"s", "password":"s"}' http://localhost:3000/login

・DB
psql -U postgres
\c posdb
sqlは末尾の;は必須。
