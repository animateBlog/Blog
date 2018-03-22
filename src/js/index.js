$(function () {
    $.ajax({
        url: "http://localhost:9000/getEssay",
        type: "get",
        dataType: "JSON"
    }).then(function (data) {
        console.log(data)
        var res = data["results"];
        var obj = JSON.parse($.getCookie("userinfo") || "{}");
        // console.log(JSON.stringify(obj))
        if (JSON.stringify(obj) == "{}") {
            $("#Listcon").removeClass("am-u-md-8").addClass("am-u-md-12")
            for (var i = 0; i < res.length; i++) {
                var str = ` <article class="am-g blog-entry-article articless" data-info="${res[i].e_id}">
        <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-img" style:"height:217px; width:500px; overflow:hidden">
            <img src="${res[i].e_img}" alt="" class="am-u-sm-12" style="max-height:217px; max-width:422px;">
        </div>
        <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-text">
            <span>
                <a href="javascript:void(0);" class="blog-color">article&nbsp;</a>
            </span>
            <span> <a href="userinfo.html" class="gouser">@${res[i].u_name}</a> &nbsp;</span>
            <span>${res[i].e_time}</span>
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
        } else {
            $("#aside").load("./aside.html");
            var onePage = 3;//一页的数量
            for (let i = 0; i < onePage; i++) {
                if (res[i] != undefined) {
                    var str = ` <article class="am-g blog-entry-article articless" data-info="${res[i].e_id}">
                    <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-img" style:"height:217px; width:422px; overflow:hidden">
                        <img src="${res[i].e_img}" alt="" class="am-u-sm-12" style="max-height:217px; max-width:422px;">
                    </div>
                    <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-text">
                        <span>
                            <a href="javascript:void(0);" class="blog-color">article&nbsp;</a>
                        </span>
                        <span> <a href="javascript:void(0)" class="gouser">@${res[i].u_name}</a> &nbsp;</span>
                        <span>${res[i].e_time}</span>
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
            }
            $(".prev").on("click", function () {
                var currNum = parseInt($(this).attr("data-info"));//当前的页数
                var pageNum = parseInt(res.length / onePage);//总页数
                if (res.length % pageNum > 0) {
                    pageNum++;
                }
                if (currNum >= 2) {
                    $("#articleList").html("");
                    $(".prev").attr("data-info", (currNum - 1));
                    $(".next").attr("data-info", (currNum - 1));
                    for (var i = (currNum - 2) * onePage; i < (currNum - 2) * onePage + onePage; i++) {
                        if (res[i] != undefined) {
                            var str = ` <article class="am-g blog-entry-article articless" data-info="${res[i].e_id}">
                            <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-img" style:"height:217px; width:422px; overflow:hidden">
                                <img src="${res[i].e_img}" alt="" class="am-u-sm-12" style="max-height:217px; max-width:422px;">
                            </div>
                            <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-text">
                                <span>
                                    <a href="javascript:void(0);" class="blog-color">article&nbsp;</a>
                                </span>
                                <span> <a href="javascript:void(0)" class="gouser">@${res[i].u_name}</a> &nbsp;</span>
                                <span>${res[i].e_time}</span>
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
                            $("#articleList").html($("#articleList").html() + str);
                        }
                    }
                }
            })

            $(".next").on("click", function () {
                var currNum = parseInt($(this).attr("data-info"));//当前的页数
                var pageNum = parseInt(res.length / onePage);//总页数
                if (res.length % pageNum > 0) {
                    pageNum++;
                }
                if (currNum <= pageNum) {
                    $("#articleList").html("");
                    $(".prev").attr("data-info", currNum + 1);
                    $(".next").attr("data-info", currNum + 1);
                    for (var i = currNum * onePage; i < (currNum * onePage + onePage); i++) {
                        if (res[i] != undefined) {
                            var str = ` <article class="am-g blog-entry-article articless" data-info="${res[i].e_id}">
                            <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-img" style:"height:217px; width:422px; overflow:hidden">
                                <img src="${res[i].e_img}" alt="" class="am-u-sm-12" style="max-height:217px; max-width:422px;">
                            </div>
                            <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-text">
                                <span>
                                    <a href="javascript:void(0);" class="blog-color">article&nbsp;</a>
                                </span>
                                <span> <a href="javascript:void(0)" class="gouser">@${res[i].u_name}</a> &nbsp;</span>
                                <span>${res[i].e_time}</span>
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
                            $("#articleList").html($("#articleList").html() + str);
                            console.log(str);
                        }
                    }
                }
            })

            $(".gouser").on("click",function(){
                var strUsername=$(this).html().substr(1);
                window.location.href="userinfo.html?actionname="+strUsername;
            })
        }

        $(".article-title").on("click", function () {
            var str = $(this).parents(".articless").attr("data-info");
            // console.log(str);
            window.location.href = "article.html?articleid=" + str;
        })
    })

    function pageNum() {
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        pageNum = 6;
        $(".prev").on("click", function () {
            var str = $(this).attr("data-info") + 1;//现在的页数
            for (var i = pageNum * str; i < arr.length; i++) {
                ////
            }
        })

        $(".next").on("click", function () {
        })
    }
    $(window).load(() => {
        var obj = JSON.parse($.getCookie("userinfo") || "{}");
        if(JSON.stringify(obj)!="{}"){
            $.ajax({
                url: "http://localhost:9000/showUserByName",
                type: "post",
                data:{
                    u_name:obj.u_name,
                }
            }).then((data) => {
                var res=data["results"][0];
                $(".edituserimg").attr("src",res.u_head);
                $(".ab_uname").html(res.u_name);
                $(".ab_uintroduce").html(res.u_introduce)
            })
            $(".userUpdate").attr("href","userdata.html");
        }
    })
})