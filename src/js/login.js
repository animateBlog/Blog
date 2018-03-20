$("#log-form")[0].onsubmit=function () {  
    $.ajax({
        url:"http://localhost:3456/reglog/login",
        type:"post",
        data:{
            u_name:$("#uname").val(),
            u_pwd:$("#upwd").val()
        }
    }).then((res)=>{
        alert(res.msg)
    })

    return false;
}