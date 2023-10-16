'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var reactEditor = require('@toast-ui/react-editor');
require('@toast-ui/editor/dist/toastui-editor.css');
var Dexie = require('dexie');
var indexedDB = require('fake-indexeddb');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// Set Dexie to use the fake indexedDB
Dexie.dependencies.indexedDB = indexedDB;
// Setting up the IndexedDB using Dexie
var db = new Dexie('WeblogDB');
db.version(1).stores({
    posts: '++id, markdown'
});
var App = function () {
    var _a = react.useState(null), editorRef = _a[0], setEditorRef = _a[1];
    var _b = react.useState([]), posts = _b[0], setPosts = _b[1];
    // Load all posts from IndexedDB on component mount
    react.useEffect(function () {
        var fetchPosts = function () { return __awaiter(void 0, void 0, void 0, function () {
            var allPosts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.table('posts').toArray()];
                    case 1:
                        allPosts = _a.sent();
                        setPosts(allPosts.map(function (post) { return post.markdown; }));
                        return [2 /*return*/];
                }
            });
        }); };
        fetchPosts();
    }, []);
    var savePost = function () { return __awaiter(void 0, void 0, void 0, function () {
        var markdown;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editorRef)
                        return [2 /*return*/];
                    markdown = editorRef.getInstance().getMarkdown();
                    return [4 /*yield*/, db.table('posts').add({ markdown: markdown })];
                case 1:
                    _a.sent();
                    // Update posts list
                    setPosts(__spreadArray(__spreadArray([], posts, true), [markdown], false));
                    return [2 /*return*/];
            }
        });
    }); };
    return (jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx(reactEditor.Editor, { previewStyle: "vertical", initialEditType: "markdown", height: "400px", onChange: function () { }, ref: function (instance) { return setEditorRef(instance); } }), jsxRuntime.jsx("button", { onClick: savePost, children: "Save" }), jsxRuntime.jsx("hr", {}), jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("h3", { children: "Saved Posts:" }), posts.map(function (post, idx) { return (jsxRuntime.jsxs("div", { children: [jsxRuntime.jsxs("h4", { children: ["Post #", idx + 1] }), jsxRuntime.jsx("div", { children: post })] }, idx)); })] })] }));
};

module.exports = App;
