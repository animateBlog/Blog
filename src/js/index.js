$(function () {
    $.ajax({
        url: "http://localhost:9000/getEssay",
        type: "get",
        dataType: "JSON"
    }).then(function (data) {
        console.log(data)
        var res = data["results"].reverse();
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
                $("#articleList").html($("#articleList").html()+str);
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
                    $("#articleList").html($("#articleList").html()+str);
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
                    $(".gouser").on("click", function () {
                        var strUsername = $(this).html().substr(1);
                        window.location.href = "userinfo.html?actionname=" + encodeURIComponent(strUsername);
                    })
                    $(".article-title").on("click", function () {
                        var str = $(this).parents(".articless").attr("data-info");
                        // console.log(str);
                        window.location.href = "article.html?articleid=" + str;
                    })
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
                    $(".gouser").on("click", function () {
                        var strUsername = $(this).html().substr(1);
                        window.location.href = "userinfo.html?actionname=" + encodeURIComponent(strUsername);
                    })
                    $(".article-title").on("click", function () {
                        var str = $(this).parents(".articless").attr("data-info");
                        // console.log(str);
                        window.location.href = "article.html?articleid=" + str;
                    })
                }
            })

            $(".gouser").on("click", function () {
                var strUsername = $(this).html().substr(1);
                alert(encodeURIComponent(strUsername))
                window.location.href = "userinfo.html?actionname=" + encodeURIComponent(strUsername);
            })
        }

        $(".article-title").on("click", function () {
            var str = $(this).parents(".articless").attr("data-info");
            // console.log(str);
            window.location.href = "article.html?articleid=" + str;
        })
    })
    $(document).ready(function () {
        
    })
})