"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.findTenant = void 0;
var env_1 = require("../env");
function findTenant(tenants, hostname) {
    return tenants.find(function (tenant) {
        var domains = tenant.domains.reduce(function (acc, current) {
            var _a;
            var currentEnvDomains = (_a = current === null || current === void 0 ? void 0 : current[env_1.safeEnv]) !== null && _a !== void 0 ? _a : {};
            return __spreadArray(__spreadArray([], acc), [currentEnvDomains]);
        }, []);
        if (domains.includes(hostname)) {
            return true;
        }
        else {
            var regexDomains = domains.filter(function (domain) { return domain instanceof RegExp; });
            var match = regexDomains.map(function (domain) { return domain.test(hostname); }).filter(Boolean);
            return match.length;
        }
    });
}
exports.findTenant = findTenant;
exports["default"] = findTenant;
