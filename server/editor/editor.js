var express = require('express');
var router = express.Router();
const url = require('url');
var querystring = require('querystring');//字符串转对象
// var body=
var connection = require("./../createsql.js");

router.post('/', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");//允许跨域
  res.setHeader("Content-Type", "text/plain;charset=UTF-8");//字符编码
  connection().query('INSERT INTO essayinfo SET ?',{
    e_title:req.body.e_title,
    e_describe:req.body.e_describe,
    e_content:req.body.e_content,
    e_img:imgSrc,
    u_name:req.body.u_name
  } ,function (error, results, fields) {
    if (error) throw error;
    // console.log(results[0]);
    var obj={
      status:1,
      msg:"发表成功"
    }
    res.json({
      obj
    })
  });
});
module.exports = router;