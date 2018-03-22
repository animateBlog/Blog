var multer = require("multer");
var express = require('express');
var router = express.Router();
var querystring = require('querystring');//字符串转对象
var mysql = require('mysql');
var createConnection = require("./../createConnection.js");
router.post('/',function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Credentials", "true");
    createConnection(`update userinfo set u_name="${req.body.u_name}",u_email="${req.body.u_email}",u_introduce="${req.body.u_introduce}" where u_name="${req.body.u_name}"`, function (results) {
        res.send("修改成功");
    })
});
module.exports = router;