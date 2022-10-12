/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/convert-hex/convert-hex.js":
/*!*************************************************!*\
  !*** ./node_modules/convert-hex/convert-hex.js ***!
  \*************************************************/
/***/ (function(module) {

eval("!function(globals) {\n'use strict'\n\nvar convertHex = {\n  bytesToHex: function(bytes) {\n    /*if (typeof bytes.byteLength != 'undefined') {\n      var newBytes = []\n\n      if (typeof bytes.buffer != 'undefined')\n        bytes = new DataView(bytes.buffer)\n      else\n        bytes = new DataView(bytes)\n\n      for (var i = 0; i < bytes.byteLength; ++i) {\n        newBytes.push(bytes.getUint8(i))\n      }\n      bytes = newBytes\n    }*/\n    return arrBytesToHex(bytes)\n  },\n  hexToBytes: function(hex) {\n    if (hex.length % 2 === 1) throw new Error(\"hexToBytes can't have a string with an odd number of characters.\")\n    if (hex.indexOf('0x') === 0) hex = hex.slice(2)\n    return hex.match(/../g).map(function(x) { return parseInt(x,16) })\n  }\n}\n\n\n// PRIVATE\n\nfunction arrBytesToHex(bytes) {\n  return bytes.map(function(x) { return padLeft(x.toString(16),2) }).join('')\n}\n\nfunction padLeft(orig, len) {\n  if (orig.length > len) return orig\n  return Array(len - orig.length + 1).join('0') + orig\n}\n\n\nif ( true && module.exports) { //CommonJS\n  module.exports = convertHex\n} else {\n  globals.convertHex = convertHex\n}\n\n}(this);\n\n//# sourceURL=webpack://final-project/./node_modules/convert-hex/convert-hex.js?");

/***/ }),

/***/ "./node_modules/convert-string/convert-string.js":
/*!*******************************************************!*\
  !*** ./node_modules/convert-string/convert-string.js ***!
  \*******************************************************/
/***/ (function(module) {

eval("!function(globals) {\n'use strict'\n\nvar convertString = {\n  bytesToString: function(bytes) {\n    return bytes.map(function(x){ return String.fromCharCode(x) }).join('')\n  },\n  stringToBytes: function(str) {\n    return str.split('').map(function(x) { return x.charCodeAt(0) })\n  }\n}\n\n//http://hossa.in/2012/07/20/utf-8-in-javascript.html\nconvertString.UTF8 = {\n   bytesToString: function(bytes) {\n    return decodeURIComponent(escape(convertString.bytesToString(bytes)))\n  },\n  stringToBytes: function(str) {\n   return convertString.stringToBytes(unescape(encodeURIComponent(str)))\n  }\n}\n\nif ( true && module.exports) { //CommonJS\n  module.exports = convertString\n} else {\n  globals.convertString = convertString\n}\n\n}(this);\n\n//# sourceURL=webpack://final-project/./node_modules/convert-string/convert-string.js?");

/***/ }),

