/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/posts/route";
exports.ids = ["app/api/posts/route"];
exports.modules = {

/***/ "(rsc)/./app/api/posts/route.ts":
/*!********************************!*\
  !*** ./app/api/posts/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_posts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/posts */ \"(rsc)/./lib/posts.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n\n\n\nasync function GET(req) {\n    const { searchParams } = new URL(req.url);\n    const page = parseInt(searchParams.get('page') || '1');\n    const posts = await (0,_lib_posts__WEBPACK_IMPORTED_MODULE_1__.getPosts)(page);\n    const total = await (0,_lib_posts__WEBPACK_IMPORTED_MODULE_1__.getTotalPosts)();\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        posts,\n        total\n    });\n}\nasync function POST(req) {\n    const { title, slug, content, image_url } = await req.json();\n    const sql = `\n    INSERT INTO posts (title, slug, content, image_url)\n    VALUES (?, ?, ?, ?)\n  `;\n    const result = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_2__.query)(sql, [\n        title,\n        slug,\n        content,\n        image_url\n    ]);\n    if (!result || result.affectedRows !== 1) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false\n        });\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true,\n        message: 'Created',\n        id: result.insertId\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Bvc3RzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXdEO0FBQ0Y7QUFDckI7QUFHMUIsZUFBZUksSUFBSUMsR0FBZ0I7SUFDeEMsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJRixJQUFJRyxHQUFHO0lBQ3hDLE1BQU1DLE9BQU9DLFNBQVNKLGFBQWFLLEdBQUcsQ0FBQyxXQUFXO0lBRWxELE1BQU1DLFFBQVEsTUFBTVgsb0RBQVFBLENBQUNRO0lBQzdCLE1BQU1JLFFBQVEsTUFBTVgseURBQWFBO0lBRWpDLE9BQU9GLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7UUFBRUY7UUFBT0M7SUFBTTtBQUMxQztBQUdPLGVBQWVFLEtBQUtWLEdBQWdCO0lBQ3pDLE1BQU0sRUFBRVcsS0FBSyxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsU0FBUyxFQUFFLEdBQUcsTUFBTWQsSUFBSVMsSUFBSTtJQUUxRCxNQUFNTSxNQUFNLENBQUM7OztFQUdiLENBQUM7SUFDRCxNQUFNQyxTQUFjLE1BQU1sQiw4Q0FBS0EsQ0FBQ2lCLEtBQUs7UUFBQ0o7UUFBT0M7UUFBTUM7UUFBU0M7S0FBVTtJQUV0RSxJQUFJLENBQUNFLFVBQVVBLE9BQU9DLFlBQVksS0FBSyxHQUFHO1FBQ3hDLE9BQU90QixxREFBWUEsQ0FBQ2MsSUFBSSxDQUFDO1lBQUVTLFNBQVM7UUFBTTtJQUM1QztJQUVBLE9BQU92QixxREFBWUEsQ0FBQ2MsSUFBSSxDQUFDO1FBQUVTLFNBQVM7UUFBTUMsU0FBUztRQUFXQyxJQUFJSixPQUFPSyxRQUFRO0lBQUM7QUFDcEYiLCJzb3VyY2VzIjpbIkQ6XFxWUFMtRHVuZ1xcdHJ1bmctZGllbi1sYW5oLWZ1bGxcXGFwcFxcYXBpXFxwb3N0c1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlLCBOZXh0UmVxdWVzdCB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgZ2V0UG9zdHMsIGdldFRvdGFsUG9zdHMgfSBmcm9tICdAL2xpYi9wb3N0cyc7XHJcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSAnQC9saWIvZGInO1xyXG5pbXBvcnQgeyBSb3dEYXRhUGFja2V0IH0gZnJvbSAnbXlzcWwyJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcS51cmwpO1xyXG4gIGNvbnN0IHBhZ2UgPSBwYXJzZUludChzZWFyY2hQYXJhbXMuZ2V0KCdwYWdlJykgfHwgJzEnKTtcclxuXHJcbiAgY29uc3QgcG9zdHMgPSBhd2FpdCBnZXRQb3N0cyhwYWdlKTtcclxuICBjb25zdCB0b3RhbCA9IGF3YWl0IGdldFRvdGFsUG9zdHMoKTtcclxuXHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcG9zdHMsIHRvdGFsIH0pO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIGNvbnN0IHsgdGl0bGUsIHNsdWcsIGNvbnRlbnQsIGltYWdlX3VybCB9ID0gYXdhaXQgcmVxLmpzb24oKTtcclxuXHJcbiAgY29uc3Qgc3FsID0gYFxyXG4gICAgSU5TRVJUIElOVE8gcG9zdHMgKHRpdGxlLCBzbHVnLCBjb250ZW50LCBpbWFnZV91cmwpXHJcbiAgICBWQUxVRVMgKD8sID8sID8sID8pXHJcbiAgYDtcclxuICBjb25zdCByZXN1bHQ6IGFueSA9IGF3YWl0IHF1ZXJ5KHNxbCwgW3RpdGxlLCBzbHVnLCBjb250ZW50LCBpbWFnZV91cmxdKTtcclxuXHJcbiAgaWYgKCFyZXN1bHQgfHwgcmVzdWx0LmFmZmVjdGVkUm93cyAhPT0gMSkge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiAnQ3JlYXRlZCcsIGlkOiByZXN1bHQuaW5zZXJ0SWQgfSk7XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0UG9zdHMiLCJnZXRUb3RhbFBvc3RzIiwicXVlcnkiLCJHRVQiLCJyZXEiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJwYWdlIiwicGFyc2VJbnQiLCJnZXQiLCJwb3N0cyIsInRvdGFsIiwianNvbiIsIlBPU1QiLCJ0aXRsZSIsInNsdWciLCJjb250ZW50IiwiaW1hZ2VfdXJsIiwic3FsIiwicmVzdWx0IiwiYWZmZWN0ZWRSb3dzIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJpZCIsImluc2VydElkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/posts/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   query: () => (/* binding */ query)\n/* harmony export */ });\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql2/promise */ \"(rsc)/./node_modules/mysql2/promise.js\");\n\nconst db = mysql2_promise__WEBPACK_IMPORTED_MODULE_0__.createPool({\n    host: process.env.DB_HOST || \"localhost\",\n    user: process.env.DB_USER || \"root\",\n    password: process.env.DB_PASS || \"\",\n    database: process.env.DB_NAME || \"trungdienlanh\",\n    waitForConnections: true,\n    connectionLimit: 10,\n    queueLimit: 0\n});\nasync function query(sql, values) {\n    const [rows] = await db.execute(sql, values);\n    return rows;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQW1DO0FBRTVCLE1BQU1DLEtBQUtELHNEQUFnQixDQUFDO0lBQ2pDRyxNQUFNQyxRQUFRQyxHQUFHLENBQUNDLE9BQU8sSUFBSTtJQUM3QkMsTUFBTUgsUUFBUUMsR0FBRyxDQUFDRyxPQUFPLElBQUk7SUFDN0JDLFVBQVVMLFFBQVFDLEdBQUcsQ0FBQ0ssT0FBTyxJQUFJO0lBQ2pDQyxVQUFVUCxRQUFRQyxHQUFHLENBQUNPLE9BQU8sSUFBSTtJQUNqQ0Msb0JBQW9CO0lBQ3BCQyxpQkFBaUI7SUFDakJDLFlBQVk7QUFDZCxHQUFHO0FBRUksZUFBZUMsTUFBTUMsR0FBVyxFQUFFQyxNQUFjO0lBQ3JELE1BQU0sQ0FBQ0MsS0FBSyxHQUFHLE1BQU1sQixHQUFHbUIsT0FBTyxDQUFDSCxLQUFLQztJQUNyQyxPQUFPQztBQUNUIiwic291cmNlcyI6WyJEOlxcVlBTLUR1bmdcXHRydW5nLWRpZW4tbGFuaC1mdWxsXFxsaWJcXGRiLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBteXNxbCBmcm9tIFwibXlzcWwyL3Byb21pc2VcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBkYiA9IG15c3FsLmNyZWF0ZVBvb2woe1xyXG4gIGhvc3Q6IHByb2Nlc3MuZW52LkRCX0hPU1QgfHwgXCJsb2NhbGhvc3RcIixcclxuICB1c2VyOiBwcm9jZXNzLmVudi5EQl9VU0VSIHx8IFwicm9vdFwiLFxyXG4gIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5EQl9QQVNTIHx8IFwiXCIsXHJcbiAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRCX05BTUUgfHwgXCJ0cnVuZ2RpZW5sYW5oXCIsXHJcbiAgd2FpdEZvckNvbm5lY3Rpb25zOiB0cnVlLFxyXG4gIGNvbm5lY3Rpb25MaW1pdDogMTAsXHJcbiAgcXVldWVMaW1pdDogMCxcclxufSk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcXVlcnkoc3FsOiBzdHJpbmcsIHZhbHVlcz86IGFueVtdKSB7XHJcbiAgY29uc3QgW3Jvd3NdID0gYXdhaXQgZGIuZXhlY3V0ZShzcWwsIHZhbHVlcyk7XHJcbiAgcmV0dXJuIHJvd3M7XHJcbn0iXSwibmFtZXMiOlsibXlzcWwiLCJkYiIsImNyZWF0ZVBvb2wiLCJob3N0IiwicHJvY2VzcyIsImVudiIsIkRCX0hPU1QiLCJ1c2VyIiwiREJfVVNFUiIsInBhc3N3b3JkIiwiREJfUEFTUyIsImRhdGFiYXNlIiwiREJfTkFNRSIsIndhaXRGb3JDb25uZWN0aW9ucyIsImNvbm5lY3Rpb25MaW1pdCIsInF1ZXVlTGltaXQiLCJxdWVyeSIsInNxbCIsInZhbHVlcyIsInJvd3MiLCJleGVjdXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./lib/posts.ts":
/*!**********************!*\
  !*** ./lib/posts.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAllPosts: () => (/* binding */ getAllPosts),\n/* harmony export */   getPostBySlug: () => (/* binding */ getPostBySlug),\n/* harmony export */   getPosts: () => (/* binding */ getPosts),\n/* harmony export */   getTotalPosts: () => (/* binding */ getTotalPosts)\n/* harmony export */ });\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db */ \"(rsc)/./lib/db.ts\");\n\nasync function getPostBySlug(slug) {\n    try {\n        const [rows] = await _db__WEBPACK_IMPORTED_MODULE_0__.db.query(\"SELECT * FROM posts WHERE slug = ?\", [\n            slug\n        ]);\n        return rows.length > 0 ? rows[0] : null;\n    } catch (error) {\n        console.error(\"Lỗi truy vấn bài viết:\", error);\n        return null;\n    }\n}\nasync function getPosts(page, limit = 6) {\n    const offset = (page - 1) * limit;\n    const [rows] = await _db__WEBPACK_IMPORTED_MODULE_0__.db.query('SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?', [\n        limit,\n        offset\n    ]);\n    return rows;\n}\nasync function getTotalPosts() {\n    const [rows] = await _db__WEBPACK_IMPORTED_MODULE_0__.db.query('SELECT COUNT(*) as count FROM posts');\n    return rows[0].count;\n}\nasync function getAllPosts() {\n    const [rows] = await _db__WEBPACK_IMPORTED_MODULE_0__.db.query('SELECT * FROM posts ORDER BY created_at DESC');\n    return rows;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcG9zdHMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEI7QUFLbkIsZUFBZUMsY0FBY0MsSUFBWTtJQUM5QyxJQUFJO1FBQ0YsTUFBTSxDQUFDQyxLQUFLLEdBQVEsTUFBTUgsbUNBQUVBLENBQUNJLEtBQUssQ0FBQyxzQ0FBc0M7WUFDdkVGO1NBQ0Q7UUFDRCxPQUFPQyxLQUFLRSxNQUFNLEdBQUcsSUFBSUYsSUFBSSxDQUFDLEVBQUUsR0FBRztJQUNyQyxFQUFFLE9BQU9HLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLDBCQUEwQkE7UUFDeEMsT0FBTztJQUNUO0FBQ0Y7QUFHTyxlQUFlRSxTQUFTQyxJQUFZLEVBQUVDLFFBQVEsQ0FBQztJQUNwRCxNQUFNQyxTQUFTLENBQUNGLE9BQU8sS0FBS0M7SUFDNUIsTUFBTSxDQUFDUCxLQUFLLEdBQUcsTUFBTUgsbUNBQUVBLENBQUNJLEtBQUssQ0FBQyxpRUFBaUU7UUFBQ007UUFBT0M7S0FBTztJQUM5RyxPQUFPUjtBQUNUO0FBRU8sZUFBZVM7SUFDcEIsTUFBTSxDQUFDVCxLQUFLLEdBQUcsTUFBTUgsbUNBQUVBLENBQUNJLEtBQUssQ0FBQztJQUM5QixPQUFPLElBQWUsQ0FBQyxFQUFFLENBQUNTLEtBQUs7QUFDakM7QUFFTyxlQUFlQztJQUNwQixNQUFNLENBQUNYLEtBQUssR0FBRyxNQUFNSCxtQ0FBRUEsQ0FBQ0ksS0FBSyxDQUFDO0lBQzlCLE9BQU9EO0FBQ1QiLCJzb3VyY2VzIjpbIkQ6XFxWUFMtRHVuZ1xcdHJ1bmctZGllbi1sYW5oLWZ1bGxcXGxpYlxccG9zdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi9kYlwiO1xyXG5pbXBvcnQgeyBQb3N0IH0gZnJvbSBcIkAvdHlwZXNcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBvc3RCeVNsdWcoc2x1Zzogc3RyaW5nKTogUHJvbWlzZTxQb3N0IHwgbnVsbD4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBbcm93c106IGFueSA9IGF3YWl0IGRiLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBwb3N0cyBXSEVSRSBzbHVnID0gP1wiLCBbXHJcbiAgICAgIHNsdWcsXHJcbiAgICBdKTtcclxuICAgIHJldHVybiByb3dzLmxlbmd0aCA+IDAgPyByb3dzWzBdIDogbnVsbDtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkzhu5dpIHRydXkgduG6pW4gYsOgaSB2aeG6v3Q6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQb3N0cyhwYWdlOiBudW1iZXIsIGxpbWl0ID0gNikge1xyXG4gIGNvbnN0IG9mZnNldCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcclxuICBjb25zdCBbcm93c10gPSBhd2FpdCBkYi5xdWVyeSgnU0VMRUNUICogRlJPTSBwb3N0cyBPUkRFUiBCWSBjcmVhdGVkX2F0IERFU0MgTElNSVQgPyBPRkZTRVQgPycsIFtsaW1pdCwgb2Zmc2V0XSk7XHJcbiAgcmV0dXJuIHJvd3MgYXMgYW55W107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb3RhbFBvc3RzKCkge1xyXG4gIGNvbnN0IFtyb3dzXSA9IGF3YWl0IGRiLnF1ZXJ5KCdTRUxFQ1QgQ09VTlQoKikgYXMgY291bnQgRlJPTSBwb3N0cycpO1xyXG4gIHJldHVybiAocm93cyBhcyBhbnlbXSlbMF0uY291bnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxQb3N0cygpIHtcclxuICBjb25zdCBbcm93c10gPSBhd2FpdCBkYi5xdWVyeSgnU0VMRUNUICogRlJPTSBwb3N0cyBPUkRFUiBCWSBjcmVhdGVkX2F0IERFU0MnKTtcclxuICByZXR1cm4gcm93cyBhcyBhbnlbXTtcclxufVxyXG5cclxuXHJcbiJdLCJuYW1lcyI6WyJkYiIsImdldFBvc3RCeVNsdWciLCJzbHVnIiwicm93cyIsInF1ZXJ5IiwibGVuZ3RoIiwiZXJyb3IiLCJjb25zb2xlIiwiZ2V0UG9zdHMiLCJwYWdlIiwibGltaXQiLCJvZmZzZXQiLCJnZXRUb3RhbFBvc3RzIiwiY291bnQiLCJnZXRBbGxQb3N0cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/posts.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$":
