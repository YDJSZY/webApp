/**
 * Created by Apple on 16/12/19.
 */
var obj = {
    state : {
        "currentRoute":"manChannel",
        "lastRoute":"/"
    },
    getters : {
        getNa:function(state) {
            return state.na+"o";
        }
    },
    mutations:{
        setCurrentRoute:function(state,payload){
            state.currentRoute = payload.currentRoute;
        },

        setLastRoute:function(state,payload){
            state.lastRoute = payload.lastRoute;
        },
    }
}

module.exports = obj;