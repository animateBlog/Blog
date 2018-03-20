var multer = require("multer");
var express = require('express');
var router = express.Router();
var querystring = require('querystring');//字符串转对象
var mysql = require('mysql');
var connection = require("./../createsql.js");
router.post('/', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Credentials", "true");
    // console.log("images/userimg/" + strSrc);
    connection().query('delete from essayinfo where e_id="'+e_id+'"', function (error, results, fields) {
        if (error) throw error;
        // console.log(str)
        res.send("删除成功");
    });
});
module.exports = router;