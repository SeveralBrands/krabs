"use strict";
exports.__esModule = true;
exports.getAcceptPreferredLocale = void 0;
function getAcceptPreferredLocale(i18n, headers) {
    var acceptLanguageHeader = headers === null || headers === void 0 ? void 0 : headers['accept-language'];
    if (!!i18n.localeDetection && acceptLanguageHeader && !Array.isArray(acceptLanguageHeader)) {
        var acceptLanguageHeaderLang = acceptLanguageHeader.split('-')[0];
        return acceptLanguageHeaderLang;
    }
}
exports.getAcceptPreferredLocale = getAcceptPreferredLocale;
