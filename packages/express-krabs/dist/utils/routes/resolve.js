"use strict";
exports.__esModule = true;
exports.resolveRoutes = void 0;
function resolveRoutes(tenantName, pathname) {
    return pathname === '/' ? "/" + tenantName : "/" + tenantName + pathname;
}
exports.resolveRoutes = resolveRoutes;
exports["default"] = resolveRoutes;
