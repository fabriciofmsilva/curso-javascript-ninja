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

  var $form = document.querySelector('[data-js="form"]');
  var $cepInput = document.querySelector('[data-js="cep-input"]');
  var $alert = document.querySelector('[data-js="alert"]');
  var $address = document.querySelector('[data-js="address"]');
  var $logradouro = document.querySelector('[data-js="logradouro"]');
  var $bairro = document.querySelector('[data-js="bairro"]');
  var $cidade = document.querySelector('[data-js="cidade"]');
  var $estado = document.querySelector('[data-js="estado"]');

  $form.addEventListener('submit', onSubmit, false);

  function onSubmit(event) {
    event.preventDefault();

    var cep = $cepInput.value.replace(/\D/g, '');

    toggleAddress(true);
    getCEP(cep);
  }

  function getCEP(cep) {
    var apiUrl = 'https://viacep.com.br/ws/' + cep + '/json/';
    var ajax = new XMLHttpRequest();

    ajax.addEventListener('readystatechange', function() {
      loading(cep);

      if (this.readyState === 4 && this.status === 200) {
         var data = JSON.parse(ajax.responseText);
         if (data.erro) {
          return error(cep);
         }

         return success(cep, data);
      }

      return error(cep);
    });
    ajax.open('GET', apiUrl, true);
    ajax.send();
  }

  function loading(cep) {
    $alert.innerHTML = 'Buscando informações para o CEP ' + cep + '...';
  }

  function error(cep) {
    $alert.innerHTML = 'Não encontramos o endereço para o CEP ' + cep + '.';
  }

  function success(cep, address) {
    $alert.innerHTML = 'Endereço referente ao CEP ' + cep + ':';
    toggleAddress();
    $logradouro.innerHTML = address.logradouro;
    $bairro.innerHTML = address.bairro;
    $cidade.innerHTML = address.localidade;
    $estado.innerHTML = address.uf;
  }

  function toggleAddress(hidden) {
    if (hidden) {
      $address.classList.remove('active');
      return;
    }

    $address.classList.toggle('active');
  }
})();
