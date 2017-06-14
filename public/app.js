/**
 * Created by luwenwei on 17/3/1.
 */
const Vue = require("vue");
const VueRouter = require("vue-router");
const routes = require("./route/routes");
const Vuex = require("vuex");
const states = require("./scripts/store");
const cm = require("./scripts/commonMethods");
require("./scripts/components");
Vue.use(require("vue-resource"));
Vue.use(VueRouter);
Vue.use(Vuex);
const store = new Vuex.Store(states)
const router = new VueRouter({
    routes:routes
});

router.beforeEach(function (to, from, next){
    if(from.path!="/search/searchResults" && from.path!="/search"){
        store.commit({
            "type":"setLastRoute",
            "lastRoute":from.path
        });
    }
    next();
})

const app = new Vue({
    router:router,
    store:store,
    data:{
       // currentRoute:''
    },
    computed:{
        currentRoute:function() {
            return this.$store.state.currentRoute
        }
    },
    methods:{
        showLoading: function () {
            $("#loadingGif").show();
        },

        hideLoading: function () {
            setTimeout(function () {
                $("#loadingGif").hide();
            },300)

        },
    },
    beforeCreate: function () {

    },
    created: function() {
        for(var m in cm){
            Vue.prototype[m] = cm[m];
        }
    },
    mounted:function () {
        //this.currentRoute = this.$store.state.currentRoute;
    }
}).$mount('#app');

Vue.http.interceptors.push(function(request, next){
    if(request.loading){
        request.headers.set("loading","true");
        
    };
    next(function (response) {
        if(request.loadingEnd || request.loading){
            app.hideLoading()
        }
        return response
    })
})
