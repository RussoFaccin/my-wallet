class Ordem {
  constructor(ativo, data, quantidade, precoUnitario) {
    this._ativo = ativo;
    this._data = data;
    this._quantidade = quantidade;
    this._precoUnitario = precoUnitario;
  }
  get ativo() {
    return this._ativo;
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
}
