const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.set('port', process.env.PORT || 8080);

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// ログインページを表示
app.get('/', function(req, res) {
    res.sendFile('./public/index.html', { root: __dirname });
});

// ログイン認証を行うエンドポイント
app.post('/login', (req, res) => {
    const { id, password } = req.body;

    // ここで実際の認証処理を行う
    // ...

    // 認証成功時にtodo.htmlにリダイレクト
    res.redirect('/todo.html');
});

// 8080番ポートで待ちうける
app.listen(app.get('port'), () => {
    console.log('[app.js] Running at Port ' + app.get('port') + '...');
});

