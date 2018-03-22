var express = require('express');
var router = express.Router();
const url = require('url');
var querystring = require('querystring');//字符串转对象
var fs = require("fs");
var createConnection = require("./../createConnection.js");
router.post('/', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");//允许跨域
  res.setHeader("Content-Type", "text/plain;charset=UTF-8");//字符编码
  var strTXT = Date.now()+'.txt';
  // console.log(111)
  var writerStream = fs.createWriteStream('../src/txt/'+strTXT);
  //写
  writerStream.write(req.body.e_content, 'UTF8');
  //监听写完
  writerStream.end('finish', function () {
    console.log("写入完成。");
    // console.log(req.headers)
    var data=new Date();
    var dayStr=data.getFullYear()+'/'+(data.getMonth()+1)+'/'+data.getDate();
    console.log(dayStr);
    createConnection(`UPDATE essayinfo SET e_title='${req.body.e_title}',e_describe='${req.body.e_describe}',e_content='${strTXT}',u_name='${req.body.u_name}',e_time='${dayStr}' where e_id=${req.body.e_id}`, function (results) {
      var obj = {
        status: 1,
        msg: "发表成功"
      }
      console.log("发表成功");
      res.send(obj);
    });
  });
});
module.exports = router;