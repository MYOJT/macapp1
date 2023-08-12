'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/db'); 

app.set('port', process.env.PORT || 8080);

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ログインページを表示
app.get('/', function(req, res) {
    res.sendFile('./public/index.html', { root: __dirname });
});

app.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    const isAuthenticated = await db.authenticateUser(id, password);

    if (isAuthenticated) {
      console.log('app.js ログイン成功');
      res.status(200).json({ message: 'ログイン成功' });
    } else {
      console.log('app.js ログイン失敗');
      res.status(401).json({ message: 'ログイン失敗' });
    }
  } catch (err) {
    console.error('app.js エラー', err);
    res.status(500).json({ message: 'エラーが発生しました' });
  }
});

// 8080番ポートで待ちうける
app.listen(app.get('port'), () => {
    console.log('[app.js] Running at Port ' + app.get('port') + '...');
});