/***/ "./node_modules/sha256/lib/sha256.js":
/*!*******************************************!*\
  !*** ./node_modules/sha256/lib/sha256.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("!function(globals) {\n'use strict'\n\nvar _imports = {}\n\nif ( true && module.exports) { //CommonJS\n  _imports.bytesToHex = (__webpack_require__(/*! convert-hex */ \"./node_modules/convert-hex/convert-hex.js\").bytesToHex)\n  _imports.convertString = __webpack_require__(/*! convert-string */ \"./node_modules/convert-string/convert-string.js\")\n  module.exports = sha256\n} else {\n  _imports.bytesToHex = globals.convertHex.bytesToHex\n  _imports.convertString = globals.convertString\n  globals.sha256 = sha256\n}\n\n/*\nCryptoJS v3.1.2\ncode.google.com/p/crypto-js\n(c) 2009-2013 by Jeff Mott. All rights reserved.\ncode.google.com/p/crypto-js/wiki/License\n*/\n\n// Initialization round constants tables\nvar K = []\n\n// Compute constants\n!function () {\n  function isPrime(n) {\n    var sqrtN = Math.sqrt(n);\n    for (var factor = 2; factor <= sqrtN; factor++) {\n      if (!(n % factor)) return false\n    }\n\n    return true\n  }\n\n  function getFractionalBits(n) {\n    return ((n - (n | 0)) * 0x100000000) | 0\n  }\n\n  var n = 2\n  var nPrime = 0\n  while (nPrime < 64) {\n    if (isPrime(n)) {\n      K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3))\n      nPrime++\n    }\n\n    n++\n  }\n}()\n\nvar bytesToWords = function (bytes) {\n  var words = []\n  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {\n    words[b >>> 5] |= bytes[i] << (24 - b % 32)\n  }\n  return words\n}\n\nvar wordsToBytes = function (words) {\n  var bytes = []\n  for (var b = 0; b < words.length * 32; b += 8) {\n    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF)\n  }\n  return bytes\n}\n\n// Reusable object\nvar W = []\n\nvar processBlock = function (H, M, offset) {\n  // Working variables\n  var a = H[0], b = H[1], c = H[2], d = H[3]\n  var e = H[4], f = H[5], g = H[6], h = H[7]\n\n    // Computation\n  for (var i = 0; i < 64; i++) {\n    if (i < 16) {\n      W[i] = M[offset + i] | 0\n    } else {\n      var gamma0x = W[i - 15]\n      var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^\n                    ((gamma0x << 14) | (gamma0x >>> 18)) ^\n                    (gamma0x >>> 3)\n\n      var gamma1x = W[i - 2];\n      var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^\n                    ((gamma1x << 13) | (gamma1x >>> 19)) ^\n                    (gamma1x >>> 10)\n\n      W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];\n    }\n\n    var ch  = (e & f) ^ (~e & g);\n    var maj = (a & b) ^ (a & c) ^ (b & c);\n\n    var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));\n    var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));\n\n    var t1 = h + sigma1 + ch + K[i] + W[i];\n    var t2 = sigma0 + maj;\n\n    h = g;\n    g = f;\n    f = e;\n    e = (d + t1) | 0;\n    d = c;\n    c = b;\n    b = a;\n    a = (t1 + t2) | 0;\n  }\n\n  // Intermediate hash value\n  H[0] = (H[0] + a) | 0;\n  H[1] = (H[1] + b) | 0;\n  H[2] = (H[2] + c) | 0;\n  H[3] = (H[3] + d) | 0;\n  H[4] = (H[4] + e) | 0;\n  H[5] = (H[5] + f) | 0;\n  H[6] = (H[6] + g) | 0;\n  H[7] = (H[7] + h) | 0;\n}\n\nfunction sha256(message, options) {;\n  if (message.constructor === String) {\n    message = _imports.convertString.UTF8.stringToBytes(message);\n  }\n\n  var H =[ 0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,\n           0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19 ];\n\n  var m = bytesToWords(message);\n  var l = message.length * 8;\n\n  m[l >> 5] |= 0x80 << (24 - l % 32);\n  m[((l + 64 >> 9) << 4) + 15] = l;\n\n  for (var i=0 ; i<m.length; i += 16) {\n    processBlock(H, m, i);\n  }\n\n  var digestbytes = wordsToBytes(H);\n  return options && options.asBytes ? digestbytes :\n         options && options.asString ? _imports.convertString.bytesToString(digestbytes) :\n         _imports.bytesToHex(digestbytes)\n}\n\nsha256.x2 = function(message, options) {\n  return sha256(sha256(message, { asBytes:true }), options)\n}\n\n}(this);\n\n\n//# sourceURL=webpack://final-project/./node_modules/sha256/lib/sha256.js?");

/***/ }),

/***/ "./src/callbacks/authLoginCallback.js":
/*!********************************************!*\
  !*** ./src/callbacks/authLoginCallback.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authLoginCallback\": () => (/* binding */ authLoginCallback)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\r\n\r\nfunction authLoginCallback (event) {\r\n    localStorage.getItem(event.target.value)\r\n        ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.setPasswordParams)('auth', '#090', false)\r\n        : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.setPasswordParams)('auth', '#b00', true)\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/callbacks/authLoginCallback.js?");

