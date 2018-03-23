var username = document.getElementById("username");
var bflag1 = false;
username.oninput = username.onpropertychange = function () {
    uname = $(this).val();
    if (bflag1 = /^.{6,12}$/.test(uname)) {
        $("#name_msg").css("display", "none");
        $.ajax({
            url: "http://localhost:9000/reglog/unameIsExist",
            type: "post",
            data: {
                u_name: uname
            },
            success: function (res) {
                if (res.status == 0) {
                    $("#name_msg").css("display", "block");
                    $("#name_msg").text(res.msg);
                    bflag1=false;
                } else if (res.status == 1) {
                    $("#name_msg").css("display", "none");
                    bflag1=true;
                }
            }
        })
    } else {
        $("#name_msg").css("display", "block");
        $("#name_msg").text("用户名长度为6-12");
    }
}

$("#log-form")[0].onsubmit=function () {  
    if (bflag1) {
        $.ajax({
            url:"http://localhost:9000/reglog/register",
            type:"post",
            data:{
                u_name:$("#username").val(),
                u_pwd:$("#log-password").val(),
                u_email:$("#doc-vld-email-2-1").val()
            },
            success:function (res) {  
                if(res.status==1){
                    alert(res.msg);
                    window.location.href="index.html";
                }
                bflag1=false;
            }
        })
    }
    return false;
}