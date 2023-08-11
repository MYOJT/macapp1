// 必要なモジュールをインポートする
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

// 8080番ポートで待ちうける
app.listen(app.get('port'), () => {
    console.log('[app.js] Running at Port '+ app.get('port') +'...');
  });
  //systemLogger.info("Express start");
  app.get('/', function(req, res) {
    res.sendFile('./public/index.html', { root: __dirname });
  });

