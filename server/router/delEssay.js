var multer = require("multer");
var express = require('express');
var router = express.Router();
var querystring = require('querystring');//字符串转对象
var mysql = require('mysql');
var createConnection = require("./../createConnection.js");
router.post('/', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Credentials", "true");
    // console.log("images/userimg/" + strSrc);
    createConnection('delete from essayinfo where e_id="'+req.body.e_id+'"', function (results) {
        res.send({
            status:1,
            msg:"删除成功"
        });
    });
});
module.exports = router;