var multer = require("multer");
var express = require('express');
var router = express.Router();
var querystring = require('querystring');//字符串转对象
var mysql = require('mysql');
var createConnection = require("./../createConnection.js");
var strSrc = '';
var storage = multer.diskStorage({
    //上传的文件夹
    destination: (req, file, cb) => {
        cb(null, '../src/images/userimg');
    },
    //保存的名字
    filename: (req, file, cb) => {
        // console.log(req,file);
        strSrc ="images/userimg/" + Date.now() + "-" + file.originalname;
        cb(null, Date.now() + "-" + file.originalname);
    }
})
var uploads = multer({
    storage: storage
})
router.post('/',uploads.single('selfile'), function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Credentials", "true");
    createConnection(`update userinfo set u_head="${strSrc}" where u_name="${req.body.u_name}"`, function (results) {
        createConnection("select u_head from userinfo where u_name='"+req.body.u_name+"'",function(results1){
            res.json({
                results1
            });
        })
    })
});
module.exports = router;