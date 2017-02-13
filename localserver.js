var express = require('express');
var path = require('path');
var app = express();
var port = 8082;

// 加载静态文件
app.use(express.static('.'));

// 带路由地址刷新，返回index.html
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/h-ui-react-docs/index.html');
});

app.listen(port, function () {
  console.log('serve path, '+ __dirname);
  console.log("app listening on port \x1b[32m"+port+"\x1b[0m");
});