/***/ }),

/***/ "./src/callbacks/authPasswordCallback.js":
/*!***********************************************!*\
  !*** ./src/callbacks/authPasswordCallback.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authPasswordCallback\": () => (/* binding */ authPasswordCallback)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\r\n\r\nfunction authPasswordCallback (event) {\r\n    event.target.value.match(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)\r\n        ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.setSubmitParams)('auth', '#090', false)\r\n        : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.setSubmitParams)('auth', '#b00', true)\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/callbacks/authPasswordCallback.js?");

/***/ }),

/***/ "./src/callbacks/index.js":
/*!********************************!*\
  !*** ./src/callbacks/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authLoginCallback\": () => (/* reexport safe */ _authLoginCallback__WEBPACK_IMPORTED_MODULE_0__.authLoginCallback),\n/* harmony export */   \"authPasswordCallback\": () => (/* reexport safe */ _authPasswordCallback__WEBPACK_IMPORTED_MODULE_1__.authPasswordCallback),\n/* harmony export */   \"registrationLoginCallback\": () => (/* reexport safe */ _registrationLoginCallback__WEBPACK_IMPORTED_MODULE_2__.registrationLoginCallback),\n/* harmony export */   \"registrationPasswordCallback\": () => (/* reexport safe */ _registrationPasswordCallback__WEBPACK_IMPORTED_MODULE_3__.registrationPasswordCallback)\n/* harmony export */ });\n/* harmony import */ var _authLoginCallback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authLoginCallback */ \"./src/callbacks/authLoginCallback.js\");\n/* harmony import */ var _authPasswordCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authPasswordCallback */ \"./src/callbacks/authPasswordCallback.js\");\n/* harmony import */ var _registrationLoginCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registrationLoginCallback */ \"./src/callbacks/registrationLoginCallback.js\");\n/* harmony import */ var _registrationPasswordCallback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./registrationPasswordCallback */ \"./src/callbacks/registrationPasswordCallback.js\");\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://final-project/./src/callbacks/index.js?");

/***/ }),

/***/ "./src/callbacks/registrationLoginCallback.js":
/*!****************************************************!*\
  !*** ./src/callbacks/registrationLoginCallback.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registrationLoginCallback\": () => (/* binding */ registrationLoginCallback)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\r\n\r\nfunction registrationLoginCallback (event) {\r\n    localStorage.getItem(event.target.value)\r\n        ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.setPasswordParams)('reg', '#d00', true)\r\n        : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.setPasswordParams)('reg', '#090', false)\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/callbacks/registrationLoginCallback.js?");

/***/ }),

/***/ "./src/callbacks/registrationPasswordCallback.js":
/*!*******************************************************!*\
  !*** ./src/callbacks/registrationPasswordCallback.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registrationPasswordCallback\": () => (/* binding */ registrationPasswordCallback)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\r\n\r\nfunction registrationPasswordCallback (event) {\r\n    event.target.value.match(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)\r\n        ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.setSubmitParams)('reg', '#090', false)\r\n        : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.setSubmitParams)('reg', '#d00', true)\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/callbacks/registrationPasswordCallback.js?");

/***/ }),

