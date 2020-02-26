<template>
  <div class="appRoot">
    <IconLibrary/>
    <div class="ativosGroup">
      <h4>Ativos</h4>
      <table class="ordemList">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Tipo</th>
            <th>Qtd</th>
            <th>PM</th>
            <th>Custo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ativo, index) of carteira" :key="index">
            <td>{{ativo.simbolo}}</td>
            <td>{{ativo.tipo}}</td>
            <td>{{ativo.quantidade}}</td>
            <td>{{ativo.precoMedio}}</td>
            <td>{{ativo.custo}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4>Nova Ordem</h4>
    <div class="searchGroup">
      <div class="inputBox">
        <label class="inputBox__label" for="search">Empresa:</label>
        <div class="inputWraper">
          <input class="inputBox__field" type="text" name="search" v-model="search.term">
          <IconButton :action="buscaEmpresa" icon-id="iconSearch"/>
        </div>
        <ul class="searchSuggestion" v-if="search.isSuggestionOpen">
          <li class="searchItem" v-for="(empresa, index) of search.matches" :key="index" v-on:click="selecionaEmpresa(empresa)">{{empresa.simbolo}}</li>
        </ul>
      </div>
    </div>
    <div class="ordemGroup">
      <div class="inputBox">
        <label for="tipo">Tipo:</label>
        <select name="tipo" v-model="novaOrdem.tipo">
          <option v-for="(tipo, index) of ativoTipo" :value="tipo[0]" :key="index">{{tipo[1]}}</option>
        </select>
      </div>
      <div class="inputBox">
        <label class="inputBox__label" for="data">Data da Compra:</label>
        <input type="date" class="inputBox__field" name="data" v-model="novaOrdem.dataCompra">
      </div>
      <div class="inputBox">
        <label class="inputBox__label" for="pu">Preço unitário:</label>
        <input class="inputBox__field" type="text" name="pu" v-model="novaOrdem.precoUnitario">
      </div>
      <div class="inputBox">
        <label class="inputBox__label" for="qtd">Quantidade:</label>
        <input class="inputBox__field" type="number" name="qtd" v-model="novaOrdem.quantidade" min="0">
      </div>
      <button class="ordemGroup__btnSave" v-on:click="salvarOrdem">Salvar</button>
    </div>
    <div class="resultGroup">{{novaOrdem}}</div>
  </div>
</template>

<script>
// Styles
import './assets/core.css'
// Components
import IconButton from './components/IconButton'
import IconLibrary from './components/IconLibrary'
// Models
import Empresa from './models/Empresa.js';
import Ativo from './models/Ativo.js'
import { Tipo } from './models/Tipo.js'

export default {
  name: 'App',
  components: {
    // HelloWorld
    IconLibrary,
    IconButton
  },
  data() {
    return {
      apiKey: 'E2XIAIDSCC1KIQS3',
      carteira: [
        new Ativo('ITSA4', Tipo.ACAO, 100, 1328),
        new Ativo('VINO11', Tipo.FII, 40, 2680)
      ],
      search: {
        term: '',
        matches: [],
        isSuggestionOpen: false
      },
      novaOrdem: {
        simbolo: null,
        tipo: 1,
        dataCompra: this.formatedDate,
        precoUnitario: 0,
        quantidade: 0

      }
    }
  },
  computed: {
    formatedDate() {
      const today = new Date();
      const date = {
        year: today.getFullYear(),
        month: String(today.getMonth() + 1).padStart(2, 0),
        day: String(today.getDate()).padStart(2, 0)
      }
      return `${date.year}-${date.month}-${date.day}`;
    },
    ativoTipo() {
      const type = new Map(Object.entries(Tipo.name));
      return type;
    }
  },
  methods: {
    buscaEmpresa() {
      // Open suggestion dialog
      this.search.isSuggestionOpen = true;
      fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
          this.search.term
        }&apikey=${this.apiKey}`
      ).then(response => {
        response.json().then(result => {
          this.search.matches = this.filterMatches(result.bestMatches);
        })
      })
    },
    selecionaEmpresa(empresa) {
      this.novaOrdem.simbolo = empresa.simbolo;
      this.search.isSuggestionOpen = false;
    },
    filterMatches(matches = []) {
      const filteredMatches = [];

      matches.forEach(match => {
        if (match['8. currency'] === 'BRL') {
          const empresa = new Empresa(
            this.sanityzeSymbol(match['1. symbol']),
            match['2. name']
          );

          filteredMatches.push(empresa)
        }
      })
      return filteredMatches
    },
    sanityzeSymbol(symbol = '') {
      const symbolParts = symbol.split('.')
      return symbolParts[0]
    },
    salvarOrdem() {
      // Procurar ordem em carteira
      const result = this.carteira.find((ativo) => {
        return ativo.simbolo === this.novaOrdem.simbolo;
      });

      if (result === undefined) {
        const novoAtivo = new Ativo(
          this.novaOrdem.simbolo,
          this.novaOrdem.tipo,
          this.novaOrdem.quantidade,
          this.novaOrdem.precoUnitario * this.novaOrdem.quantidade
        );

        this.carteira.push(novoAtivo);
      } else {
        result.addQuantidade(100);
        result.addCusto(100 * 12);
      }
    }
  }
}
</script>

<style>
.appRoot {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchGroup {
  display: flex;
  flex-direction: column;
}

.inputWraper {
  display: flex;
}

.inputBox__label {
  display: block;
}

.inputBox__field {
  border: 1px solid;
  height: 30px;
}

.searchSuggestion {
  position: absolute;
  list-style-type: none;
  width: 100%;
  margin: 0;
  top: 100%;
  padding: 0;
  background-color: #FFF;
  z-index: 1;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5), 0px 2px 20px 0px rgba(0, 0, 0, 0.5);
}

.searchItem {
  padding: 0 20px;
  cursor: pointer;
}

.searchItem:hover {
  background-color: rgba(0, 0, 0, 0.25);
}
</style>
