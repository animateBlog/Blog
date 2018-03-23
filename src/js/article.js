$(function () {
    var str = window.location.search.split("=")[1];
    if (str) {
        $.ajax({
            url: "http://localhost:9000/getArticle",
            type: "post",
            data: {
                e_id: parseInt(str),
            },
            dataType: "JSON"
        }).then(function (data) {
            var res = data["obj"];
            $(".article_title").html(res.e_title);
            $(".article_uname").html(res.u_name);
            $(".article_uname").attr("href","userinfo.html?actionname="+encodeURIComponent(res.u_name));
            $(".article_time").html(res.e_time);
            var str = res.e_content.substr(0, res.e_content.length - 6)
            $(".article_content").html(str);
            $(".con_img").attr("src", res.e_img);
            
        })
        $.ajax({
            url: "http://localhost:9000/getCommentById",
            type: "post",
            data: {
                e_id: parseInt(str),
            },
            dataType: "JSON"
        }).then(function (data) {
            console.log(data);
            var res = data["results"];
            res=res.reverse();
            var onePage = 4;//一页的数量
            for (let i = 0; i < onePage; i++) {
                if (res[i] != undefined) {
                    var str = `<div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                    <h3>
                      <span>${res[i].c_name} &nbsp;: &nbsp;</span>
                      <span class="blog-color">${res[i].c_email}</span>
                      <span>${res[i].c_time}</span>
                    </h3>
                    <p>${res[i].c_con}
                    </p>
                  </div>`
                    $("#comment_con").html($("#comment_con").html()+str);
                }
            }
            $(".prev").on("click", function () {
                var currNum = parseInt($(this).attr("data-info"));//当前的页数
                var pageNum = parseInt(res.length / onePage);//总页数
                if (res.length % pageNum > 0) {
                    pageNum++;
                }
                if (currNum >= 2) {
                    $("#comment_con").html("");
                    $(".prev").attr("data-info", (currNum - 1));
                    $(".next").attr("data-info", (currNum - 1));
                    for (var i = (currNum - 2) * onePage; i < (currNum - 2) * onePage + onePage; i++) {
                        if (res[i] != undefined) {
                            var str = `<div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                            <h3>
                              <span>${res[i].c_name} &nbsp;: &nbsp;</span>
                              <span class="blog-color">${res[i].c_email}</span>
                              <span>${res[i].c_time}</span>
                            </h3>
                            <p>${res[i].c_con}
                            </p>
                          </div>`
                            $("#comment_con").html($("#comment_con").html() + str);
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
                    $("#comment_con").html("");
                    $(".prev").attr("data-info", currNum + 1);
                    $(".next").attr("data-info", currNum + 1);
                    for (var i = currNum * onePage; i < (currNum * onePage + onePage); i++) {
                        if (res[i] != undefined) {
                            var str = `<div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                    <h3>
                      <span>${res[i].c_name} &nbsp;: &nbsp;</span>
                      <span class="blog-color">${res[i].c_email}</span>
                      <span>${res[i].c_time}</span>
                    </h3>
                    <p>${res[i].c_con}
                    </p>
                  </div>`
                            $("#comment_con").html($("#comment_con").html() + str);
                            console.log(str);
                        }
                    }
                }
            })
        })
    }
    $("#comment").on("submit", () => {
        var str = window.location.search.split("=")[1];
        if (str) {
            $.ajax({
                url: "http://localhost:9000/insertComment",
                type: "post",
                data: {
                    c_name: $(".c_name").val(),
                    c_email: $(".c_email").val(),
                    c_con: $(".c_con").val(),
                    e_id: str
                }
            }).then((data) => {
                $("#comment_con").html("");
                var res = data["results"];
                var onePage = 4;//一页的数量
                alert("评论成功");
                res=res.reverse();
                console.log(res);
                for (let i = 0; i < onePage; i++) {
                    if (res[i] != undefined) {
                        var str = `<div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                    <h3>
                      <span>${res[i].c_name} &nbsp;: &nbsp;</span>
                      <span class="blog-color">${res[i].c_email}</span>
                      <span>${res[i].c_time}</span>
                    </h3>
                    <p>${res[i].c_con}
                    </p>
                  </div>`
                        $("#comment_con").html($("#comment_con").html()+str);
                    }
                }
                $(".prev").on("click", function () {
                    var currNum = parseInt($(this).attr("data-info"));//当前的页数
                    var pageNum = parseInt(res.length / onePage);//总页数
                    if (res.length % pageNum > 0) {
                        pageNum++;
                    }
                    if (currNum >= 2) {
                        $("#comment_con").html("");
                        $(".prev").attr("data-info", (currNum - 1));
                        $(".next").attr("data-info", (currNum - 1));
                        for (var i = (currNum - 2) * onePage; i < (currNum - 2) * onePage + onePage; i++) {
                            if (res[i] != undefined) {
                                var str = `<div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                                <h3>
                                  <span>${res[i].c_name} &nbsp;: &nbsp;</span>
                                  <span class="blog-color">${res[i].c_email}</span>
                                  <span>${res[i].c_time}</span>
                                </h3>
                                <p>${res[i].c_con}
                                </p>
                              </div>`
                                $("#comment_con").html($("#comment_con").html() + str);
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
                        $("#comment_con").html("");
                        $(".prev").attr("data-info", currNum + 1);
                        $(".next").attr("data-info", currNum + 1);
                        for (var i = currNum * onePage; i < (currNum * onePage + onePage); i++) {
                            if (res[i] != undefined) {
                                var str = `<div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                        <h3>
                          <span>${res[i].c_name} &nbsp;: &nbsp;</span>
                          <span class="blog-color">${res[i].c_email}</span>
                          <span>${res[i].c_time}</span>
                        </h3>
                        <p>${res[i].c_con}
                        </p>
                      </div>`
                                $("#comment_con").html($("#comment_con").html() + str);
                                console.log(str);
                            }
                        }
                    }
                })
            })
        }
        return false;
    })
})