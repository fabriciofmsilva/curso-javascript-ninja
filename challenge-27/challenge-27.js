(function() {
  'use strict';
  /*
  Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
  métodos semelhantes aos que existem no array, mas que sirvam para os
  elementos do DOM selecionados.
  Crie os seguintes métodos:
  - forEach, map, filter, reduce, reduceRight, every e some.

  Crie também métodos que verificam o tipo do objeto passado por parâmetro.
  Esses métodos não precisam depender de criar um novo elmento do DOM, podem
  ser métodos estáticos.

  Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
  no objeto, como nos exemplos abaixo:
  DOM.isArray([1, 2, 3]); // true
  DOM.isFunction(function() {}); // true
  DOM.isNumber('numero'); // false

  Crie os seguintes métodos para verificação de tipo:
  - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
  O método isNull deve retornar `true` se o valor for null ou undefined.
  */
  function DOM(selector) {
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

  DOM.prototype.get = function() {
    return this.elements;
  }

  DOM.prototype.forEach = function(callback) {
    Array.prototype.forEach.call(this.elements, callback);
  };

  DOM.prototype.map = function() {
    Array.prototype.map.call(this.elements, callback);
  };

  DOM.prototype.filter = function() {
    Array.prototype.filter.call(this.elements, callback);
  };

  DOM.prototype.reduce = function() {
    Array.prototype.reduce.call(this.elements, callback);
  };

  DOM.prototype.reduceRight = function() {
    Array.prototype.reduceRight.call(this.elements, callback);
  };

  DOM.prototype.every = function() {
    Array.prototype.every.call(this.elements, callback);
  };

  DOM.prototype.some = function() {
    Array.prototype.some.call(this.elements, callback);
  };

  function is(obj) {
    return Object.prototype.toString.call(obj);
  }

  DOM.isArray = function() {
    return is(obj) === '[object Array]';
  };

  DOM.isObject = function() {
    return is(obj) === '[object Object]';
  };

  DOM.isFunction = function() {
    return is(obj) === '[object Function]';
  };

  DOM.isNumber = function() {
    return is(obj) === '[object Number]';
  };

  DOM.isString = function() {
    return is(obj) === '[object String]';
  };

  DOM.isBoolean = function() {
    return is(obj) === '[object Boolean]';
  };

  DOM.isNull = function() {
    return is(obj) === '[object Null]' || is(obj) === '[object Undefined]';
  };

})();
