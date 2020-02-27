import { Tipo } from './Tipo';

export default class Ordem {
  constructor(simbolo = '', tipo = 1, data, quantidade, precoUnitario) {
    this._simbolo = simbolo;
    this._tipo = tipo
    this._data = data;
    this._quantidade = Number(quantidade);
    this._precoUnitario = Number(precoUnitario);
  }
  // Getters
  get simbolo() {
    return this._simbolo;
  }
  get tipo() {
    return this._tipo;
  }
  get tipoName() {
    return Tipo.name[this._tipo];
  }
  get data() {
    return this._data;
  }
  get quantidade() {
    return this._quantidade;
  }
  get precoUnitario() {
    return this._precoUnitario;
  }
  // Setters
  set simbolo(value) {
    this._simbolo = String(value).toUpperCase();
  }
  set tipo(value) {
    this._tipo = value;
  }
  set data(value) {
    this._data = value;
  }
  set quantidade(value) {
    this._quantidade = Number(value);
  }
  set precoUnitario(value) {
    this._precoUnitario = Number(value);
  }
}
