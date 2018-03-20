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

var searchuserinfo= require("./editor/editor.js")
app.use('/editor', searchuserinfo);

var reglog= require("./router/reglog.js")
app.use('/reglog', reglog);//登录注册模块


app.set('jsonp callback name', 'JSON_CALLBACK');
app.listen(3456);
console.log("开启服务器");