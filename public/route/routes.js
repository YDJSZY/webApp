/**
 * Created by luwenwei on 17/3/2.
 */
const main = function (resolve) {
    require.ensure(["../views/main.vue"],function () {
        resolve(require("../views/main.vue"))
    },"main");
}
const Vue = require('vue');
const routes = [
    {
        path: '/main',
        component: main,
        //beforeEnter: beforeEnter(Vue)
    },
    {path: '*', redirect: '/main'}
];

module.exports = routes;