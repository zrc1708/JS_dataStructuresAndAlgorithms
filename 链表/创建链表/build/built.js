/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./创建链表/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./创建链表/index.js":
/*!***********************!*\
  !*** ./创建链表/index.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_LinkedList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/LinkedList */ \"./创建链表/src/LinkedList.js\");\n\n\nconst list = new _src_LinkedList__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nlist.push('a')\nconsole.log(list.toString())\nconsole.log(list.size())\n\nlist.push('b')\nlist.push('c')\nlist.push('d')\nconsole.log(list.toString())\nconsole.log(list.size())\n\nlist.remove('c')\nconsole.log(list.toString())\n\nlist.insert('z',1)\nconsole.log(list.toString())\n\n\n\n//# sourceURL=webpack:///./%E5%88%9B%E5%BB%BA%E9%93%BE%E8%A1%A8/index.js?");

/***/ }),

/***/ "./创建链表/src/LinkedList.js":
/*!********************************!*\
  !*** ./创建链表/src/LinkedList.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LinkedList; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./创建链表/src/util.js\");\n/* harmony import */ var _linked_list_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./linked-list-models */ \"./创建链表/src/linked-list-models.js\");\n\n // {1}\n\n// 对于 LinkedList 数据结构，我们从声明 count 属性开始（行{2}），它用来存储链表中的元素数量。\n\n// 我们要实现一个名为 indexOf 的方法，它使我们能够在链表中找到一个特定的元素。\n// 要比较链表中的元素是否相等，我们需要使用一个内部调用的函数，名为 equalsFn（行{4}）。\n// 使用linkedList 类的开发者可以自行传入用于比较两个 JavaScript 对象或值是否相等的自定义函数。\n// 如果没有传入这个自定义函数，该数据结构将使用 defaultEquals 函数\n\n// 由于该数据结构是动态的，我们还需要将第一个元素的引用保存下来。我们可以用一个叫作head 的元素保存引用（行{3}）\n// 要表示链表中的第一个以及其他元素，我们需要一个助手类，叫作 Node（行{1}）。\n// Node类表示我们想要添加到链表中的项。它包含一个 element 属性，该属性表示要加入链表元素的值；\n// 以及一个 next 属性，该属性是指向链表中下一个元素的指针。\n\nclass LinkedList {\n    constructor(equalsFn = _util__WEBPACK_IMPORTED_MODULE_0__[\"defaultEquals\"]) {\n        this.count = 0; // {2} \n        this.head = undefined; // {3} \n        this.equalsFn = equalsFn; // {4} \n    }\n\n    // 向链表尾部添加元素\n    push(element) {\n        const node = new _linked_list_models__WEBPACK_IMPORTED_MODULE_1__[\"Node\"](element);\n        let current;\n        if (this.head == null) {\n            this.head = node;\n        } else {\n            current = this.head;\n            while (current.next != null) {\n                current = current.next;\n            }\n            // 将其 next 赋为新元素，建立链接\n            current.next = node;\n        }\n        this.count++;\n    }\n    // 循环迭代链表直到目标位置\n    getElementAt(index) {\n        if (index >= 0 && index <= this.count) {\n            let node = this.head;\n            for (let i = 0; i < index && node != null; i++) {\n                node = node.next;\n            }\n            return node;\n        }\n        return undefined;\n    }\n    // 从链表中移除元素(从特定位置移除)\n    removeAt(index) {\n        // 检查越界值\n        if (index >= 0 && index < this.count) {\n            let current = this.head;\n            // 移除第一项\n            if (index === 0) {\n                this.head = current.next;\n            } else {\n                const previous = this.getElementAt(index - 1);\n                current = previous.next;\n                previous.next = current.next;\n            }\n            this.count--;\n            return current.element;\n        }\n        return undefined;\n    }\n    //  在任意位置插入元素\n    insert(element, index) {\n        if (index >= 0 && index <= this.count) {\n            const node = new _linked_list_models__WEBPACK_IMPORTED_MODULE_1__[\"Node\"](element);\n            if (index === 0) {\n                const current = this.head;\n                node.next = current;\n                this.head = node;\n            } else {\n                const previous = this.getElementAt(index - 1);\n                const current = previous.next;\n                node.next = current;\n                previous.next = node;\n            }\n            this.count++; // 更新链表的长度\n            return true;\n        }\n        return false;\n    }\n    //  indexOf 方法：返回一个元素的位置\n    indexOf(element) {\n        let current = this.head;\n        for (let i = 0; i < this.count && current != null; i++) {\n            if (this.equalsFn(element, current.element)) {\n                return i;\n            }\n            current = current.next;\n        }\n        return -1;\n    }\n    //  从链表中移除元素（移除指定的元素）\n    remove(element) {\n        const index = this.indexOf(element);\n        return this.removeAt(index);\n    }\n    // 获取链表长度\n    size() {\n        return this.count;\n    }\n    // 判断链表是否为空\n    isEmpty() {\n        return this.size() === 0;\n    }\n    // 获取链表头节点\n    getHead() {\n        return this.head;\n    }\n    //  toString 方法\n    toString() {\n        if (this.head == null) { \n            return '';\n        }\n        let objString = `${this.head.element}`;  \n        let current = this.head.next;  \n        for (let i = 1; i < this.size() && current != null; i++) { \n            objString = `${objString},${current.element}`;\n            current = current.next;\n        }\n        return objString; \n    }\n}\n\n//# sourceURL=webpack:///./%E5%88%9B%E5%BB%BA%E9%93%BE%E8%A1%A8/src/LinkedList.js?");

/***/ }),

/***/ "./创建链表/src/linked-list-models.js":
/*!****************************************!*\
  !*** ./创建链表/src/linked-list-models.js ***!
  \****************************************/
/*! exports provided: Node */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Node\", function() { return Node; });\nclass Node {\n    constructor(element) {\n        this.element = element;\n        this.next = undefined;\n    }\n}\n\n\n//# sourceURL=webpack:///./%E5%88%9B%E5%BB%BA%E9%93%BE%E8%A1%A8/src/linked-list-models.js?");

/***/ }),

/***/ "./创建链表/src/util.js":
/*!**************************!*\
  !*** ./创建链表/src/util.js ***!
  \**************************/
/*! exports provided: defaultEquals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultEquals\", function() { return defaultEquals; });\nfunction defaultEquals(a, b) {\n    return a === b;\n}\n\n//# sourceURL=webpack:///./%E5%88%9B%E5%BB%BA%E9%93%BE%E8%A1%A8/src/util.js?");

/***/ })

/******/ });