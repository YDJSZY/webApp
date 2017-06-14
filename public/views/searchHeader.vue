<template>
    <header>
        <div class="back">
            <a v-on:click="goBack()">

            </a>
        </div>
        <div class="hot-search-d">
            <button class="search-btn" v-on:click="searchTheKey()"></button>
            <input class="hot-search-text" v-model="searchKey">
        </div>
        <div class="main-page">
            <a href="#">首页</a>
        </div>
    </header>
</template>
<style>

</style>
<script>
    const Vue = require('vue');
    module.exports = {
        data(){
            return{
                searchKey:""
            }
        },
        methods:{
            goBack: function () {
                this.$router.go(-1);
            },

            searchTheKey: function () {
                if(!this.searchKey) return;
                this.$parent.searchKey = this.searchKey;
                this.$parent.searchNovel();
            },
        },
        computed:{

        },
        components:{

        }
    }
</script>
