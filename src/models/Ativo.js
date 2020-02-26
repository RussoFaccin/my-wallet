import { Tipo } from './Tipo';

export default class Ativo {
  constructor(simbolo = '', tipo = 0, quantidade = 0, custo = 0) {
    this._simbolo = simbolo;
    this._tipo = tipo;
    this._quantidade = quantidade;
    this._custo = custo;
  }

  get simbolo() {
    return this._simbolo;
  }
  get tipo() {
    return Tipo.name[this._tipo];
  }
  get quantidade() {
    return this._quantidade;
  }
  get precoMedio() {
    return (this._custo / this._quantidade).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  }
  get custo() {
    return this._custo;
  }
  addQuantidade(quantidade = 0) {
    this._quantidade += quantidade;
  }
  addCusto(custo = 0) {
    this._custo += custo;
  }
}
