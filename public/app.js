/**
 * Created by luwenwei on 17/3/1.
 */
const Vue = require("vue");
const VueRouter = require("vue-router");
const routes = require("./route/routes");
const Vuex = require("vuex");
//const storeObj = require("./state_store/store");

//require("./components/global_components");
Vue.use(require("vue-resource"));
Vue.use(VueRouter);
Vue.use(Vuex);
//const store = new Vuex.Store(storeObj)
const router = new VueRouter({
    routes:routes
});

const app = new Vue({
    router:router,
    //store:store,
    data:{
        
    },
    methods:{
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
        }
    },
    beforeCreate: function () {

    },
    created: function() {
        //this.showLoading(true);
        Vue.prototype.showLoading = this.showLoading;
        Vue.prototype.hideLoading = this.hideLoading;
    }
}).$mount('#app');

Vue.http.interceptors.push(function(request, next){
    if(request.loading){
        //app.showLoading()
    };
    next(function (response) {
        //app.hideLoading()
        return response
    })
})
