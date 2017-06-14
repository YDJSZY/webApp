/**
 * Created by luwenwei on 17/3/2.
 */
const header = function (resolve) {
    require.ensure(["../views/header.vue"],function () {
        resolve(require("../views/header.vue"))
    },"header");
}

/*const footer = function (resolve) {
    require.ensure(["../views/footer.vue"],function () {
        resolve(require("../views/footer.vue"))
    },"footer");
}*/

const manChannel = function (resolve) {
    require.ensure(["../views/manChannel.vue"],function () {
        resolve(require("../views/manChannel.vue"))
    },"manChannel");
}

const girlChannel = function (resolve) {
    require.ensure(["../views/girlChannel.vue"],function () {
        resolve(require("../views/girlChannel.vue"))
    },"girlChannel");
}

const published = function (resolve) {
    require.ensure(["../views/published.vue"],function () {
        resolve(require("../views/published.vue"))
    },"published");
}

const classify = function (resolve) {
    require.ensure(["../views/classify.vue"],function () {
        resolve(require("../views/classify.vue"))
    },"classify");
}

const freeNovel = function (resolve) {
    require.ensure(["../views/freeNovel.vue"],function () {
        resolve(require("../views/freeNovel.vue"))
    },"freeNovel");
}

const search = function (resolve) {
    require.ensure(["../views/search.vue"],function () {
        resolve(require("../views/search.vue"))
    },"search");
}

const searchResults = function (resolve) {
    require.ensure(["../views/searchResults.vue"],function () {
        resolve(require("../views/searchResults.vue"))
    },"searchResults");
}

const recommendSearch = function (resolve) {
    require.ensure(["../views/recommendSearch.vue"],function () {
        resolve(require("../views/recommendSearch.vue"))
    },"recommendSearch");
}

const moreNovels = function (resolve) {
    require.ensure(["../views/moreNovels.vue"],function () {
        resolve(require("../views/moreNovels.vue"))
    },"moreNovels");
}

const Vue = require('vue');
const routes = [
    {
        path: '/manChannel',
        components: {
            default:manChannel,
            header:header,
            //footer:footer
        },
        //beforeEnter: beforeEnter(Vue)
    },
    {
        path: '/girlChannel',
        components:{
            default:girlChannel,
            header:header,
        } ,
        //beforeEnter: beforeEnter(Vue)
    },
    {
        path: '/published',
        components:{
            default:published,
            header:header,
        } ,
        //beforeEnter: beforeEnter(Vue)
    },
    {
        path: '/classify',
        components:{
            default:classify,
            header:header,
        } ,
        //beforeEnter: beforeEnter(Vue)
    },
    {
        path: '/freeNovel',
        components:{
            default:freeNovel,
            header:header,
        } ,
        //beforeEnter: beforeEnter(Vue)
    },
    {
        path: '/search',
        component: search,
        children: [
            {
                path: 'searchResults',
                component: searchResults
            },
            { 
                path: '',
                component: recommendSearch
            },
        ]
    },
    {
        path: '/moreNovels/',
        component:moreNovels
        //beforeEnter: beforeEnter(Vue)
    },
    {path: '*', redirect: '/manChannel'}
];

module.exports = routes;