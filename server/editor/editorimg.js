var multer = require("multer");
var express = require('express');
var router = express.Router();
var querystring = require('querystring');//字符串转对象
var mysql = require('mysql');
var connection = require("./createsql.js")
var strSrc = '';
var storage = multer.diskStorage({
    //上传的文件夹
    destination: (req, file, cb) => {
        cb(null, '../images/essayimg');
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
router.post('/', uploads.single('selfile'), function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    //数据库修改user_head
    console.log("images/userimg/" + strSrc);
    connection().query('update from essayinfo SET e_img="images/essayimg/'+strSrc+'" WHERE user_id=1', function (error, results, fields) {
        if (error) throw error;
        res.send('添加图片成功');
    });
});
module.exports = router;