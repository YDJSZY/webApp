<template>
    <div class="more-novels">
        <header>
            <div class="back">
                <a v-on:click="goBack()">

                </a>
            </div>
            <span class="title">{{query.title}}</span>
            <div class="main-page">
                <a href="#">首页</a>
            </div>
        </header>
        <div class="main">
            <ul>
                <li v-for="novel in maleRecommendNovels">
                    <a>
                        <span class="novel-img">
                            <img v-bind:src="novel.image_url">
                        </span>
                        <span class="novel-description">
                            <h3 class="title" style="line-height:17px;">{{novel.title}}</h3>
                            <p class="author-type">{{novel.author+"/"+novel.type}}</p>
                            <p class="description">{{novel.description}}</p>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="loading">
            <span class="loading-word">
                加载中
                <loading></loading>
            </span>
        </div>
    </div>
</template>
<style>
    .content-wrapper {
        padding-top: 0;
    }
    .more-novels{
        background-color:#fff;
        width:100%;
        height:100%;
        padding:0
    }
    .more-novels header{
        height:34px;
        background:#ed6460;
        padding:5px 15px;
        line-height:32px;
        margin-bottom:0;
        text-align:center;
    }

    .more-novels header .back{
        margin-right:10px;
        width:20px;
        float:left;
    }

    .more-novels header .back a{
        background: url("/images/arrow-left.png") 0 0 no-repeat;
        background-size: 100% 100%;
        display:inline-block;
        width:10px;
        height:18px;
        vertical-align:middle;
    }

     .more-novels header .title{
        color:#fff;
        font-size:18px;
        display:inline-block;
        margin-top:1px;
     }

     .more-novels header .main-page{
        float:right;
        margin-top:1px;
        margin-right:5px;
     }

     .more-novels header .main-page a{
        color:#fff;
        font-size:14px;
     }

     .more-novels .main{
        margin:0;
        overflow:hidden;
     }

     .more-novels .main ul{
        list-style:none;
    }
    .more-novels .main ul li{
        margin-left:15px;
        padding:15px;
        padding-left:0;
        padding-right:0;
        margin-right:0;
        border-bottom:1px solid #dcdcdc;
        width:100%;
        height:88px;
    }
    .more-novels .main ul li a{
        display:inline-block;
        width:100%;
        height:100%;
    }
    .more-novels .main  ul li a span{
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    .more-novels .main  ul li a .novel-img{
        margin-right:10px;
        display:inline-block;
    }
    .more-novels .main  ul li a .novel-img img{
        width:64px;
        height:88px;
    }
    .more-novels .main  ul li a .novel-description{
        width:calc(100% - 104px);
    }
    .more-novels .main  ul li a .novel-description p{
        height:32px;
        line-height:32px;
    }
    .more-novels .main  ul li a .novel-description .title{
        font-size:16px;
        color:#1d2c33;
        font-weight:normal;
        height:22px;
        line-height:22px;
        overflow:hidden;
        text-overflow : ellipsis ;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        white-space: nowrap;
    }
    .more-novels .main  ul li a .novel-description .author-type{
        font-size:12px;
        color:#aba59a;
    }
    .more-novels .main  ul li a .novel-description .description{
        font-size:14px;
        color:#aaa;
        overflow:hidden;
        text-overflow : ellipsis ;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        height:32px;
        line-height:16px;
        display:-webkit-box
    }
    .more-novels .main  ul li a .novel-description .click-account{
        font-size:15px;
        color:#ed6460;
    }
</style>
<script>
    const Vue = require("vue");
    const vue = new Vue();
    Vue.use(require('vue-resource'));
    module.exports = {
        data(){
            return{
                query:{},
                maleRecommendNovels:[],
                currentPage:1
            }
        },

        components:{

        },

        methods:{
            goBack: function () {
                this.$router.go(-1);
            },

            getData: function () {
                Vue.http.get(this.query.url,{params:{page:this.currentPage,page_size:10}}).then(function (response){
                    this.maleRecommendNovels = this.maleRecommendNovels.concat(response.body.results);
                    this.currentPage++;
                    $(".loading").css({"visibility":"hidden"});
                }.bind(this));
            }
        },

        mounted: function () {
            this.query = this.$route.query;
            console.log(this.query)
            this.getData();
            vue.scrollRefresh({direction:"down",callBack:this.getData},this)
        },
    }
</script>