/***/ "./src/components/authorization.js":
/*!*****************************************!*\
  !*** ./src/components/authorization.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authorization\": () => (/* binding */ authorization)\n/* harmony export */ });\n/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ \"./src/templates/index.js\");\n/* harmony import */ var _callbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../callbacks */ \"./src/callbacks/index.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n/* harmony import */ var sha256__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sha256 */ \"./node_modules/sha256/lib/sha256.js\");\n/* harmony import */ var sha256__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sha256__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction authorization () {\r\n    const main = document.getElementsByTagName('main')[0]\r\n\r\n    main.innerHTML = _templates__WEBPACK_IMPORTED_MODULE_0__.authorizationTemplate\r\n\r\n    ;(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.getAuthElems)()\r\n\r\n    _helpers__WEBPACK_IMPORTED_MODULE_2__.authElems.login.oninput = _callbacks__WEBPACK_IMPORTED_MODULE_1__.authLoginCallback\r\n\r\n    _helpers__WEBPACK_IMPORTED_MODULE_2__.authElems.password.oninput = _callbacks__WEBPACK_IMPORTED_MODULE_1__.authPasswordCallback\r\n\r\n    _helpers__WEBPACK_IMPORTED_MODULE_2__.authElems.submit.onclick = function(event) {\r\n        event.target.disabled = true\r\n\r\n        const test = sha256__WEBPACK_IMPORTED_MODULE_3___default()(_helpers__WEBPACK_IMPORTED_MODULE_2__.authElems.password.value) === localStorage.getItem(_helpers__WEBPACK_IMPORTED_MODULE_2__.authElems.login.value)\r\n\r\n        _helpers__WEBPACK_IMPORTED_MODULE_2__.authElems.message.innerText = test ? `Hello ${_helpers__WEBPACK_IMPORTED_MODULE_2__.authElems.login.value}` : 'Invalid password'\r\n        test ? (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.getUser)(_helpers__WEBPACK_IMPORTED_MODULE_2__.authElems.login.value)\r\n            .then(response => { _helpers__WEBPACK_IMPORTED_MODULE_2__.authElems.picture.src = response.avatar || null }) : null\r\n\r\n        ;(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.stylizeButton)(event.target, test)\r\n        ;(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.stylizeMessage)(_helpers__WEBPACK_IMPORTED_MODULE_2__.authElems.message, test)\r\n        \r\n        ;(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.hideAuthElements)(test)\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/components/authorization.js?");

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authorization\": () => (/* reexport safe */ _authorization__WEBPACK_IMPORTED_MODULE_0__.authorization),\n/* harmony export */   \"registration\": () => (/* reexport safe */ _registration__WEBPACK_IMPORTED_MODULE_1__.registration)\n/* harmony export */ });\n/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authorization */ \"./src/components/authorization.js\");\n/* harmony import */ var _registration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registration */ \"./src/components/registration.js\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://final-project/./src/components/index.js?");

/***/ }),

/***/ "./src/components/registration.js":
/*!****************************************!*\
  !*** ./src/components/registration.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registration\": () => (/* binding */ registration)\n/* harmony export */ });\n/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ \"./src/templates/index.js\");\n/* harmony import */ var _callbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../callbacks */ \"./src/callbacks/index.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n/* harmony import */ var sha256__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sha256 */ \"./node_modules/sha256/lib/sha256.js\");\n/* harmony import */ var sha256__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sha256__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n \r\n \r\n\r\n\r\n\r\nfunction registration () {\r\n    const main = document.getElementsByTagName('main')[0]\r\n\r\n    main.innerHTML = _templates__WEBPACK_IMPORTED_MODULE_0__.registrationTemplate\r\n\r\n    ;(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.getRegElems)()\r\n        \r\n    _helpers__WEBPACK_IMPORTED_MODULE_2__.regElems.login.oninput = _callbacks__WEBPACK_IMPORTED_MODULE_1__.registrationLoginCallback\r\n    \r\n    _helpers__WEBPACK_IMPORTED_MODULE_2__.regElems.password.oninput = _callbacks__WEBPACK_IMPORTED_MODULE_1__.registrationPasswordCallback\r\n    \r\n    _helpers__WEBPACK_IMPORTED_MODULE_2__.regElems.avatar.onchange = function (event) {\r\n        ;(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.readImage)(event.target.files[0])\r\n    }\r\n    \r\n    _helpers__WEBPACK_IMPORTED_MODULE_2__.regElems.submit.onclick = function (event) {\r\n        const password = sha256__WEBPACK_IMPORTED_MODULE_3___default()(_helpers__WEBPACK_IMPORTED_MODULE_2__.regElems.password.value)\r\n\r\n        event.target.style.color = '#090'  \r\n\r\n        Object.keys(_helpers__WEBPACK_IMPORTED_MODULE_2__.regElems)\r\n            .forEach(key => Object.assign(_helpers__WEBPACK_IMPORTED_MODULE_2__.regElems[key], { disabled: true }))\r\n            \r\n        ;(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.createUser)(_helpers__WEBPACK_IMPORTED_MODULE_2__.regElems.login.value, {\r\n            password,\r\n            avatar: _helpers__WEBPACK_IMPORTED_MODULE_2__.regElems.picture.src\r\n        })\r\n            .then(() => {\r\n                localStorage.setItem(_helpers__WEBPACK_IMPORTED_MODULE_2__.regElems.login.value, password)\r\n                _helpers__WEBPACK_IMPORTED_MODULE_2__.regElems[\"registration-form\"].remove()\r\n            })\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/components/registration.js?");

