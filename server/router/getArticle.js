var multer = require("multer");
var express = require('express');
var router = express.Router();
var querystring = require('querystring');//字符串转对象
var mysql = require('mysql');
var fs=require("fs");
var createConnection = require("./../createConnection.js");
router.post('/', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Credentials", "true");
    // console.log("images/userimg/" + strSrc);
    createConnection('select * from essayinfo where e_id="' + req.body.e_id + '"', function (results) {
        // console.log(results[0])
        var data = '';
        var readerStream = fs.createReadStream("../src/txt/"+results[0].e_content)
        readerStream.on('data', function (chunk) {
            data += chunk;
        });
        readerStream.on('end', function () {
            var obj={
                e_title:results[0].e_title,
                e_describe:results[0].e_describe,
                e_content:data,
                e_img:results[0].e_img,
                u_name:results[0].u_name,
                e_time:results[0].e_time,
            }
            res.json({
                obj
            })
        });
        
    })
});
module.exports = router;