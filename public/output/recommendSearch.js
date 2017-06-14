webpackJsonp([9],{

/***/ 8:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/

	var hasDocument = typeof document !== 'undefined'

	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}

	var listToStyles = __webpack_require__(10)

	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}

	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/

	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}

	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction

	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)

	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}

	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}

	function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = { css: css, media: media, sourceMap: sourceMap }
	    if (!newStyles[id]) {
	      part.id = parentId + ':0'
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      part.id = parentId + ':' + newStyles[id].parts.length
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}

	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}

	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
	  var hasSSR = styleElement != null

	  // if in production mode and style is already provided by SSR,
	  // simply do nothing.
	  if (hasSSR && isProduction) {
	    return noop
	  }

	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = styleElement || createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  if (!hasSSR) {
	    update(obj)
	  }

	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}

	var replaceText = (function () {
	  var textStore = []

	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()

	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}

	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap

	  if (media) {
	    styleElement.setAttribute('media', media)
	  }

	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ },

/***/ 10:
/***/ function(module, exports) {

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    }
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}


/***/ },

/***/ 11:
/***/ function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(55)

	var Component = __webpack_require__(11)(
	  /* script */
	  __webpack_require__(57),
	  /* template */
	  __webpack_require__(58),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/luwenwei/WebstormProjects/webApp/public/views/recommendSearch.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] recommendSearch.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-d3ab807e", Component.options)
	  } else {
	    hotAPI.reload("data-v-d3ab807e", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(56);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(9)("6b005411", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d3ab807e!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./recommendSearch.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d3ab807e!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./recommendSearch.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n.search-page header .main-page{\n    float:right;\n}\n.search-page header .main-page a{\n    color:#fff;\n    font-size:15px;\n}\n.search-page{\n    background-color:#fff;\n    width:100%;\n    height:100%;\n    padding:0\n}\n.search-page header{\n    height:34px;\n    background:#ed6460;\n    padding:5px 15px;\n    line-height:32px;\n    margin-bottom:0;\n}\n.search-page header div{\n    display:inline-block;\n}\n.search-page header .back{\n    margin-right:10px;\n    width:20px\n}\n.search-page header .back a{\n    background: url(\"/images/arrow-left.png\") 0 0 no-repeat;\n    background-size: 100% 100%;\n    display:inline-block;\n    width:10px;\n    height:18px;\n    vertical-align:middle;\n}\n.search-page header .hot-search-d{\n    width:auto;\n    position:absolute;\n    top:5px;\n    left:38px;\n    right:58px;\n}\n.search-page header .hot-search-d button.search-btn{\n    width:51px;\n    height:28px;\n    border:none;\n    top:3px;\n    position:absolute;\n    right:0;\n    background:url(\"/images/search (1).png\") center center no-repeat;\n    background-size: contain;\n    outline:none;\n}\n.search-page header .hot-search-d input{\n    width:100%;\n    height: 28px;\n    border:none;\n    border-radius: 20px;\n    text-indent: 15px;\n    background-color: #fff;\n    outline: none;\n    color:#6c6358\n}\n.search-page .people-search .tip{\n    height:44px;\n    background:#f5f5f5;\n    line-height:44px;\n    color:#807a73;\n    font-size:14px;\n    padding-left:15px;\n}\n.search-page .people-search .search-tip{\n    padding-top:15px;\n}\n.search-page .people-search .search-tip span{\n     margin:0 0 15px 15px;\n     display:inline-block;\n     position:relative\n}\n.search-page .people-search .search-tip .tip-link{\n    display:inline-block;\n    padding:5px 10px;\n    text-align:center;\n    color:#aba59a;\n    border:1px solid #c8c8c8;\n    border-radius:5px;\n    font-size:14px;\n}\n.search-page .people-search .search-tip .tip-hot{\n    background:url(\"/images/hot.png\") no-repeat;\n    display: inline-block;\n    background-size: 30px 14px;\n    width: 30px;\n    position: absolute;\n    height: 20px;\n    top: -6px;\n    left: 5px;\n}\n.search-page .people-search .search-tip .tip-new{\n    background:url(\"/images/new.png\") no-repeat;\n    display: inline-block;\n    background-size: 30px 14px;\n    width: 30px;\n    position: absolute;\n    height: 20px;\n    top: -6px;\n    left: 5px;\n}\n.search-page .recent-search{\n    background:#f5f5f5;\n    color:#807a73;\n    height:44px;\n    padding:0 15px;\n    line-height:44px;\n    font-size:14px;\n}\n.search-page .clear-record{\n    background:url(\"/images/clear.png\") no-repeat;\n    background-size:13px 13px;\n    display:inline-block;\n    width:13px;\n    height:13px;\n    margin-top:15px;\n    float:right;\n}\n", ""]);

	// exports


/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	const Vue = __webpack_require__(1);
	const vue = new Vue();
	Vue.use(__webpack_require__(19));
	module.exports = {
	    data() {
	        return {
	            hotSearch: {},
	            searchKey: "",
	            recentSearch: []
	        };
	    },
	    components: {},

	    computed: {
	        lastRoute: function () {
	            return this.$store.state.lastRoute;
	        }
	    },

	    methods: {
	        setBackground: function (type) {
	            return type == "hot" ? "tip-hot" : type == "new" ? "tip-new" : "";
	        },

	        searchNovel: function () {
	            if (!this.searchKey) return;
	            this.$parent.searchKey = this.searchKey;
	            this.$parent.searchNovel();
	        },

	        searchTheKey: function (key) {
	            if (!key) return;
	            this.$parent.searchKey = key;
	            this.$parent.searchNovel();
	        },

	        clearRecentSearch: function () {
	            vue.clearStoreByField("searchRecords");
	            this.recentSearch = [];
	        },

	        goBack: function () {
	            this.$router.go(-1);
	        }
	    },

	    created: function () {},

	    mounted: function () {
	        Vue.http.get("/hot_search").then(function (response) {
	            this.hotSearch = response.body.results[0];
	        }.bind(this));
	        this.$store.commit({
	            "type": "setCurrentRoute",
	            "currentRoute": "search"
	        });
	        this.$parent.searchKey = "";
	        this.recentSearch = vue.getLocalStore()["searchRecords"];
	    },

	    watch: {
	        searchKey: function (curVal, oldVal) {
	            console.log(curVal);
	        }
	    }
	};

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('header', [_c('div', {
	    staticClass: "back"
	  }, [_c('router-link', {
	    attrs: {
	      "to": _vm.lastRoute
	    }
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "hot-search-d"
	  }, [_c('button', {
	    staticClass: "search-btn",
	    on: {
	      "click": function($event) {
	        _vm.searchNovel()
	      }
	    }
	  }), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.searchKey),
	      expression: "searchKey"
	    }],
	    staticClass: "hot-search-text",
	    domProps: {
	      "value": (_vm.searchKey)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.searchKey = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('div', {
	    staticClass: "people-search"
	  }, [_c('div', {
	    staticClass: "tip"
	  }, [_vm._v("大家都在搜")]), _vm._v(" "), _c('div', {
	    staticClass: "search-tip"
	  }, _vm._l((_vm.hotSearch['hot_search']), function(s_tip) {
	    return _c('span', {
	      on: {
	        "click": function($event) {
	          _vm.searchTheKey(s_tip.name)
	        }
	      }
	    }, [_c('i', {
	      class: _vm.setBackground(s_tip.type)
	    }), _vm._v(" "), _c('a', {
	      staticClass: "tip-link"
	    }, [_vm._v("\n                    " + _vm._s(s_tip.name) + "\n                ")])])
	  })), _vm._v(" "), _c('div', {
	    staticClass: "recent-search"
	  }, [_c('span', [_vm._v("最近搜索")]), _vm._v(" "), _c('span', {
	    staticClass: "clear-record",
	    on: {
	      "click": function($event) {
	        _vm.clearRecentSearch()
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "recent-search-content"
	  }, [_c('div', {
	    staticClass: "search-tip"
	  }, _vm._l((_vm.recentSearch), function(s_tip) {
	    return _c('span', {
	      on: {
	        "click": function($event) {
	          _vm.searchTheKey(s_tip)
	        }
	      }
	    }, [_c('a', {
	      staticClass: "tip-link"
	    }, [_vm._v("\n                    " + _vm._s(s_tip) + "\n                ")])])
	  }))])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "main-page"
	  }, [_c('a', {
	    attrs: {
	      "href": "#"
	    }
	  }, [_vm._v("首页")])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-d3ab807e", module.exports)
	  }
	}

/***/ }

});