"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentHrefWithoutQueryParams = void 0;
var getCurrentHrefWithoutQueryParams = function () {
    // Create a new URL object based on window.location
    var url = new URL(window.location.href);
    // Set the search (query parameters) to an empty string to remove it
    url.search = "";
    // Return the href without query parameters
    return url.href;
};
exports.getCurrentHrefWithoutQueryParams = getCurrentHrefWithoutQueryParams;
//# sourceMappingURL=utils.js.map