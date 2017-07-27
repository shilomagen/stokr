(function (Stokr) {
  'use strict';

  class View {
    constructor() {
      this.eventMap = {
        BUTTON: {
          [ACTIONS.DISPLAY_VAL]: this._changePresentValue,
          [ACTIONS.REORDER]: this._reorderStockList,
          [ACTIONS.SHOW_FILTER_BAR]: this._showFilterBar,
          [ACTIONS.REFRESH]: this._refreshStockList,
          [ACTIONS.APPLY_FILTER]: this._applyFilters,
          [ACTIONS.CANCEL_SEARCH]: this._cancelSearch,
        }
      };
      this.searchStatusMap = {
        [SEARCH.SEARCH_STATUS.INIT]: this._getInitSearchResults,
        [SEARCH.SEARCH_STATUS.NO_RESULTS]: this._getSearchNoResults,
        [SEARCH.SEARCH_STATUS.FOUND]: this._generateSearchResults

      };
      window.addEventListener('hashchange', this._hashChangeHandler.bind(this));
    }

    _hashChangeHandler(hash) {
      Stokr.Cntl.changeView(this._getHash());
    }

    _refreshStockList() {
      Stokr.Cntl.refreshStockList();
    }

    _applyFilters(e) {

      e.preventDefault();
      const currentTarget = e.target,
        form = currentTarget.closest('form');
      const formElements = form.querySelectorAll('[data-formdata="true"]');
      const dataObject = {};
      formElements.forEach((domElem) => {
        dataObject[domElem.name] = domElem.value;
      });
      Stokr.Cntl.setFilterData(dataObject);
    }

    _createGeneralAppHeader() {
      return `<header class="app-header">
            <h1>${this.uiState.appName}</h1>
            <ul class="icons-menu">
            <li><a href="#search" class="icon-search"></a></li>
            <li><button data-action='${ACTIONS.REFRESH}' class="icon-refresh"></button></li>
            <li><button data-action='${ACTIONS.SHOW_FILTER_BAR}' class="icon-filter ${this.uiState.showFilterBar ? 'active' : ''}"></button></li>
            <li><button class="icon-settings"></button></li></ul>
          </header>`;
    }

    _createStockUL(appState) {
      return `<ul class="stock-list">${this.stocks.map(this._createStockItem.bind(this)).join('')}</ul>`;
    }

    _createStockItem(stockItem, index, dataArr) {
      return `<li class=${CLASSES.STOCK_ITEM} data-symbol="${stockItem.Symbol}" >
              <div class="stock-name">
                <span class="symbol">${stockItem.Symbol}</span>
                <span class="full-name">${stockItem.Name}</span>
              </div>
              <div class="stock-params">
                <span class="price">${parseInt(stockItem.realtime_price).toFixed(2)} </span>
                <button data-action=${ACTIONS.DISPLAY_VAL} class="${CLASSES.PRESENT_VALUE} ${this._isPositive(stockItem.realtime_change) ? 'positive' : 'negative'}">
${this._isPositive(stockItem.realtime_change) ? '+' : ''}${this._convertPresentValues(stockItem[this.uiState.displayVal])}</button>
                <div class="arrange-btns-bar" ${this.uiState.showFilterBar ? 'style="display: none"' : ''}>
                  <button data-action='${ACTIONS.REORDER}' data-direction="${ACTIONS.REORDER_DIRECTION.UP}" class="${CLASSES.ICON_ARROW_UP} ${CLASSES.ICON_ARROW}" ${index === 0 ? 'disabled' : ''}></button>
                  <button data-action='${ACTIONS.REORDER}' data-direction="${ACTIONS.REORDER_DIRECTION.DOWN}" class="${CLASSES.ICON_ARROW_DOWN} ${CLASSES.ICON_ARROW }" ${index === dataArr.length - 1 ? 'disabled' : ''}></button>
                </div>
              </div>
            </li>`
    }

    _showFilterBar() {
      Stokr.Cntl.toggleFilterBar();
    }

    _cancelSearch(){
      window.location.hash = '#';
    }
    _generateFilterForm() {
      return `<form class="filter-form">
          <div class="filter-input">
          <div class="input-container">
                     <label for="stockName">By Name</label>
          <input type="text" data-formdata="true" id="stock-name" name="stockName" value="${this.uiState.filters.stockName || ''}">
          </div>
            <div class="input-container"><label for="rangeFrom">By Range: From</label>
           <input type="text" data-formdata="true" name="rangeFrom" id="rangeFrom" value="${this.uiState.filters.rangeFrom || ''}"></div>
           <div class="input-container">          <label for="gain">By Gain</label>
          <select type="text" data-formdata="true" id="gain" name="gain">
          <option value="all" ${this.uiState.filters.gain === 'all' ? 'selected' : ''}>All</option>
          <option value="gaining" ${this.uiState.filters.gain === 'gaining' ? 'selected' : ''}>Gaining</option>
          <option value="losing" ${this.uiState.filters.gain === 'losing' ? 'selected' : ''}>Losing</option>
          </select></div>
           <div class="input-container"><label for="rangeTo">By Range: To</label>
          <input type="text" data-formdata="true" name="rangeTo" id="rangeTo" value="${this.uiState.filters.rangeTo || ''}"></div>
          </div>       
          <div class="apply-btn">
          <button data-action='${ACTIONS.APPLY_FILTER}'>Apply</button>
          </div>
          </form>`
    }

    _createSearchView() {
      return `<div class="app-container">
                <div class="input-box"><input type="text" value="${this.uiState.search.searchTerm || ''}"><button data-action="${ACTIONS.CANCEL_SEARCH}">Cancel</button></div>
                <div class="search-container">${this.searchStatusMap[this.uiState.search.status].call(this)}</div>
              </div>`
    }

    _getInitSearchResults() {
      return `<span class="icon-search-place-holder"></span>
<span>Search</span>`
    }

    _getSearchNoResults() {
      return `<span class="icon-search-place-holder"></span>
<span>Not Found</span>`
    }

    _generateSearchResults() {
      return `<ul class="search-results">${this.uiState.search.searchResults.map(this._createSearchResItem.bind(this)).join('')}</ul>`;
    }

    _createSearchResItem(searchItem) {
      return `<li class=${CLASSES.STOCK_ITEM} data-symbol="${searchItem.symbol}" >
              <div class="stock-name">
                <span class="symbol">${searchItem.symbol}</span>
                <span class="full-name">${searchItem.exchDisp}</span>
              </div>
              <div class="add-stock">
              <button>+</button></div>
            </li>`

    }

    _generateScreenByAppState() {
      if (this.uiState.view === VIEWS.SEARCH) {
        return this._createSearchView();
      }
      if (this.uiState.showFilterBar) {
        return this._createGeneralAppHeader() + this._generateFilterForm() + this._createStockUL();
      }
      return this._createGeneralAppHeader() + this._createStockUL();

    }


    _isPositive(change) {
      return change[0] !== '-'
    }

    _removeCurrentAppCnt(appWrapper) {
      const appCnt = appWrapper.querySelector(`.${CLASSES.APP_CONTAINER}`);
      if (!appCnt) {
        console.error("Couldn't find app-container");
      }
      appCnt.remove();
    }

    _convertPresentValues(displayVal) {
      const convertMap = {
        [DISPLAY_VALUES.PERCENTAGE]: val => parseFloat(displayVal).toFixed(2) + '%',
        [DISPLAY_VALUES.MCAP]: val => parseFloat(displayVal).toFixed(2) + 'B',
        [DISPLAY_VALUES.CHANGE]: val => parseFloat(displayVal).toFixed(2)
      };
      return convertMap[this.uiState.displayVal](displayVal);
    }

    _handleClick(e) {
      const nodeTarget = e.target;
      if (this.eventMap[nodeTarget.nodeName] && this.eventMap[nodeTarget.nodeName][nodeTarget.dataset.action]) {
        this.eventMap[nodeTarget.nodeName][nodeTarget.dataset.action](e);
      } else {
        console.error("There is no event handler for this kind of element");
      }
    }

    _reorderStockList(e) {
      const stockLi = e.target.closest(`.${CLASSES.STOCK_ITEM}`),
        currentTarget = e.target,
        stockSymbol = stockLi.dataset.symbol,
        direction = currentTarget.dataset.direction;
      Stokr.Cntl.reorderStockList(stockSymbol, direction);
    }

    _changePresentValue(e) {
      Stokr.Cntl.changePresentValue();
    }

    _getHash() {
      return window.location.hash.slice(1);
    }

    _handleSearch(e) {
      if (e.keyCode === 13 && e.target.value.length > 0) {
        Stokr.Cntl.search(e.target.value);

      }
    }


    render(appState) {
      this.uiState = appState.uiState;
      this.stocks = appState.stocks;
      const appWrapper = document.querySelector(`.${CLASSES.APP_WRAPPER}`);
      this._removeCurrentAppCnt(appWrapper);
      appWrapper.innerHTML = `<div class="${CLASSES.APP_CONTAINER}">${this._generateScreenByAppState()}</div>`;
      if (this.uiState.view === VIEWS.SEARCH) {
        appWrapper.querySelector(`.${CLASSES.APP_CONTAINER}`).addEventListener('keypress', this._handleSearch.bind(this));
      }
      appWrapper.querySelector(`.${CLASSES.APP_CONTAINER}`).addEventListener('click', this._handleClick.bind(this));

    }

  }

  Stokr.View = View;

}(window.Stokr = window.Stokr || {}));
