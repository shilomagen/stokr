(function (Stokr) {
  'use strict';

  class Model {
    constructor() {
      this._appState = {
        uiState: {
          appName: 'stokr',
          displayVal: DISPLAY_VALUES.PERCENTAGE,
          showFilterBar: false,
          view: VIEWS.GENERAL,
          filters:{},
          search:{}
        },
        stocks: [],
        myStocks: [
          "WIX",
          "MSFT",
          "AAPL",
          "GOOG"
        ],

      };
    }

    getState() {
      return this._appState;
    }

  }

  Stokr.Model = Model;

}(window.Stokr = window.Stokr || {}));


