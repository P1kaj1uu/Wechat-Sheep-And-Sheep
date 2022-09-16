function _typeof(o) {
    return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? module.exports = _typeof = function(o) {
        return typeof o;
    } : module.exports = _typeof = function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}

module.exports = _typeof;