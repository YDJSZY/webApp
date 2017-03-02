<template>
    <div>
        <div>this is template {{msg}}</div>
    </div>
</template>
<style>
    body{
        background-color:#fff;
    }
</style>
<script>
    const Vue = require('vue');
    Vue.use(require('vue-resource'));
    module.exports = {
        data(){
            return{
                msg:'main',
            }
        },
        components:{
        },

        created: function () {


            },

        mounted: function () {

        }
    }
</script>
