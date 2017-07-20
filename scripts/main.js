const appName = 'stokr';
const appState = {
  displayVal: DISPLAY_VALUES.PERCENTAGE
};

const eventMap = {
  BUTTON: {
    [CLASSES.PRESENT_VALUE + ' ' + CLASSES.POSITIVE]: changePresentValue,
    [CLASSES.PRESENT_VALUE + ' ' + CLASSES.NEGATIVE]: changePresentValue,
    [CLASSES.ICON_ARROW_DOWN + ' ' + CLASSES.ICON_ARROW]: function () {
      reorderStockList.call(this, CLASSES.ICON_ARROW_DOWN)
    },
    [CLASSES.ICON_ARROW_UP + ' ' + CLASSES.ICON_ARROW]: function () {
      reorderStockList.call(this, CLASSES.ICON_ARROW_UP)
    },
  }
};

function createGeneralAppHeader() {
  return `<header class="app-header">
            <h1>${appName}</h1>
            <ul class="icons-menu">
            <li><button class="icon-search"></button></li>
            <li><button class="icon-refresh"></button></li>
            <li><button class="icon-filter"></button></li>
            <li><button class="icon-settings"></button></li></ul>
          </header>`;
}

function createStockUL() {
  return `<ul class="stock-list">${MOCK_DATA.map(createStockItem).join('')}</ul>`;
}

function createStockItem(stockItem, index, dataArr) {
  return `<li class=${CLASSES.STOCK_ITEM} data-symbol="${stockItem.Symbol}" >
              <div class="stock-name">
                <span class="symbol">${stockItem.Symbol}</span>
                <span class="full-name">${stockItem.Name}</span>
              </div>
              <div class="stock-params">
                <span class="price">${parseInt(stockItem.LastTradePriceOnly).toFixed(2)} </span>
                <!--<button class="${CLASSES.PRESENT_VALUE} ${isPositive(stockItem.PercentChange) ? 'positive' : 'negative'}">${convertPresentValues(stockItem[appState.displayVal])}</button>-->
                <div class="arrange-btns-bar">
                  <button class="${CLASSES.ICON_ARROW_UP} ${CLASSES.ICON_ARROW}" ${index === 0 ? 'disabled' : ''}></button>
                  <button class="${CLASSES.ICON_ARROW_DOWN} ${CLASSES.ICON_ARROW }" ${index === dataArr.length - 1 ? 'disabled' : ''}></button>
                </div>
              </div>
            </li>`
}

function generateScreenByAppState() {
  return createGeneralAppHeader() + createStockUL();
}

function convertPresentValues(displayVal){
  if (appState.displayVal === DISPLAY_VALUES.MCAP)
    return displayVal;
  return  appState.displayVal=== DISPLAY_VALUES.PERCENTAGE ? parseFloat(displayVal).toFixed(2) + '%' : parseFloat(displayVal).toFixed(2);

}
function isPositive(change){
  return change[0] === '+'
}


function handleClick(e) {
  const nodeTarget = e.target;
  if (eventMap[nodeTarget.nodeName] && eventMap[nodeTarget.nodeName][nodeTarget.className]) {
    eventMap[nodeTarget.nodeName][nodeTarget.className].call(nodeTarget);
  } else {
    console.error("There is no event handler for this kind of element");
  }
}

function reorderStockList(direction) {
  const stockLi = this.closest(`.${CLASSES.STOCK_ITEM}`),
    stockSymbol = stockLi.dataset.symbol,
    stockIndex = MOCK_DATA.findIndex((item) => item.Symbol === stockSymbol);
  swapElements(MOCK_DATA, stockIndex, direction === 'up' ? stockIndex - 1 : stockIndex + 1);
  render();
}

function swapElements(arr, firstIndex, secondIndex) {
  let tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
}

function init() {
  render();
}

function render() {
  const appWrapper = document.querySelector(`.${CLASSES.APP_WRAPPER}`);
  removeCurrentAppCnt(appWrapper);
  appWrapper.innerHTML = `<div class="${CLASSES.APP_CONTAINER}">${generateScreenByAppState()}</div>`;
  appWrapper.querySelector(`.${CLASSES.APP_CONTAINER}`).addEventListener('click', handleClick);
}

function removeCurrentAppCnt(appWrapper) {
  const appCnt = appWrapper.querySelector(`.${CLASSES.APP_CONTAINER}`);
  if (!appCnt) {
    throw new Error("Couldn't find app-container");
  }
  appCnt.remove();
}

function changePresentValue() {
  const currentPresentState = appState.displayVal;
  const currentIndex = DISPLAY_ARRAY.indexOf(currentPresentState);
  appState.displayVal = DISPLAY_ARRAY[(currentIndex + 1) % DISPLAY_ARRAY.length];
  render();
}

init();
