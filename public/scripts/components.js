/**
 * Created by luwenwei on 17/5/7.
 */
const Vue = require("vue");
var loading = Vue.extend({
    "template":'<div class="fl spinner7"><div class="circ1"></div><div class="circ2"></div><div class="circ3"></div><div class="circ4"></div></div>'
})
Vue.component("loading",loading);

