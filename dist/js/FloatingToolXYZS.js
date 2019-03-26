"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        if (descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
        "value" in descriptor) descriptor.writable = !0;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var FloatingToolXYZS = function() {
    function FloatingToolXYZS(x, y) {
        _classCallCheck(this, FloatingToolXYZS), this.x = x, this.y = y;
    }
    return _createClass(FloatingToolXYZS, [ {
        key: "toString",
        value: function() {
            return "(" + this.x + ", " + this.y + ")";
        }
    } ]), FloatingToolXYZS;
}();