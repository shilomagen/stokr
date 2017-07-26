(function (Stokr) {
  'use strict';

  class Cntl {
    constructor() {
      this.model = new Stokr.Model();
      this.view = new Stokr.View();
      this._init();
    }

    _getStock() {
      const myStocks = this.model.getState().myStocks;
      return new Promise((resolve, reject) => {
        fetch(`${ENDPOINTS.QUOTES}${myStocks.toString()}`)
          .then((res) => res.json())
          .then(data => {
            resolve(data.query.results.quote);
          })
          .catch(err => {
            reject(err);
          })
      })

    }

    setFilterData(data) {
      this._setAppFilters(data);
      this.view.render(this._generateDataForRender());
    }

    _setAppFilters(data) {
      const currentState = this.model.getState();
      currentState.filters = data;
    }

    _setStocksInModel(data) {
      const appState = this.model.getState();
      appState.stocks = data;
    }

    _init() {
      this._getStock()
        .then((data) => {
          this._setStocksInModel(data);
          this.view.render(this._generateDataForRender());
        })
        .catch(err => {
          console.error(err);
        })

    }

    _filterData() {
      const appState = this.model.getState(),
        filters = appState.filters,
        stocks = appState.stocks;
      if (filters) {
        const filteredStocks = stocks.filter(stock => {
          const stockPrice = parseFloat(stock.Open);
          if (stock.Name.indexOf(filters.stockName) !== -1 || stock.Symbol.indexOf(filters.stockName) === -1)
            return false;
          if (filters.gain === 'gaining') {
            if (stock.Change[0] === '-') {
              return false;
            }
          }
          if (filters.gain === 'losing') {
            if (stock.Change[0] !== '-') {
              return false;
            }
          }
          if (filters.rangeFrom) {
            const rangeFrom = parseFloat(filters.rangeFrom);
            if (rangeFrom > stockPrice)
              return false;
          }
          if (filters.rangeTo) {
            const rangeTo = parseFloat(filters.rangeTo);
            if (stockPrice > rangeTo)
              return false;
          }
          return true;
        });
        return filteredStocks;
      } else {
        return stocks;
      }
    }

    _generateDataForRender() {
      const stocks = this._filterData();
      this.view.render({stocks, uiState: this.model.getState().uiState});
    }

    changePresentValue() {
      const currentState = this.model.getState();
      const currentPresentState = currentState.displayVal;
      const currentIndex = DISPLAY_ARRAY.indexOf(currentPresentState);
      currentState.displayVal = DISPLAY_ARRAY[(currentIndex + 1) % DISPLAY_ARRAY.length];
      this.view.render(this._generateDataForRender());
    }

    reorderStockList(stockSymbol, direction) {
      const currentState = this.model.getState();
      const stockIndex = currentState.stocks.findIndex((item) => item.Symbol === stockSymbol);
      this._swapElements(currentState.stocks, stockIndex, direction === 'up' ? stockIndex - 1 : stockIndex + 1);
      this.view.render(this._generateDataForRender());
    }

    showFilterBar() {
      const currentState = this.model.getState();
      currentState.showFilterBar = !currentState.showFilterBar;
      this.view.render(this._generateDataForRender());
    }

    _swapElements(arr, firstIndex, secondIndex) {
      let tmp = arr[firstIndex];
      arr[firstIndex] = arr[secondIndex];
      arr[secondIndex] = tmp;
    }

    changeView(hash) {
      const capHash = hash.toUpperCase();
      const currentState = this.model.getState();
      VIEWS[capHash] ? currentState.view = VIEWS[capHash] : currentState.view = VIEWS.GENERAL;
      this.view.render(this._generateDataForRender());
    }

    refreshStockList() {
      this._getStock()
        .then(data => {
          this._setStocksInModel(data);
          this.view.render(this._generateDataForRender());
        })
        .catch(err => {
          console.error(err);
        });
    }

  }

  window.Stokr.Cntl = new Cntl();

}(window.Stokr = window.Stokr || {}));


