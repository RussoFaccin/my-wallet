// Ativo model
export default class Empresa {
  constructor(simbolo = '', nome = '') {
    this._simbolo = simbolo;
    this._nome = nome;
  }
  get nome() {
    return this._nome;
  }
  get simbolo() {
    return this._simbolo;
  }
  get simboloMercado() {
    return `${this._simbolo}.SA`;
  }
}