/***/ }),

/***/ "./src/configs/host.js":
/*!*****************************!*\
  !*** ./src/configs/host.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"host\": () => (/* binding */ host)\n/* harmony export */ });\nconst host = 'https://garevna-rest-api.glitch.me'\r\n\n\n//# sourceURL=webpack://final-project/./src/configs/host.js?");

/***/ }),

/***/ "./src/helpers/addElem.js":
/*!********************************!*\
  !*** ./src/helpers/addElem.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addElem\": () => (/* binding */ addElem)\n/* harmony export */ });\nfunction addElem (tagName, container = document.body) {\r\n    return container.nodeType === 1\r\n            ? container.appendChild(document.createElement(tagName)) \r\n            : null\r\n} \r\n\n\n//# sourceURL=webpack://final-project/./src/helpers/addElem.js?");

/***/ }),

/***/ "./src/helpers/createUser.js":
/*!***********************************!*\
  !*** ./src/helpers/createUser.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createUser\": () => (/* binding */ createUser)\n/* harmony export */ });\n/* harmony import */ var _configs_host__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../configs/host */ \"./src/configs/host.js\");\n\r\n\r\nasync function createUser (id, user) {\r\n    return await(await fetch(`${_configs_host__WEBPACK_IMPORTED_MODULE_0__.host}/user/${id}`, {\r\n            method: \"POST\",\r\n            headers: {\r\n            \"Content-Type\": \"application/json\"\r\n            },\r\n            body: JSON.stringify(user) \r\n        })).json()\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/helpers/createUser.js?");

/***/ }),

/***/ "./src/helpers/elems-handler.js":
/*!**************************************!*\
  !*** ./src/helpers/elems-handler.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authElems\": () => (/* binding */ authElems),\n/* harmony export */   \"getAuthElems\": () => (/* binding */ getAuthElems),\n/* harmony export */   \"getRegElems\": () => (/* binding */ getRegElems),\n/* harmony export */   \"regElems\": () => (/* binding */ regElems)\n/* harmony export */ });\nconst regElems = {}\r\nconst authElems = {}\r\n\r\nconst getAuthElems = () => Object.assign(authElems, ['registration-form', 'login', 'password', 'submit', 'message', 'picture']\r\n    .map(id => ( { [id]: document.getElementById(id)}))\r\n    .reduce((result, link) => Object.assign(result, link), {}))\r\n\r\nconst getRegElems = () => Object.assign(regElems, ['registration-form', 'login', 'password', 'avatar', 'message', 'picture', 'submit']\r\n    .map(id => ({ [id]: document.getElementById(id) }))\r\n    .reduce((result, link) => Object.assign(result, link), {}))\r\n\n\n//# sourceURL=webpack://final-project/./src/helpers/elems-handler.js?");

/***/ }),

/***/ "./src/helpers/getAllUsers.js":
/*!************************************!*\
  !*** ./src/helpers/getAllUsers.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAllUsers\": () => (/* binding */ getAllUsers)\n/* harmony export */ });\n/* harmony import */ var _configs_host__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../configs/host */ \"./src/configs/host.js\");\n\r\n\r\nasync function getAllUsers () {\r\n   return await (await fetch(`${_configs_host__WEBPACK_IMPORTED_MODULE_0__.host}/users/all`)).json()\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/helpers/getAllUsers.js?");

