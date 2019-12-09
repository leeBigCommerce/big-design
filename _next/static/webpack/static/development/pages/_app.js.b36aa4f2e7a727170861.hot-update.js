webpackHotUpdate("static/development/pages/_app.js",{

/***/ "../big-design-theme/dist/es/index.js":
/*!********************************************!*\
  !*** ../big-design-theme/dist/es/index.js ***!
  \********************************************/
/*! exports provided: createTheme, theme, addValues, createRGBA, remCalc, createHelpers, createBorder, createBorderRadius, breakpointValues, breakpoints, breakpointsOrder, colors, loading, rotate, createLineHeight, shadow, createSpacing, createTypography, zIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTheme", function() { return createTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "theme", function() { return theme; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "../big-design-theme/dist/es/helpers/index.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options */ "../big-design-theme/dist/es/options/index.js");
/* harmony import */ var _system_border__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./system/border */ "../big-design-theme/dist/es/system/border.js");
/* harmony import */ var _system_breakpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./system/breakpoints */ "../big-design-theme/dist/es/system/breakpoints.js");
/* harmony import */ var _system_colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./system/colors */ "../big-design-theme/dist/es/system/colors.js");
/* harmony import */ var _system_keyframes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./system/keyframes */ "../big-design-theme/dist/es/system/keyframes.js");
/* harmony import */ var _system_line_height__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./system/line-height */ "../big-design-theme/dist/es/system/line-height.js");
/* harmony import */ var _system_shadow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./system/shadow */ "../big-design-theme/dist/es/system/shadow.js");
/* harmony import */ var _system_spacing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./system/spacing */ "../big-design-theme/dist/es/system/spacing.js");
/* harmony import */ var _system_typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./system/typography */ "../big-design-theme/dist/es/system/typography.js");
/* harmony import */ var _system_z_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./system/z-index */ "../big-design-theme/dist/es/system/z-index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addValues", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["addValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRGBA", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["createRGBA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "remCalc", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["remCalc"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createHelpers", function() { return _helpers__WEBPACK_IMPORTED_MODULE_0__["createHelpers"]; });

/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./system */ "../big-design-theme/dist/es/system/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createBorder", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["createBorder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createBorderRadius", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["createBorderRadius"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "breakpointValues", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["breakpointValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "breakpoints", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["breakpoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "breakpointsOrder", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["breakpointsOrder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["colors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loading", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["loading"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["rotate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createLineHeight", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["createLineHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shadow", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["shadow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSpacing", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["createSpacing"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypography", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["createTypography"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zIndex", function() { return _system__WEBPACK_IMPORTED_MODULE_11__["zIndex"]; });














var createTheme = function createTheme() {
  var customOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _options__WEBPACK_IMPORTED_MODULE_1__["themeOptions"].setOptions(customOptions);
  return {
    border: Object(_system_border__WEBPACK_IMPORTED_MODULE_2__["createBorder"])(),
    borderRadius: Object(_system_border__WEBPACK_IMPORTED_MODULE_2__["createBorderRadius"])(),
    breakpointValues: _system_breakpoints__WEBPACK_IMPORTED_MODULE_3__["breakpointValues"],
    breakpoints: _system_breakpoints__WEBPACK_IMPORTED_MODULE_3__["breakpoints"],
    colors: _system_colors__WEBPACK_IMPORTED_MODULE_4__["colors"],
    helpers: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["createHelpers"])(),
    keyframes: _system_keyframes__WEBPACK_IMPORTED_MODULE_5__,
    lineHeight: Object(_system_line_height__WEBPACK_IMPORTED_MODULE_6__["createLineHeight"])(),
    shadow: _system_shadow__WEBPACK_IMPORTED_MODULE_7__["shadow"],
    spacing: Object(_system_spacing__WEBPACK_IMPORTED_MODULE_8__["createSpacing"])(),
    typography: Object(_system_typography__WEBPACK_IMPORTED_MODULE_9__["createTypography"])(),
    zIndex: _system_z_index__WEBPACK_IMPORTED_MODULE_10__["zIndex"]
  };
};
var theme = createTheme();

/***/ })

})
//# sourceMappingURL=_app.js.b36aa4f2e7a727170861.hot-update.js.map