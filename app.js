'use strict';
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/db'); 

app.set('port', process.env.PORT || 8080);

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'your_secret_key',  // これは独自のシークレットキーに変更してください
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // 実際のプロダクション環境では、secure: trueを推奨
}));

// ログインページを表示
app.get('/', function(req, res) {
    res.sendFile('./public/index.html', { root: __dirname });
});

app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const isAuthenticated = await db.authenticateUser(name, password);

    if (isAuthenticated) {
      req.session.user_id = await db.selectLoginUser(name,password);
      console.log('[app.js] ログイン成功');
      res.status(200).json({ message: 'ログイン成功' });
    } else {
      console.log('[app.js] ログイン失敗');
      res.status(401).json({ message: 'ログイン失敗' });
    }
  } catch (err) {
    console.error('[app.js] エラー', err);
    res.status(500).json({ message: 'エラーが発生しました' });
  }
});

app.get('/api/getUserId', (req, res) => {
  // セッションからuser_idを取得
  const userId = req.session.user_id;

  // セッションにuser_idが存在しない場合、エラーメッセージを返す
  if (!userId) {
      res.status(401).json({ message: 'ユーザーがログインしていません' });
      return;
  }

  // user_idをレスポンスとして返す
  res.json({ userId: userId });
});

app.post('/api/addTodo', (req, res) => {
  const {user_id, todo, start_time, deadline_time} = req.body;
  const todoValue = db.registerNewTodo(user_id, todo, start_time, deadline_time);
  console.log(todoValue);
  if (todoValue) {
    res.json({ success: true });
  } else {
    res.json({error: true})
  }
});

app.post('/api/updateTodoStatus', async (req, res) => {
  const { todoValue, is_finish } = req.body;

  try {
      await db.updateTodoStatus(todoValue, is_finish);
      res.json({ success: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update todo status.' });
  }
});

app.post('/api/deleteTodo', async (req, res) => {
  const { todoValue } = req.body;

  try {
      await db.setTodoDeleteTime(todoValue);
      res.json({ success: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete todo.' });
  }
});

// 8080番ポートで待ちうける
app.listen(app.get('port'), () => {
    console.log('[app.js] Running at Port ' + app.get('port') + '...');
});

