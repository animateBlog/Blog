$(function () {
    // 公用头尾
    (function () {
        $("#header").load("./header.html");
        $("#footer").load("./footer.html");
        // $("#aside").load("./aside.html");
    })();

    // 头部换名句
    (function () {
        var arr=[
            "生命太短暂，不要去做一些根本没有人想要的东西。——Ash Maurya",
            "它在我的机器上可以很好运行！——大部分程序员",
            "能说算不上什么，有本事就把你的代码给我看看。——Linus Torvalds，Linux 之父",
            "当你选择了一种语言，意味着你还选择了一组技术、一个社区。——Joshua Bloch",
            "过早的优化是罪恶之源。——Donald Knuth",
            "软件在能够复用前必须先能用。——Ralph Johnson",
            "当你试图解决一个你不理解的问题时，复杂化就产成了。——Andy Boothe",
            "控制复杂性是计算机编程的本质。—— Brian Kernighan",
            "计算机科学领域的所有问题都可以通过其他方式间接解决。——David Wheeler",
            "靠代码行数来衡量开发进度，就像是凭重量来衡量飞机制造的进度。——比尔·盖茨"
        ]
        setInterval(function () {
            var str=arr[Math.floor(Math.random()*10)];
            $(".dictum").text(str);
        }, 4000);
    })();

    //滑动
    (function(){
        $(window).on("scroll",function(){
            var top=$(this).scrollTop();
            if(top>$(".top").height()){
                $(".scroll").css({
                    "position":"fixed",
                    "z-index":100,
                    "background":"#fff",
                    "width":"100%",
                    "top":0
                });
            }else if(top<=$(".top").outerHeight()+$(".scroll").outerHeight()){
                $(".scroll").css("position","static");
            }
        });
    })();
})