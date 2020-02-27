import { Tipo } from './Tipo';

export default class Ativo {
  constructor(simbolo = '', tipo = 0, quantidade = 0, custo = 0) {
    this._simbolo = simbolo;
    this._tipo = tipo;
    this._quantidade = Number(quantidade);
    this._custo = Number(custo);
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
    this._quantidade += Number(quantidade);
  }
  addCusto(custo = 0) {
    this._custo += Number(custo);
  }
}
