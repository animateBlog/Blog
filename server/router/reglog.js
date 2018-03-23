var express=require("express");
var router=express.Router();
var bodyParser=require("body-parser");
var mysql=require("mysql");
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"animateblog"
})
conn.connect();
router.post("/register",(req,res)=>{
    res.append("Access-Control-Allow-Origin","*");
    conn.query("INSERT INTO userinfo SET ?",{
        u_name:req.body.u_name,
        u_pwd:req.body.u_pwd,
        u_email:req.body.u_email
    },(error,results,fields)=>{
        res.json({
            status:1,
            msg:"注册成功"
        })
    })
})
router.post("/unameIsExist",(req,res)=>{
    res.append("Access-Control-Allow-Origin","*");
    conn.query("SELECT*FROM userinfo WHERE u_name='"+req.body.u_name+"'",function(error,results,fields){
        if (results.length>0) {
            res.json({
                status:0,
                msg:"用户名已存在"
            })
        }else{
            res.json({
                status:1,
                msg:"可以注册"
            })
        }
    })
})

router.post("/login",(req,res)=>{
    res.append("Access-Control-Allow-Origin","*");
    conn.query("SELECT*FROM userinfo WHERE u_name='"+req.body.u_name+"'",(error,results,fields)=>{
        if (results.length>0&&results[0].u_pwd==req.body.u_pwd) {
            res.json({
                status:1,
                msg:"登录成功"
            })
        } else {
            res.json({
                status:0,
                msg:"用户名或密码错误"
            })
        }
    })
})



module.exports=router;