<template>
    <div class="main-content">
        <div class="recommend">
            <div class="title-content">
                <em class="em-l"></em>
                <span class="title">重磅推荐</span>
                <div class="more">
                    <a href="">更多 ></a>
                </div>
            </div>
            <ul>
                <li v-for="bestRecommendNovel in bestRecommendNovels">
                    <a>
                        <img v-bind:src="bestRecommendNovel.image_url"></img>
                        <h4>{{bestRecommendNovel.title}}</h4>
                    </a>
                </li>
            </ul>
            <div style="clear:both"></div>
            <div v-for="novel in recommendNovels" class="novel-classification">
                <p>
                    <a class="novel-type">
                        [{{novel.type}}]
                    </a>
                    <a class="novel-type">{{novel.title}}</a>
                </p>
                <p class="description">{{novel.description}}</p>
            </div>
            <div class="carousel-novel">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <img src="../images/lunbo1.jpg" alt="First slide">
                        </div>
                        <div class="swiper-slide">
                            <img src="../images/lunbo2.jpg" alt="Second slide">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .main-content{
        background-color:#fff;
        padding:15px
    }

    .recommend ul{
        list-style:none;
        float:left;
        margin-bottom:15px
    }
    .recommend ul li{
        float: left;
        width: 30%;
        margin-right: 5%;
        padding-bottom:10px
    }
    .recommend ul li:last-child{
        margin-right:0
    }

    .recommend ul li a{
        padding: 0;
        margin: 0;
    }

    .recommend ul li a h4{
        color:#6c6358;
        font-size:14px;
        font-weight:normal;
        max-height:36px;
        overflow:hidden;
        text-overflow : ellipsis ;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }

    .recommend ul li a img{
        width:100%;
        height: 100%;
        box-shadow: 0 10px 20px 0 rgba(0,0,0,0.08), 0px 4px 4px 0 rgba(0,0,0,0.08);
    }

    .recommend .novel-classification{
        padding:10px 0;
        border-top:1px solid #ededed
    }

    .recommend .novel-classification p{
        margin-bottom:10px;
    }

    .recommend .novel-classification p:last-child{
        margin-bottom:5px;
    }

    .recommend .novel-classification a.novel-type{
        color:#333;
        outline:none;
    }

    .recommend .novel-classification p.description{
        color:#807a73;
        font-size:14px;
    }

    .recommend .carousel-novel{
        margin:0 -20px;
    }

    .recommend .carousel-novel img{
        width:100%;
        height:100%;
    }

    .title-content{
        width:100%;
        padding:0 6px 6px 0;
    }
    .title-content em{
        display:inline-block;
        background:#ED6460;
        width:2.5px;
        height:12px;
    }
    .title-content span{
        color:#ED6460;
        font-weight:700;
        font-size:18px
    }
    .title-content .more{
        float:right;
    }
    .title-content .more a{
        color:#aba59a;
        font-size:14px;
    }

</style>
<script>
    const Vue = require('vue');
    const Swiper = require("swiper");
    Vue.use(require('vue-resource'));
    module.exports = {
        data(){
            return{
                recommendNovels:[],
                bestRecommendNovels:[]
            }
        },
        components:{
        },

        created: function () {


            },

        mounted: function () {
            var swiper = new Swiper('.swiper-container',{
                autoplay : 3000,
                loop:true
            });
            Vue.http.get("/femaleNovelRecommend").then(function (response){
                this.recommendNovels = response.body.results;
            }.bind(this));
            Vue.http.get("/femaleBestRecommend").then(function (response){
                this.bestRecommendNovels = response.body.results;
            }.bind(this));
            this.$store.commit({
                "type":"setCurrentRoute",
                "currentRoute":"girlChannel"
            })
        }
    }
</script>