/***/ }),

/***/ "./src/helpers/getUser.js":
/*!********************************!*\
  !*** ./src/helpers/getUser.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getUser\": () => (/* binding */ getUser)\n/* harmony export */ });\n/* harmony import */ var _configs_host__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../configs/host */ \"./src/configs/host.js\");\n\r\n\r\nasync function getUser (login) {\r\n    return await (await fetch(`${_configs_host__WEBPACK_IMPORTED_MODULE_0__.host}/user/${login}`)).json()\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/helpers/getUser.js?");

/***/ }),

/***/ "./src/helpers/hideAuthElements.js":
/*!*****************************************!*\
  !*** ./src/helpers/hideAuthElements.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"hideAuthElements\": () => (/* binding */ hideAuthElements)\n/* harmony export */ });\n/* harmony import */ var _elems_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elems-handler */ \"./src/helpers/elems-handler.js\");\n\r\n\r\nfunction hideAuthElements (test) {\r\n    const display = test ? 'none' : 'block'\r\n\r\n    _elems_handler__WEBPACK_IMPORTED_MODULE_0__.authElems.login.style.display = display\r\n    _elems_handler__WEBPACK_IMPORTED_MODULE_0__.authElems.password.style.display = display\r\n    _elems_handler__WEBPACK_IMPORTED_MODULE_0__.authElems.submit.style.display = display\r\n}\n\n//# sourceURL=webpack://final-project/./src/helpers/hideAuthElements.js?");

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addElem\": () => (/* reexport safe */ _addElem__WEBPACK_IMPORTED_MODULE_0__.addElem),\n/* harmony export */   \"authElems\": () => (/* reexport safe */ _elems_handler__WEBPACK_IMPORTED_MODULE_10__.authElems),\n/* harmony export */   \"createUser\": () => (/* reexport safe */ _createUser__WEBPACK_IMPORTED_MODULE_1__.createUser),\n/* harmony export */   \"getAllUsers\": () => (/* reexport safe */ _getAllUsers__WEBPACK_IMPORTED_MODULE_2__.getAllUsers),\n/* harmony export */   \"getAuthElems\": () => (/* reexport safe */ _elems_handler__WEBPACK_IMPORTED_MODULE_10__.getAuthElems),\n/* harmony export */   \"getRegElems\": () => (/* reexport safe */ _elems_handler__WEBPACK_IMPORTED_MODULE_10__.getRegElems),\n/* harmony export */   \"getUser\": () => (/* reexport safe */ _getUser__WEBPACK_IMPORTED_MODULE_3__.getUser),\n/* harmony export */   \"hideAuthElements\": () => (/* reexport safe */ _hideAuthElements__WEBPACK_IMPORTED_MODULE_4__.hideAuthElements),\n/* harmony export */   \"readImage\": () => (/* reexport safe */ _readImage__WEBPACK_IMPORTED_MODULE_5__.readImage),\n/* harmony export */   \"regElems\": () => (/* reexport safe */ _elems_handler__WEBPACK_IMPORTED_MODULE_10__.regElems),\n/* harmony export */   \"setPasswordParams\": () => (/* reexport safe */ _setPasswordParams__WEBPACK_IMPORTED_MODULE_6__.setPasswordParams),\n/* harmony export */   \"setSubmitParams\": () => (/* reexport safe */ _setSubmitParams__WEBPACK_IMPORTED_MODULE_7__.setSubmitParams),\n/* harmony export */   \"stylizeButton\": () => (/* reexport safe */ _stylizeButton__WEBPACK_IMPORTED_MODULE_9__.stylizeButton),\n/* harmony export */   \"stylizeMessage\": () => (/* reexport safe */ _stylizeMessage__WEBPACK_IMPORTED_MODULE_8__.stylizeMessage)\n/* harmony export */ });\n/* harmony import */ var _addElem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addElem */ \"./src/helpers/addElem.js\");\n/* harmony import */ var _createUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createUser */ \"./src/helpers/createUser.js\");\n/* harmony import */ var _getAllUsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getAllUsers */ \"./src/helpers/getAllUsers.js\");\n/* harmony import */ var _getUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getUser */ \"./src/helpers/getUser.js\");\n/* harmony import */ var _hideAuthElements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hideAuthElements */ \"./src/helpers/hideAuthElements.js\");\n/* harmony import */ var _readImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./readImage */ \"./src/helpers/readImage.js\");\n/* harmony import */ var _setPasswordParams__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./setPasswordParams */ \"./src/helpers/setPasswordParams.js\");\n/* harmony import */ var _setSubmitParams__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./setSubmitParams */ \"./src/helpers/setSubmitParams.js\");\n/* harmony import */ var _stylizeMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./stylizeMessage */ \"./src/helpers/stylizeMessage.js\");\n/* harmony import */ var _stylizeButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stylizeButton */ \"./src/helpers/stylizeButton.js\");\n/* harmony import */ var _elems_handler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./elems-handler */ \"./src/helpers/elems-handler.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://final-project/./src/helpers/index.js?");

