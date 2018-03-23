$(function(){
    var str = decodeURIComponent(window.location.search.split("=")[1]);
    if(str){
        $.ajax({
            url: "http://localhost:9000/showUserByName",
            type: "post",
            data: {
                u_name: str
            },
            success: function (data) {
                var res=data["results"][0];
                $(".user_head").attr("src",res.u_head);
                $(".u_name").html(res.u_name);
                $(".u_email").html(res.u_email);
                $(".u_introduce").html(res.u_introduce);
            }
        })
        $.ajax({
            url: "http://localhost:9000/getEssayByUser",
            type: "get",
            data: {
                u_name: str
            },
            success: function (data) {
                var res=data["results"];
                if(res.length>=1){
                    for(var i=0; i<res.length; i++){
                        var str=`
                        <p style="padding: 5px 0; " ><a href="javascript:void(0)" class="art" data-info="${res[i].e_id}">${res[i].e_title}</a><span>${res[i].e_time}</span> </p>
                        `
                        $(".art_con").html($(".art_con").html()+str);
                    }
                    $(".art").on('click',function(){
                        var str=$(this).attr("data-info");
                         window.location.href = "article.html?articleid=" + str;
                    })
                }else{
                    var str=`
                        <div style="width:200px; text-align:center; margin:20px auto;">他还没有发表文章</div>
                    `
                    $(".art_con").html(str)
                }
                
            }
        })
    }
})