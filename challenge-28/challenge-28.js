(function() {
  'use strict';
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
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

  var $formCEP = new DOM('[data-js="form-cep"]');
  var $inputCep = new DOM('[data-js="input-cep"]');
  var $logradouro = new DOM('[data-js="logradouro"]');
  var $bairro = new DOM('[data-js="bairro"]');
  var $cidade = new DOM('[data-js="cidade"]');
  var $estado = new DOM('[data-js="estado"]');
  var $cep = new DOM('[data-js="cep"]');
  var $status = new DOM('[data-js="status"]');
  var ajax = new XMLHttpRequest();
  $formCEP.on('submit', handleSubmitFormCEP)

  function handleSubmitFormCEP(event) {
    event.preventDefault();
    var apiUrl = getUrl();
    ajax.open('GET', apiUrl, true);
    ajax.send();
    ajax.addEventListener('readystatechange', handleReadyStateChange);
    getMessage('loading');
  }

  function getUrl() {
    return replaceCEP('https://viacep.com.br/ws/[CEP]/json/');
  }

  function clearCEP() {
    return $inputCep.get()[0].value.replace(/\D/g, '');
  }

  function handleReadyStateChange() {
    if (isRequestOk()) {
      getMessage('ok');
      fillCEPFields();
    }
  }

  function isRequestOk() {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  function fillCEPFields() {
    var data = parseData();
    if (!data) {
      getMessage('error');
      data = clearData();
    }

    $logradouro.get()[0].textContent = data.logradouro;
    $bairro.get()[0].textContent = data.bairro;
    $cidade.get()[0].textContent = data.localidade;
    $estado.get()[0].textContent = data.uf;
    $cep.get()[0].textContent = data.cep;
  }

  function clearData() {
    return {
      logradouro: '-',
      bairro: '-',
      localidade: '-',
      uf: '-',
      cep: '-'
    };
  }

  function parseData() {
    var result = null;
    try {
      result = JSON.parse(ajax.responseText)
    }
    catch (e) {
      result = null;
    }
    return result;
  }

  function getMessage(type) {
    var messages = {
      loading: replaceCEP('Buscando informações para o CEP [CEP]...'),
      ok: replaceCEP('Endereço referente ao CEP [CEP]:'),
      error: replaceCEP('Não encontramos o endereço para o CEP [CEP].')
    };
    $status.get()[0].textContent = messages[type];
  }

  function replaceCEP(message) {
    return message.replace('[CEP]', clearCEP());
  }
})();