/***/ }),

/***/ "./src/helpers/readImage.js":
/*!**********************************!*\
  !*** ./src/helpers/readImage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"readImage\": () => (/* binding */ readImage)\n/* harmony export */ });\n/* harmony import */ var _elems_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elems-handler */ \"./src/helpers/elems-handler.js\");\n\r\n\r\nfunction readImage (file) {\r\n    if (!file.type.indexOf('image')) {\r\n\r\n        _elems_handler__WEBPACK_IMPORTED_MODULE_0__.regElems.message.innerText = ''\r\n        \r\n        const reader = new FileReader\r\n\r\n        reader.onload = function (ev) {\r\n            _elems_handler__WEBPACK_IMPORTED_MODULE_0__.regElems.picture.src = ev.target.result\r\n        }\r\n\r\n        reader.readAsDataURL(file)\r\n    } else {\r\n        _elems_handler__WEBPACK_IMPORTED_MODULE_0__.regElems.message.innerText = 'Invalid type file'\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/helpers/readImage.js?");

/***/ }),

/***/ "./src/helpers/setPasswordParams.js":
/*!******************************************!*\
  !*** ./src/helpers/setPasswordParams.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setPasswordParams\": () => (/* binding */ setPasswordParams)\n/* harmony export */ });\n/* harmony import */ var _elems_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elems-handler */ \"./src/helpers/elems-handler.js\");\n\r\n\r\nfunction setPasswordParams (mode, color, disabled) {\r\n    const elems = mode === 'auth' ? _elems_handler__WEBPACK_IMPORTED_MODULE_0__.authElems : _elems_handler__WEBPACK_IMPORTED_MODULE_0__.regElems\r\n\r\n    elems.password.disabled = disabled\r\n    elems.login.style.color = color\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/helpers/setPasswordParams.js?");

/***/ }),

/***/ "./src/helpers/setSubmitParams.js":
/*!****************************************!*\
  !*** ./src/helpers/setSubmitParams.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setSubmitParams\": () => (/* binding */ setSubmitParams)\n/* harmony export */ });\n/* harmony import */ var _elems_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elems-handler */ \"./src/helpers/elems-handler.js\");\n\r\n\r\nfunction setSubmitParams (mode, color, disabled) {\r\n    const elems = mode === 'auth' ? _elems_handler__WEBPACK_IMPORTED_MODULE_0__.authElems : _elems_handler__WEBPACK_IMPORTED_MODULE_0__.regElems\r\n\r\n    elems.submit.disabled = disabled\r\n    elems.password.style.color = color\r\n}\r\n\n\n//# sourceURL=webpack://final-project/./src/helpers/setSubmitParams.js?");

/***/ }),

