<template>
    <div class="main-content">
        <div class="free-novels">
            <div class="title-content">
                <em class="em-l"></em>
                <span class="title">女生免费畅读</span>
                <div class="more">
                    <a href="">更多 ></a>
                </div>
            </div>
            <div class="free-novels-main">
                <ul>
                    <li v-for="femaleNovel in femaleFreeNovels">
                        <a>
                            <span class="novel-img">
                                <img v-bind:src="femaleNovel.image_url">
                            </span>
                            <span class="novel-description">
                                <h3 class="title" style="line-height:17px;">{{femaleNovel.title}}</h3>
                                <p class="author-type">{{femaleNovel.authur+"/"+femaleNovel.type}}</p>
                                <p class="description">{{femaleNovel.description}}</p>
                                <p class="click-account" style="padding-top:5px">{{"点击量:"+femaleNovel.click_account}}</p>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="split-line"></div>
            <div class="title-content">
                <em class="em-l"></em>
                <span class="title">男生免费畅读</span>
                <div class="more">
                    <a href="">更多 ></a>
                </div>
            </div>
            <div class="free-novels-main">
                <ul>
                    <li v-for="femaleNovel in maleFreeNovels">
                        <a>
                            <span class="novel-img">
                                <img v-bind:src="femaleNovel.image_url">
                            </span>
                            <span class="novel-description">
                                <h3 class="title" style="line-height:17px;">{{femaleNovel.title}}</h3>
                                <p class="author-type">{{femaleNovel.authur+"/"+femaleNovel.type}}</p>
                                <p class="description">{{femaleNovel.description}}</p>
                                <p class="click-account" style="padding-top:5px">{{"点击量:"+femaleNovel.click_account}}</p>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
    .main-content{
        background-color:#fff;
        padding:15px
    }
    .split-line{
        margin:25px -15px 20px -15px;
        height:10px;
        background:#f5f5f5
    }
    .main-content .free-novels .title-content{
        width:100%;
        padding:0 6px 6px 0;
    }
    .main-content .free-novels .title-content em{
        display:inline-block;
        background:#ED6460;
        width:2.5px;
        height:12px;
    }
    .main-content .free-novels .title-content span{
        color:#ED6460;
        font-weight:700;
        font-size:18px
    }
    .main-content .free-novels .title-content .more{
        float:right;
    }
    .main-content .free-novels .title-content .more a{
        color:#aba59a;
        font-size:14px;
    }
    .main-content .free-novels .free-novels-main ul{
        list-style:none;
    }
    .main-content .free-novels .free-novels-main ul li{
        margin: 0 10px 15px 0;
        width:100%;
        height:128px;
    }
    .main-content .free-novels .free-novels-main ul li a{
        display:inline-block;
        width:100%;
        height:100%;
    }
    .main-content .free-novels .free-novels-main ul li a span{
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    .main-content .free-novels .free-novels-main ul li a .novel-img{
        margin-right:10px;
        display:inline-block;
    }
    .main-content .free-novels .free-novels-main ul li a .novel-img img{
        width:87px;
        height:100%;
        box-shadow: 0 10px 20px 0 rgba(0,0,0,0.08), 0px 4px 4px 0 rgba(0,0,0,0.08);
    }
    .main-content .free-novels .free-novels-main ul li a .novel-description{
        width:64%;
    }
    .main-content .free-novels .free-novels-main ul li a .novel-description p{
        height:32px;
        line-height:32px;
    }
    .main-content .free-novels .free-novels-main ul li a .novel-description .title{
        font-size:16px;
        color:#6c6358;
        height:32px;
        line-height:32px;
        overflow:hidden;
        text-overflow : ellipsis ;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        white-space: nowrap;
    }
    .main-content .free-novels .free-novels-main ul li a .novel-description .author-type{
        font-size:12px;
        color:#aba59a;
    }
    .main-content .free-novels .free-novels-main ul li a .novel-description .description{
        font-size:14px;
        color:#807a73;
        overflow:hidden;
        text-overflow : ellipsis ;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        white-space: nowrap;
    }
    .main-content .free-novels .free-novels-main ul li a .novel-description .click-account{
        font-size:15px;
        color:#ed6460;
    }

</style>
<script>
    const Vue = require('vue');
    const Swiper = require("swiper");
    Vue.use(require('vue-resource'));
    module.exports = {
        data(){
            return{
                femaleFreeNovels:[],
                maleFreeNovels:[]
            }
        },
        components:{
        },

        created: function () {


            },

        mounted: function () {
            Vue.http.get("/female_free_novels").then(function (response){
                this.femaleFreeNovels = response.body.results;
            }.bind(this));
            Vue.http.get("/male_free_novels").then(function (response){
                this.maleFreeNovels = response.body.results;
            }.bind(this));
            this.$store.commit({
                "type":"setCurrentRoute",
                "currentRoute":"freeNovel"
            })
        }
    }
</script>
