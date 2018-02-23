(function(window) {
  'use strict';

  var ajax = new XMLHttpRequest();
  var company = {
    name: '',
    phone: ''
  };

  function Company() {

  }

  Company.get = function get(callback) {
    getCompanyData(callback);
  }

  function getCompanyData(callback) {
    ajax.open('get', 'company.json');
    ajax.send();
    ajax.addEventListener('readystatechange', function(data) {
      if (isRequestOk()) {
        callback(parseData(data));
      }
    });
  }

  function isRequestOk() {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  function parseData() {
    var result = null;
    try {
      result = JSON.parse(ajax.responseText)
    }
    catch (e) {
      result = company;
    }
    return result;
  }

  window.Company = Company;
})(window);
