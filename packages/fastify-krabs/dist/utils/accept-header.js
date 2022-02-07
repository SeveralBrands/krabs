"use strict";
exports.__esModule = true;
exports.acceptLanguage = void 0;
function acceptLanguage(header, preferences) {
    if (header === void 0) { header = ''; }
    return (parse(header, preferences, {
        type: 'accept-language',
        prefixMatch: true
    })[0] || '');
}
exports.acceptLanguage = acceptLanguage;
function parse(raw, preferences, options) {
    var lowers = new Map();
    var header = raw.replace(/[ \t]/g, '');
    if (preferences) {
        var pos = 0;
        for (var _i = 0, preferences_1 = preferences; _i < preferences_1.length; _i++) {
            var preference = preferences_1[_i];
            var lower = preference.toLowerCase();
            lowers.set(lower, { orig: preference, pos: pos++ });
            if (options.prefixMatch) {
                var parts_1 = lower.split('-');
                while ((parts_1.pop(), parts_1.length > 0)) {
                    var joined = parts_1.join('-');
                    if (!lowers.has(joined)) {
                        lowers.set(joined, { orig: preference, pos: pos++ });
                    }
                }
            }
        }
    }
    var parts = header.split(',');
    var selections = [];
    var map = new Set();
    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        if (!part) {
            continue;
        }
        var params = part.split(';');
        if (params.length > 2) {
            throw new Error("Invalid " + options.type + " header");
        }
        var token = params[0].toLowerCase();
        if (!token) {
            throw new Error("Invalid " + options.type + " header");
        }
        var selection = { token: token, pos: i, q: 1 };
        if (preferences && lowers.has(token)) {
            selection.pref = lowers.get(token).pos;
        }
        map.add(selection.token);
        if (params.length === 2) {
            var q = params[1];
            var _a = q.split('='), key = _a[0], value = _a[1];
            if (!value || (key !== 'q' && key !== 'Q')) {
                throw new Error("Invalid " + options.type + " header");
            }
            var score = parseFloat(value);
            if (score === 0) {
                continue;
            }
            if (Number.isFinite(score) && score <= 1 && score >= 0.001) {
                selection.q = score;
            }
        }
        selections.push(selection);
    }
    selections.sort(function (a, b) {
        if (b.q !== a.q) {
            return b.q - a.q;
        }
        if (b.pref !== a.pref) {
            if (a.pref === undefined) {
                return 1;
            }
            if (b.pref === undefined) {
                return -1;
            }
            return a.pref - b.pref;
        }
        return a.pos - b.pos;
    });
    var values = selections.map(function (selection) { return selection.token; });
    if (!preferences || !preferences.length) {
        return values;
    }
    var preferred = [];
    for (var _b = 0, values_1 = values; _b < values_1.length; _b++) {
        var selection = values_1[_b];
        if (selection === '*') {
            for (var _c = 0, _d = Array.from(lowers); _c < _d.length; _c++) {
                var _e = _d[_c], preference = _e[0], value = _e[1];
                if (!map.has(preference)) {
                    preferred.push(value.orig);
                }
            }
        }
        else {
            var lower = selection.toLowerCase();
            if (lowers.has(lower)) {
                preferred.push(lowers.get(lower).orig);
            }
        }
    }
    return preferred;
}
