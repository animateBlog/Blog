$(function(){
    var value = sessionStorage.getItem("editorid"); 
    var str=`
    <iframe src="ueditor/update.html?id=${value}" width="100%"
    height="1300" frameborder="0" style="margin: 10px auto" scrolling="no"></iframe>`
    $(".ueditor").html(str)
})