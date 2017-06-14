<template>
    <div class="main-content">
        <div class="classify">
            <div class="classify-cl" v-for="classify in classifies">
                <div class="title-content">
                    <em class="em-l"></em>
                    <span class="title">{{classify.name}}</span>
                </div>
                <div class="classify-main">
                    <ul>
                        <li v-for="c in classify.classify">
                            <a>{{c.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .main-content{
        background-color:#fff;
        padding:15px;
    }

    .classify .classify-cl{
        margin-bottom:10px;
    }
    .classify .classify-cl .title-content{
        width:100%;
        padding:0 6px 6px 0;
    }
    .classify .classify-cl .title-content em{
        display:inline-block;
        background:#ED6460;
        width:2.5px;
        height:12px;
    }
    .classify .classify-cl .title-content span{
        color:#ED6460;
        font-weight:700;
        font-size:18px
    }
    .classify .classify-cl .classify-main{

    }
    .classify .classify-cl .classify-main ul{
        display:flex;
        display: -webkit-flex; /* Safari */
        flex-direction: row;
        justify-content:space-between;
        list-style:none;
        padding:0;
        margin:0;
        flex-wrap:wrap;
    }
    .classify .classify-cl .classify-main ul li{
        background:#f5f5f5;
        height:30px;
        width:32%;
        line-height:30px;
        text-align:center;
        margin:10px 0;
        border-radius:4px;
        padding:2px 0;
        margin-right:2%;
    }
    .classify .classify-cl .classify-main ul li:nth-child(3n+3){
        margin-right:0;
    }
    .classify .classify-cl .classify-main ul li a{
        color:#3b352d;
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
                classifies:""
            }
        },
        components:{
        },

        created: function () {


            },

        mounted: function () {
            Vue.http.get("/classify").then(function (response){
                this.classifies = response.body.results;
                console.log(this.classifies)
            }.bind(this));
            this.$store.commit({
                "type":"setCurrentRoute",
                "currentRoute":"classify"
            })
        }
    }
</script>
