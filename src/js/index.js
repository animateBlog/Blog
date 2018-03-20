$(function () {
    $.ajax({
        url: "http://localhost:9000/getEssay",
        type: "get",
        dataType: "JSON"
    }).then(function (data) {
        console.log(data)
        var res=data["results"];
        for (var i = 0; i < res.length; i++) {
            var str = ` <article class="am-g blog-entry-article articless" data-info="${res[i].e_id}">
    <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-img" style:"height:217px; width:422px; overflow:hidden">
        <img src="${res[i].e_img}" alt="" class="am-u-sm-12" style="max-height:217px; max-width:422px;">
    </div>
    <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-text">
        <span>
            <a href="javascript:void(0);" class="blog-color">article&nbsp;</a>
        </span>
        <span> @${res[i].u_name} &nbsp;</span>
        <span>2015/10/9</span>
        <h1>
            <a href="javascript:void(0);" class="article-title">${res[i].e_title}</a>
        </h1>
        <p>${res[i].e_describe}
        </p>
        <p>
            <a href="javascript:void(0);" class="blog-continue">continue reading</a>
        </p>
    </div>
</article>`
            $("#articleList").html(str + $("#articleList").html());
        }

        $(".article-title").on("click",function(){
            var str=$(this).parents(".articless").attr("data-info");
            // console.log(str);
            window.location.href="article.html?articleid="+str;
        })
    })

})