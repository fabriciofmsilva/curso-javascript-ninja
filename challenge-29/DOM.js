(function(window, document) {
  'use strict';

  function DOM(selector) {
    if (!(this instanceof DOM)) {
      return new DOM(selector);
    }

    this.elements = document.querySelectorAll(selector);
  }

  DOM.prototype.on = function(eventType, callback) {
    Array.prototype.forEach.call(this.elements, function(element) {
      element.addEventListener(eventType, callback, false);
    });
  }

  DOM.prototype.off = function(eventType, callback) {
    Array.prototype.forEach.call(this.elements, function(element) {
      element.removeEventListener(eventType, callback, false);
    });
  }

  DOM.prototype.get = function(index) {
    if (!index) {
      return this.elements[0];
    }

    return this.elements[index];
  }

  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.elements, arguments);
  };

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.elements, arguments);
  };

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.elements, arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.elements, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.elements, arguments);
  };

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.elements, arguments);
  };

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.elements, arguments);
  };

  function is(obj) {
    return Object.prototype.toString.call(obj);
  }

  DOM.isArray = function isArray(obj) {
    return is(obj) === '[object Array]';
  };

  DOM.isObject = function isObject(obj) {
    return is(obj) === '[object Object]';
  };

  DOM.isFunction = function isFunction(obj) {
    return is(obj) === '[object Function]';
  };

  DOM.isNumber = function isNumber(obj) {
    return is(obj) === '[object Number]';
  };

  DOM.isString = function isString(obj) {
    return is(obj) === '[object String]';
  };

  DOM.isBoolean = function isBoolean(obj) {
    return is(obj) === '[object Boolean]';
  };

  DOM.isNull = function isNull(obj) {
    return is(obj) === '[object Null]' || is(obj) === '[object Undefined]';
  };

  window.DOM = DOM;

})(window, document);
