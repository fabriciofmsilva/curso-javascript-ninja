(function() {
  'use strict';

  function Car(car) {
    this.imagem = car.imagem;
    this.marca = car.marca;
    this.modelo = car.modelo;
    this.ano = car.ano;
    this.placa = car.placa;
    this.cor = car.cor;
  }

  function Cars() {
    this.cars = [];
  }

  Cars.prototype.add = function add(car) {
    this.cars.push(new Car(car));
  };

})();
