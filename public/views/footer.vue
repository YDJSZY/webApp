<template>
    <div>
        <header-component/>
        <div>this is template body</div>
        <other-component/>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
     module.exports = {
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
