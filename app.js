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

app.post('/login', (req, res) => {
  const { id, password } = req.body;

  // ここで実際の認証処理を行う
  // 仮の認証処理を例として追加します
  if (id === 's' && password === 's') {
    console.log('app.js ログイン成功');
    res.status(200).json({ message: 'ログイン成功' });
  } else {
    console.log('app.js ログイン失敗');
    res.status(401).json({ message: 'ログイン失敗' });
  }
});

// 8080番ポートで待ちうける
app.listen(app.get('port'), () => {
    console.log('[app.js] Running at Port ' + app.get('port') + '...');
});

