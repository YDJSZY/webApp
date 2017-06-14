/**
 * Created by luwenwei on 17/5/6.
 */
module.exports = {
    getLocalStore: function () {
        var localStorage = window.localStorage;
        if(!localStorage.hasOwnProperty("novel")) this.setLocalStore({});
        return JSON.parse(localStorage.getItem("novel"));
    },

    setLocalStore: function (store) {
        localStorage.setItem("novel",JSON.stringify(store));
    },
    
    clearStoreByField: function (field,value) {
        var localStore = this.getLocalStore();
        value ? localStore[field] = value : delete localStore[field]
        this.setLocalStore(localStore);
    },

    showLoading:function (global) {
        var p, c;
        if(global){
            p = "fakeloader1";
            c = "spinner1";
        }else{
            p = "fakeloader6";
            c = "spinner2";
        }
        $('.' + c).show();
        $("." + p).fadeIn("fast");
    },
    
    hideLoading: function (global) {
        var p;
        if(global){
            p = "fakeloader1";
        }else{
            p = "fakeloader6";
        }
        $("."+p).fadeOut(500);
    },

    scrollRefresh: function (option,context) {
        var direction = option.direction;
        var callBack = option.callBack;
        $(window).scroll(function(){
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();   //当前页面的总高度
            var clientHeight = $(this).height();//当前可视的页面高度
            if(scrollTop + clientHeight>= scrollHeight){
                $(".loading").css({"visibility":"visible"});
                callBack.apply(context)
            }
        })
    }
}