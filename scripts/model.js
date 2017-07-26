(function (Stokr) {
  'use strict';

  class Model {
    constructor() {
      this._appState = {
        uiState: {
          displayVal: DISPLAY_VALUES.PERCENTAGE,
          showFilterBar: true,
          view: VIEWS.GENERAL,
          filters:{}
        },
        appName: 'stokr',
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


