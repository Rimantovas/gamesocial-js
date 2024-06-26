export var getCurrentHrefWithoutQueryParams = function () {
    // Create a new URL object based on window.location
    var url = new URL(window.location.href);
    // Set the search (query parameters) to an empty string to remove it
    url.search = "";
    // Return the href without query parameters
    return url.href;
};
//# sourceMappingURL=utils.js.map