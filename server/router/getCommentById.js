var multer = require("multer");
var express = require('express');
var router = express.Router();
var querystring = require('querystring');//字符串转对象
var url =require("url");
var mysql = require('mysql');
var createConnection = require("./../createConnection.js");
router.post('/', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Credentials", "true");
    createConnection('select * from comment where e_id='+req.body.e_id, function (results) {
        res.json({
            results
        })
    });
});
module.exports = router;