/*!****************************************************!*\
  !*** ./node_modules/mysql2/lib/ sync ^cardinal.*$ ***!
  \****************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2Froute&page=%2Fapi%2Fposts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Froute.ts&appDir=D%3A%5CVPS-Dung%5Ctrung-dien-lanh-full%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CVPS-Dung%5Ctrung-dien-lanh-full&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2Froute&page=%2Fapi%2Fposts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Froute.ts&appDir=D%3A%5CVPS-Dung%5Ctrung-dien-lanh-full%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CVPS-Dung%5Ctrung-dien-lanh-full&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_VPS_Dung_trung_dien_lanh_full_app_api_posts_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/posts/route.ts */ \"(rsc)/./app/api/posts/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/posts/route\",\n        pathname: \"/api/posts\",\n        filename: \"route\",\n        bundlePath: \"app/api/posts/route\"\n    },\n    resolvedPagePath: \"D:\\\\VPS-Dung\\\\trung-dien-lanh-full\\\\app\\\\api\\\\posts\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_VPS_Dung_trung_dien_lanh_full_app_api_posts_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwb3N0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcG9zdHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwb3N0cyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDVlBTLUR1bmclNUN0cnVuZy1kaWVuLWxhbmgtZnVsbCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9RCUzQSU1Q1ZQUy1EdW5nJTVDdHJ1bmctZGllbi1sYW5oLWZ1bGwmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2E7QUFDMUY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXFZQUy1EdW5nXFxcXHRydW5nLWRpZW4tbGFuaC1mdWxsXFxcXGFwcFxcXFxhcGlcXFxccG9zdHNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Bvc3RzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcG9zdHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Bvc3RzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcVlBTLUR1bmdcXFxcdHJ1bmctZGllbi1sYW5oLWZ1bGxcXFxcYXBwXFxcXGFwaVxcXFxwb3N0c1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2Froute&page=%2Fapi%2Fposts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Froute.ts&appDir=D%3A%5CVPS-Dung%5Ctrung-dien-lanh-full%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CVPS-Dung%5Ctrung-dien-lanh-full&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/named-placeholders","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2Froute&page=%2Fapi%2Fposts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Froute.ts&appDir=D%3A%5CVPS-Dung%5Ctrung-dien-lanh-full%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CVPS-Dung%5Ctrung-dien-lanh-full&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();