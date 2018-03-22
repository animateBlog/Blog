$("#log-form")[0].onsubmit=function () {  
    $.ajax({
        url:"http://localhost:9000/reglog/login",
        type:"post",
        data:{
            u_name:$("#uname").val(),
            u_pwd:$("#upwd").val()
        }
    }).then((res)=>{
        var obj={
            u_name:$("#uname").val(),
            u_pwd:$("#upwd").val()
        }
        if(res.status==1){
            $.setCookie("userinfo",JSON.stringify(obj));
            alert(res.msg);
            window.location.href="index.html"; 
        }else{
            alert(res.msg);
        }
        
    })
    return false;
}