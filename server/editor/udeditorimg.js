var multer = require("multer");
var express = require('express');
var router = express.Router();
var querystring = require('querystring');//字符串转对象
var mysql = require('mysql');
var connection = require("./../createsql.js");
var createConnection= require("./../createConnection.js")
var strSrc = '';
var storage = multer.diskStorage({
    //上传的文件夹
    destination: (req, file, cb) => {
        cb(null, '../src/images/essayimg');
    },
    //保存的名字
    filename: (req, file, cb) => {
        // console.log(req,file);
        strSrc = Date.now() + "-" + file.originalname;
        cb(null, Date.now() + "-" + file.originalname);
    }
})
var uploads = multer({
    storage: storage
})

router.post('/',uploads.single('selfile'), function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Credentials", "true");
    // console.log("images/userimg/" + strSrc);
    var str='images/essayimg/'+strSrc;
    connection().query('update from essayinfo SET e_img="'+str+'" where e_id='+req.body.e_id, function (error, results, fields) {
        if (error) throw error;
        // console.log(str)
        connection().query('select * from essayinfo where e_img="'+str+'"', function (error1, results1, fields1) {
            if (error1) throw error1;
            console.log(results1[0]);
            res.send(results1[0]);
        });
    });
});
module.exports = router;