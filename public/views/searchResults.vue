<template>
    <div>
        <header>
            <div class="back">
                <router-link to="/search">

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
        {{msg}}
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
</style>
<script>
    const Vue = require("vue");
    const vue = new Vue();
    module.exports = {
        data(){
            return{
                msg:'hello vue',
                searchKey:""
            }
        },
         methods:{
            searchNovel: function () {
                this.$router.push({path:"/search/searchResults",query:{"searchKey":this.searchKey}});
                this.getData();
            },

            getData: function () {
                console.log(this.searchKey);
            },

            goBack: function () {
                this.$router.go(-1);
            },
        },

        created: function () {


            },

        mounted: function () {
            this.searchKey = this.$route.query.searchKey;
            this.getData()
        },
    }
</script>
