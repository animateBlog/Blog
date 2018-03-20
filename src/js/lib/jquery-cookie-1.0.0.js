(function($){
    $.extend({
        setCookie:function(key,value,day,path,domain,secure){
            var strCookie = "";
            if(key){
                strCookie += encodeURIComponent(key) + "=" + encodeURIComponent(value);
            }
            if(typeof(day) == "number"){
                var date = new Date();
                date.setDate(date.getDate() + day)
                strCookie += ";expires=" + date;
            }
            if(path){
                strCookie += ";path=" + path;
            }
            if(domain){
                strCookie += ";domain=" + domain;
            }
            if(secure){
                strCookie += ";secure"
            }
            return document.cookie=strCookie;
        },
        getCookie:function(key){
            var str=document.cookie;
            var arr=str.split(";");
            for(var i=0; i<arr.length; i++){
                var arrList=arr[i].split("=");
                if(decodeURIComponent(arrList[0].trim())==key){
                    return decodeURIComponent(arrList[1]);
                }
            }
            return "";
        },
        removeCookie:function(key){
            $.setCookie(key,"",-1);
        }
    })
})(jQuery);