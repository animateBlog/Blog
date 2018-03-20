var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))
// parse application/json
app.use(bodyParser.json());



var reglog= require("./router/reglog.js")
app.use('/reglog', reglog);//登录注册模块


var editor= require("./editor/editor.js")
app.use('/editor', editor);//富文本编辑器文本插入模块

var editorimg= require("./editor/editorimg.js")
app.use('/editorimg', editorimg);//富文本编辑器图片插入模块


app.set('jsonp callback name', 'JSON_CALLBACK');
app.listen(3456);
console.log("开启服务器");