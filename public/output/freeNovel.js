webpackJsonp([6],{

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

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(40)

	var Component = __webpack_require__(11)(
	  /* script */
	  __webpack_require__(42),
	  /* template */
	  __webpack_require__(43),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/luwenwei/WebstormProjects/webApp/public/views/freeNovel.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] freeNovel.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-ebe711a6", Component.options)
	  } else {
	    hotAPI.reload("data-v-ebe711a6", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(41);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(9)("293163b7", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-ebe711a6!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./freeNovel.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-ebe711a6!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./freeNovel.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n.main-content{\n    background-color:#fff;\n    padding:15px\n}\n.split-line{\n    margin:25px -15px 20px -15px;\n    height:10px;\n    background:#f5f5f5\n}\n.main-content .free-novels .title-content{\n    width:100%;\n    padding:0 6px 6px 0;\n}\n.main-content .free-novels .title-content em{\n    display:inline-block;\n    background:#ED6460;\n    width:2.5px;\n    height:12px;\n}\n.main-content .free-novels .title-content span{\n    color:#ED6460;\n    font-weight:700;\n    font-size:18px\n}\n.main-content .free-novels .title-content .more{\n    float:right;\n}\n.main-content .free-novels .title-content .more a{\n    color:#aba59a;\n    font-size:14px;\n}\n.main-content .free-novels .free-novels-main ul{\n    list-style:none;\n}\n.main-content .free-novels .free-novels-main ul li{\n    margin: 0 10px 15px 0;\n    width:100%;\n    height:128px;\n}\n.main-content .free-novels .free-novels-main ul li a{\n    display:inline-block;\n    width:100%;\n    height:100%;\n}\n.main-content .free-novels .free-novels-main ul li a span{\n    display:inline-block;\n    height:100%;\n    vertical-align:middle;\n}\n.main-content .free-novels .free-novels-main ul li a .novel-img{\n    margin-right:10px;\n    display:inline-block;\n}\n.main-content .free-novels .free-novels-main ul li a .novel-img img{\n    width:87px;\n    height:100%;\n    box-shadow: 0 10px 20px 0 rgba(0,0,0,0.08), 0px 4px 4px 0 rgba(0,0,0,0.08);\n}\n.main-content .free-novels .free-novels-main ul li a .novel-description{\n    width:64%;\n}\n.main-content .free-novels .free-novels-main ul li a .novel-description p{\n    height:32px;\n    line-height:32px;\n}\n.main-content .free-novels .free-novels-main ul li a .novel-description .title{\n    font-size:16px;\n    color:#6c6358;\n    height:32px;\n    line-height:32px;\n    overflow:hidden;\n    text-overflow : ellipsis ;\n    -webkit-box-orient:vertical;\n    -webkit-line-clamp:1;\n    white-space: nowrap;\n}\n.main-content .free-novels .free-novels-main ul li a .novel-description .author-type{\n    font-size:12px;\n    color:#aba59a;\n}\n.main-content .free-novels .free-novels-main ul li a .novel-description .description{\n    font-size:14px;\n    color:#807a73;\n    overflow:hidden;\n    text-overflow : ellipsis ;\n    -webkit-box-orient:vertical;\n    -webkit-line-clamp:1;\n    white-space: nowrap;\n}\n.main-content .free-novels .free-novels-main ul li a .novel-description .click-account{\n    font-size:15px;\n    color:#ed6460;\n}\n\n", ""]);

	// exports


/***/ },

/***/ 42:
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

	const Vue = __webpack_require__(1);
	const Swiper = __webpack_require__(18);
	Vue.use(__webpack_require__(19));
	module.exports = {
	    data() {
	        return {
	            femaleFreeNovels: [],
	            maleFreeNovels: []
	        };
	    },
	    components: {},

	    created: function () {},

	    mounted: function () {
	        Vue.http.get("/female_free_novels").then(function (response) {
	            this.femaleFreeNovels = response.body.results;
	        }.bind(this));
	        Vue.http.get("/male_free_novels").then(function (response) {
	            this.maleFreeNovels = response.body.results;
	        }.bind(this));
	        this.$store.commit({
	            "type": "setCurrentRoute",
	            "currentRoute": "freeNovel"
	        });
	    }
	};

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "main-content"
	  }, [_c('div', {
	    staticClass: "free-novels"
	  }, [_vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "free-novels-main"
	  }, [_c('ul', _vm._l((_vm.femaleFreeNovels), function(femaleNovel) {
	    return _c('li', [_c('a', [_c('span', {
	      staticClass: "novel-img"
	    }, [_c('img', {
	      attrs: {
	        "src": femaleNovel.image_url
	      }
	    })]), _vm._v(" "), _c('span', {
	      staticClass: "novel-description"
	    }, [_c('h3', {
	      staticClass: "title",
	      staticStyle: {
	        "line-height": "17px"
	      }
	    }, [_vm._v(_vm._s(femaleNovel.title))]), _vm._v(" "), _c('p', {
	      staticClass: "author-type"
	    }, [_vm._v(_vm._s(femaleNovel.authur + "/" + femaleNovel.type))]), _vm._v(" "), _c('p', {
	      staticClass: "description"
	    }, [_vm._v(_vm._s(femaleNovel.description))]), _vm._v(" "), _c('p', {
	      staticClass: "click-account",
	      staticStyle: {
	        "padding-top": "5px"
	      }
	    }, [_vm._v(_vm._s("点击量:" + femaleNovel.click_account))])])])])
	  }))]), _vm._v(" "), _c('div', {
	    staticClass: "split-line"
	  }), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
	    staticClass: "free-novels-main"
	  }, [_c('ul', _vm._l((_vm.maleFreeNovels), function(femaleNovel) {
	    return _c('li', [_c('a', [_c('span', {
	      staticClass: "novel-img"
	    }, [_c('img', {
	      attrs: {
	        "src": femaleNovel.image_url
	      }
	    })]), _vm._v(" "), _c('span', {
	      staticClass: "novel-description"
	    }, [_c('h3', {
	      staticClass: "title",
	      staticStyle: {
	        "line-height": "17px"
	      }
	    }, [_vm._v(_vm._s(femaleNovel.title))]), _vm._v(" "), _c('p', {
	      staticClass: "author-type"
	    }, [_vm._v(_vm._s(femaleNovel.authur + "/" + femaleNovel.type))]), _vm._v(" "), _c('p', {
	      staticClass: "description"
	    }, [_vm._v(_vm._s(femaleNovel.description))]), _vm._v(" "), _c('p', {
	      staticClass: "click-account",
	      staticStyle: {
	        "padding-top": "5px"
	      }
	    }, [_vm._v(_vm._s("点击量:" + femaleNovel.click_account))])])])])
	  }))])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "title-content"
	  }, [_c('em', {
	    staticClass: "em-l"
	  }), _vm._v(" "), _c('span', {
	    staticClass: "title"
	  }, [_vm._v("女生免费畅读")]), _vm._v(" "), _c('div', {
	    staticClass: "more"
	  }, [_c('a', {
	    attrs: {
	      "href": ""
	    }
	  }, [_vm._v("更多 >")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "title-content"
	  }, [_c('em', {
	    staticClass: "em-l"
	  }), _vm._v(" "), _c('span', {
	    staticClass: "title"
	  }, [_vm._v("男生免费畅读")]), _vm._v(" "), _c('div', {
	    staticClass: "more"
	  }, [_c('a', {
	    attrs: {
	      "href": ""
	    }
	  }, [_vm._v("更多 >")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-ebe711a6", module.exports)
	  }
	}

/***/ }

});