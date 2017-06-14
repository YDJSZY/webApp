<template>
    <div class="search-page">
        <router-view></router-view>
    </div>
</template>
<style>
    .content-wrapper {
        padding-top: 0;
    }

    .cke{
        visibility: inherit;
    }

</style>
<script>
    const Vue = require('vue');
    const vue = new Vue();
    const router = require("vue-router");
    //const CKEDITOR = require("../node_modules/ckeditor/ckeditor.js");
    module.exports = {
        data(){
            return{
                searchKey:"",
                localStore:{}
            }
        },
        components:{
        },
        methods:{
            searchNovel: function () {
                console.log(this.$route)
                console.log(this)
                if(!this.searchKey && this.searchKey!==0) return;
                var searchRecords = this.getLocalStoreField("searchRecords") || [];
                if(searchRecords.indexOf(this.searchKey)==-1){
                    searchRecords.push(this.searchKey);
                    if(searchRecords.length==10){
                        searchRecords.shift();
                    }
                }
                this.setLocalStore("searchRecords",searchRecords);
                this.$router.push({path:"/search/searchResults",query:{"searchKey":this.searchKey}})
            },

            getLocalStoreField: function (field) {
                this.localStore = vue.getLocalStore();
                return this.localStore[field];
            },

            setLocalStore: function (field,value) {
                this.localStore[field] = value;
                vue.setLocalStore(this.localStore)
            }
        },

        created: function () {


            },

        mounted: function () {
            this.$store.commit({
                "type":"setCurrentRoute",
                "currentRoute":"search"
            });
        },

        watch:{
            searchKey:function(curVal,oldVal) {

            }
        }
    }
</script>
