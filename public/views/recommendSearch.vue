<template>
    <div>
        <header>
            <div class="back">
                <router-link v-bind:to="lastRoute">

                </router-link>
            </div>
            <div class="hot-search-d">
                <button class="search-btn" v-on:click="searchNovel()"></button>
                <input class="hot-search-text" v-model="searchKey">
            </div>
            <div class="main-page">
                <a href="#">首页</a>
            </div>
        </header>
        <div class="people-search">
            <div class="tip">大家都在搜</div>
            <div class="search-tip">
                <span v-for="s_tip in hotSearch['hot_search']" v-on:click="searchTheKey(s_tip.name)">
                    <i v-bind:class="setBackground(s_tip.type)"></i>
                    <a class="tip-link">
                        {{s_tip.name}}
                    </a>
                </span>
            </div>
            <div class="recent-search">
                <span>最近搜索</span>
                <span class="clear-record" v-on:click="clearRecentSearch()"></span>
            </div>
            <div class="recent-search-content">
                <div class="search-tip">
                <span v-for="s_tip in recentSearch" v-on:click="searchTheKey(s_tip)">
                    <a class="tip-link">
                        {{s_tip}}
                    </a>
                </span>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .search-page header .main-page{
        float:right;
    }
    .search-page header .main-page a{
        color:#fff;
        font-size:15px;
    }
    .search-page{
        background-color:#fff;
        width:100%;
        height:100%;
        padding:0
    }
    .search-page header{
        height:34px;
        background:#ed6460;
        padding:5px 15px;
        line-height:32px;
        margin-bottom:0;
    }
    .search-page header div{
        display:inline-block;
    }
    .search-page header .back{
        margin-right:10px;
        width:20px
    }

    .search-page header .back a{
        background: url("/images/arrow-left.png") 0 0 no-repeat;
        background-size: 100% 100%;
        display:inline-block;
        width:10px;
        height:18px;
        vertical-align:middle;
    }
    .search-page header .hot-search-d{
        width:auto;
        position:absolute;
        top:5px;
        left:38px;
        right:58px;
    }
    .search-page header .hot-search-d button.search-btn{
        width:51px;
        height:28px;
        border:none;
        top:3px;
        position:absolute;
        right:0;
        background:url("/images/search (1).png") center center no-repeat;
        background-size: contain;
        outline:none;
    }
    .search-page header .hot-search-d input{
        width:100%;
        height: 28px;
        border:none;
        border-radius: 20px;
        text-indent: 15px;
        background-color: #fff;
        outline: none;
        color:#6c6358
    }
    .search-page .people-search .tip{
        height:44px;
        background:#f5f5f5;
        line-height:44px;
        color:#807a73;
        font-size:14px;
        padding-left:15px;
    }
    .search-page .people-search .search-tip{
        padding-top:15px;
    }
    .search-page .people-search .search-tip span{
         margin:0 0 15px 15px;
         display:inline-block;
         position:relative
    }
    .search-page .people-search .search-tip .tip-link{
        display:inline-block;
        padding:5px 10px;
        text-align:center;
        color:#aba59a;
        border:1px solid #c8c8c8;
        border-radius:5px;
        font-size:14px;
    }
    .search-page .people-search .search-tip .tip-hot{
        background:url("/images/hot.png") no-repeat;
        display: inline-block;
        background-size: 30px 14px;
        width: 30px;
        position: absolute;
        height: 20px;
        top: -6px;
        left: 5px;
    }
    .search-page .people-search .search-tip .tip-new{
        background:url("/images/new.png") no-repeat;
        display: inline-block;
        background-size: 30px 14px;
        width: 30px;
        position: absolute;
        height: 20px;
        top: -6px;
        left: 5px;
    }
     .search-page .recent-search{
        background:#f5f5f5;
        color:#807a73;
        height:44px;
        padding:0 15px;
        line-height:44px;
        font-size:14px;
     }
     .search-page .clear-record{
        background:url("/images/clear.png") no-repeat;
        background-size:13px 13px;
        display:inline-block;
        width:13px;
        height:13px;
        margin-top:15px;
        float:right;
     }
</style>
<script>
    const Vue = require('vue');
    const vue = new Vue();
    Vue.use(require('vue-resource'));
    module.exports = {
        data(){
            return{
                hotSearch:{},
                searchKey:"",
                recentSearch:[]
            }
        },
        components:{
        },

        computed:{
            lastRoute:function() {
                return this.$store.state.lastRoute
            }
        },

        methods:{
            setBackground: function (type) {
                return type=="hot" ? "tip-hot" : type=="new" ? "tip-new" : "";
            },

            searchNovel: function () {
                if(!this.searchKey) return;
                this.$parent.searchKey = this.searchKey;
                this.$parent.searchNovel();
            },

            searchTheKey: function (key) {
                if(!key) return;
                this.$parent.searchKey = key;
                this.$parent.searchNovel();
            },

            clearRecentSearch: function () {
                vue.clearStoreByField("searchRecords");
                this.recentSearch = [];
            },

            goBack: function () {
                this.$router.go(-1);
            },
        },

        created: function () {


            },

        mounted: function () {
            Vue.http.get("/hot_search").then(function (response){
                this.hotSearch = response.body.results[0];
            }.bind(this));
            this.$store.commit({
                "type":"setCurrentRoute",
                "currentRoute":"search"
            });
            this.$parent.searchKey = "";
            this.recentSearch = vue.getLocalStore()["searchRecords"];
        },

        watch:{
            searchKey:function(curVal,oldVal) {
                console.log(curVal)
            }
        }
    }
</script>
