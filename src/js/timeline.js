$(function () {
    var obj = JSON.parse($.getCookie("userinfo") || "{}");
    console.log(obj.u_name)
    if (JSON.stringify(obj) != '{}') {
        $.ajax({
            url: "http://localhost:9000/getEssayByUser",
            type: "get",
            dataType: "JSON",
            data: {
                u_name: obj.u_name
            }
        }).then(function (data) {
            var arr = data["results"];
            console.log(arr);
            // 原来的数组
            var newArr = [];
            for (const item in arr) {
                var time = arr[item]["e_time"];
                var arrSplit = time.split("/");
                let obj = {};
                obj.e_title = arr[item]["e_title"];
                obj.e_id = arr[item]["e_id"];
                obj.u_name = arr[item]["u_name"];
                obj.e_time = arr[item]["e_time"];
                obj.year = arrSplit[0];
                obj.month = arrSplit[1];
                obj.time = time;
                newArr.push(obj);
            }

            var obj = {};
            for (const item in newArr) {
                var year = newArr[item]["year"];
                var month = newArr[item]["month"];
                if (obj[year] == undefined) {
                    obj[year] = {};
                }
                if (obj[year][month] == undefined) {
                    obj[year][month] = [];
                }
                obj[year][month].push(newArr[item]);
                // console.log(obj[year][month]);
            }

            if (JSON.stringify(obj) == "{}") {

                var str=`你还没有发表文章╭~~~╮
                (o@.@o) `
                $(".con").html(str);
            } else {
                //  console.log(obj)
                for (var key in obj) {
                    //年
                    $("<div></div>")
                    var oDiv = $("<div></div>")
                    $(oDiv).addClass("timeline-year");
                    $(oDiv).html("<h1>" + key + "</h1><hr>")
                    for (var j in obj[key]) {
                        //月
                        var oUl = $("<ul></ul>")
                        $(oUl).html("<h3>" + j + "月</h3><hr>")
                        for (var i = 0; i < obj[key][j].length; i++) {
                            var strHtml = `
                        <li>
                        <span class="am-u-sm-8 am-u-md-6 timeline-span">
                            <a href="article.html?articleid=${obj[key][j][i].e_id}">${obj[key][j][i].e_title}</a>
                        </span>
                        <span class="am-u-sm-4 am-u-md-2 am-hide-sm-only">${obj[key][j][i].e_time}</span>
                        <span class="am-u-sm-4 am-u-md-2 am-hide-sm-only">${obj[key][j][i].u_name}</span>
                        <span class="am-u-sm-4 am-u-md-2">
                            <a href="javascript:void(0)" class="editor" data-info="${obj[key][j][i].e_id}">编辑</a>
                            <a href="javascript:void(0)" class="delete">删除</a>
                        </span>
                    </li>
                        `
                            $(oUl).html($(oUl).html() + strHtml + "<br/>");
                        }
                        $(oDiv).append($(oUl));
                    }
                    $(".con").prepend($(oDiv));
                }
                $(".editor").on("click",function(){
                    sessionStorage.setItem("editorid", $(this).attr("data-info"));
                    window.location.href="udueditor.html";
                })
                $(".delete").on("click",function(){
                    if(confirm("确定删除吗")){
                        var actionid=$(this).siblings("a").attr("data-info");
                        $.ajax({
                            url: "http://localhost:9000/delEssay",
                            type: "post",
                            dataType: "JSON",
                            data: {
                                e_id: actionid
                            }
                        }).then((res)=>{
                            if(res.status==1){
                                alert(res.msg);
                                window.location.href="timeline.html";
                            }
                        })
                    }
                    
                })
            }
        })
    }
})