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
    var date=new Date();
    var dayStr=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
    createConnection(`INSERT INTO  COMMENT(c_name,c_con,c_email,e_id,c_time) 
    VALUES("${req.body.c_name}","${req.body.c_con}","${req.body.c_email}",${req.body.e_id},"${dayStr}")
    `, function (results) {
        createConnection('select * from comment where e_id='+req.body.e_id, function (results) {
            res.json({
                results
            })
        })
    })
});
module.exports = router;