/***/ "./src/helpers/stylizeButton.js":
/*!**************************************!*\
  !*** ./src/helpers/stylizeButton.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"stylizeButton\": () => (/* binding */ stylizeButton)\n/* harmony export */ });\nfunction stylizeButton (elem, test) {\r\n    const border = test ? 'solid #090 2px' : 'solid #b00 2px'\r\n    const color = test ? '#090' : '#b00'\r\n    Object.assign(elem.style, { border, color })\r\n}\n\n//# sourceURL=webpack://final-project/./src/helpers/stylizeButton.js?");

/***/ }),

/***/ "./src/helpers/stylizeMessage.js":
/*!***************************************!*\
  !*** ./src/helpers/stylizeMessage.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"stylizeMessage\": () => (/* binding */ stylizeMessage)\n/* harmony export */ });\nfunction stylizeMessage (elem, test) {\r\n    const color = test ? '#090' : '#b00'\r\n    Object.assign(elem.style, { color })\r\n}\n\n//# sourceURL=webpack://final-project/./src/helpers/stylizeMessage.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers/index.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ \"./src/components/index.js\");\n\r\n\r\n\r\n(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getAllUsers)()\r\n    .then(users => Object.keys(users)\r\n        .forEach(key => localStorage.setItem(key, users[key].password)))\r\n\r\nwindow[Symbol.for('elems')] = {}\r\n\r\n;(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.addElem)('main')\r\n\r\n;['registration-btn', 'authorization-btn']\r\n    .map(btn => document.getElementById(btn))\r\n    .forEach(item => {\r\n        item.onclick = function(event) {\r\n            event.target.id === 'registration-btn' ? (0,_components__WEBPACK_IMPORTED_MODULE_1__.registration)() : (0,_components__WEBPACK_IMPORTED_MODULE_1__.authorization)()\r\n        }\r\n    })\r\n\n\n//# sourceURL=webpack://final-project/./src/index.js?");

/***/ }),

/***/ "./src/templates/authorization.js":
/*!****************************************!*\
  !*** ./src/templates/authorization.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authorizationTemplate\": () => (/* binding */ authorizationTemplate)\n/* harmony export */ });\nconst authorizationTemplate = `\r\n    <section id=\"registration-form\">\r\n        <h5>Authorization</h5>\r\n        <p id=\"message\"></p>\r\n        <input id=\"login\" placeholder=\"Enter login\">\r\n        <input id=\"password\" placeholder=\"Enter password\" disabled>\r\n        <img id=\"picture\"/>\r\n        <button id=\"submit\" disabled>Submit</button>\r\n     </section>\r\n`\r\n\n\n//# sourceURL=webpack://final-project/./src/templates/authorization.js?");

/***/ }),

/***/ "./src/templates/index.js":
/*!********************************!*\
  !*** ./src/templates/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authorizationTemplate\": () => (/* reexport safe */ _authorization__WEBPACK_IMPORTED_MODULE_1__.authorizationTemplate),\n/* harmony export */   \"registrationTemplate\": () => (/* reexport safe */ _registration__WEBPACK_IMPORTED_MODULE_0__.registrationTemplate)\n/* harmony export */ });\n/* harmony import */ var _registration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registration */ \"./src/templates/registration.js\");\n/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization */ \"./src/templates/authorization.js\");\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://final-project/./src/templates/index.js?");

/***/ }),

/***/ "./src/templates/registration.js":
/*!***************************************!*\
  !*** ./src/templates/registration.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registrationTemplate\": () => (/* binding */ registrationTemplate)\n/* harmony export */ });\nconst registrationTemplate = `\r\n    <section id=\"registration-form\">\r\n        <h5>Registration</h5>\r\n        <p id=\"message\"></p>\r\n        <input id=\"login\" placeholder=\"Create login\">\r\n        <input type=\"password\" id=\"password\" placeholder=\"Create password\" disabled>\r\n        <input type=\"file\" id=\"avatar\">\r\n        <img id=\"picture\" src=\"https://us.123rf.com/450wm/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg\">\r\n        <button id=\"submit\" disabled>Submit</button>\r\n     </section>\r\n`\r\n\n\n//# sourceURL=webpack://final-project/./src/templates/registration.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;