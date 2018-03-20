
$(function () {
    var str=window.location.search.split("=")[1];
    if(str){
        $.ajax({
            url: "http://localhost:9000/getArticle",
            type: "post",
            data: {
                e_id: parseInt(str),
            },
            dataType:"JSON"
        }).then(function (data) {
            var res=data["obj"];
            $(".article_title").html(res.e_title);
            $(".article_uname").html(res.u_name);
            $(".article_time").html(res.e_time);
            $(".article_content").html(res.e_content);
            $(".con_img").attr("src",res.e_img);
        })
    }
})