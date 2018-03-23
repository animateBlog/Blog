$(function () {
    var obj = JSON.parse($.getCookie("userinfo") || "{}");
    if (JSON.stringify(obj) != "{}") {
        $.ajax({
            url: "http://localhost:9000/showUserByName",
            type: "post",
            data: {
                u_name: obj.u_name
            },
            success: function (data) {
                var res = data["results"][0];
                $("#user-name").val(res.u_name);
                $("#user-email").val(res.u_email);
                $("#user-intro").val(res.u_introduce);
                if(res.u_head){
                    $(".userimg").attr("src", res.u_head);
                }
                
            }
        })
        $("#saveimg").on("click", function () {
            var obj = JSON.parse($.getCookie("userinfo") || "{}");
            var file = document.getElementById("user-pic").files[0];
            var formData = new FormData();
            formData.append("selfile", file);//设置key为avartar,value为上述的File对象
            formData.append("u_name", obj.u_name);
            $.ajax({
                url: "http://localhost:9000/updateUserImgByName",
                type: "post",
                data: formData,
                processData: false,
                contentType: false,
            }).then((data) => {
                var res = data["results"][0];
                console.log(data)
                console.log(res)
                $(".userimg").attr("src", res.u_head);
                if (res) {
                    alert("修改图片成功")
                }
            })
        })

        $("#saveinfo").on("click", function () {
            $.ajax({
                url: "http://localhost:9000/updateUserInfoByName",
                type: "post",
                data: {
                    u_name: $("#user-name").val(),
                    u_email: $("#user-email").val(),
                    u_introduce: $("#user-intro").val()
                },
            }).then((data) => {
                alert(data);
            })
        })
    } else {
        var str = `
        <div style="width:200px; height:200px; margin:20px auto; text-align:center; line-height:200px">您还没有登录!</div>
        `
        $(".body_content").html(str);
    }
})