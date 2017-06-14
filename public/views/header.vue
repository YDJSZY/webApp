<template>
    <header>
        <div class="wrapper-header bg-white" id="header">
            <div class="app-logo">
                <span class="logo"></span>
            </div>
            <!--<div class="app-title">
                <span class="title">知乎</span>
            </div>-->
            <div class="avatar">
                <router-link to="/search" class="search" style="color: #fff;font-size: 14px">
                    搜索
                </router-link>
                <i>|</i>
                <a class="account"></a>
            </div>
        </div>
        <div class="wrapper-navbar" id="navbar">
        <ul class="navbar-ul">
            <li>
                <router-link to="/manChannel" v-bind:class="{'a-active':currentRoute=='manChannel'}">男频</router-link>
            </li>
            <li style="">
                <router-link to="/girlChannel" v-bind:class="{'a-active':currentRoute=='girlChannel'}">女频</router-link>
            </li>
            <li>
                <router-link to="/published" v-bind:class="{'a-active':currentRoute=='published'}">出版</router-link>
            </li>
            <li>
                <router-link to="/classify" v-bind:class="{'a-active':currentRoute=='classify'}">分类</router-link>
            </li>
        </ul>
        <ul class="navbar-ul">
            <li>
                <router-link to="/freeNovel" v-bind:class="{'a-active':currentRoute=='freeNovel'}">免费</router-link>
            </li>
            <li style="">
                <a v-bind:class="{'a-active':currentRoute=='taste'}">口味</a>
            </li>
            <li>
                <a v-bind:class="{'a-active':currentRoute=='ranking'}">排行</a>
            </li>
            <li>
                <a v-bind:class="{'a-active':currentRoute=='recharge'}">充值</a>
            </li>
        </ul>
    </div>
    </header>
</template>
<style>
    header{
        margin-bottom:10px
    }

</style>
<script>
    const Vue = require('vue');
    module.exports = {
        data(){
            return{

            }
        },
        computed:{
            currentRoute:function() {
                return this.$store.state.currentRoute
            }
        },
        components:{

        }
    }
</script>
