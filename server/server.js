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

////////////////////////////////
var editor= require("./editor/editor.js")
app.use('/editor', editor);//富文本编辑器文本插入模块
var editorimg= require("./editor/editorimg.js")
app.use('/editorimg', editorimg);//富文本编辑器图片插入模块
var udeditor= require("./editor/udeditor.js")
app.use('/udeditor', udeditor);//富文本编辑器文本修改
var udeditorimg= require("./editor/udeditorimg.js")
app.use('/udeditorimg', udeditorimg);//富文本编辑器图片修改
/////////////////////////////////

var getEssay= require("./router/getEssay.js")
app.use('/getEssay', getEssay);//主页获取文章概要列表

var getArticle= require("./router/getArticle.js")
app.use('/getArticle', getArticle);//文章详情

var getEssayByUser= require("./router/getEssayByUser.js")
app.use('/getEssayByUser', getEssayByUser);//用户文章列表

var delEssay= require("./router/delEssay.js")
app.use('/delEssay', delEssay);//主页获取文章概要列表

var updateUserImgByName= require("./router/updateUserImgByName.js")
app.use('/updateUserImgByName', updateUserImgByName);//修改用户头像

var updateUserInfoByName= require("./router/updateUserInfoByName.js")
app.use('/updateUserInfoByName', updateUserInfoByName);//修改用户信息

var insertComment= require("./router/insertComment.js")
app.use('/insertComment', insertComment);//文章评论

var getCommentById= require("./router/getCommentById.js")
app.use('/getCommentById', getCommentById);//文章评论列表

var showUserByName= require("./router/showUserByName.js")
app.use('/showUserByName', showUserByName);//用户信息查询

app.set('jsonp callback name', 'JSON_CALLBACK');
app.listen(9000);
console.log("开启服务器");