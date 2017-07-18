const mockData = [
  {
    "Symbol": "WIX",
    "Name": "Wix.com Ltd.",
    "Change": "0.750000",
    "PercentChange": "+1.51%",
    "LastTradePriceOnly": "76.099998"
  },
  {
    "Symbol": "MSFT",
    "Name": "Microsoft Corporation",
    "PercentChange": "-2.09%",
    "Change": "-0.850006",
    "LastTradePriceOnly": "69.620003"
  },
  {
    "Symbol": "YHOO",
    "Name": "Yahoo! Inc.",
    "Change": "0.279999",
    "PercentChange": "+1.11%",
    "LastTradePriceOnly": "50.599998"
  }
];
const DISPLAY_VALUES = {
  PERCENTAGE: 'PercentChange',
  MCAP:'Change'
};
const appName = 'stokr';
const appState = {
  displayVal: DISPLAY_VALUES.PERCENTAGE
};



function createGeneralAppHeader() {
  return `<header class="app-header">
            <h1>${appName}</h1>
            <div class="icons-menu">
              <span class="icon-search"></span>
              <span class="icon-refresh"></span>
              <span class="icon-filter"></span>
              <span class="icon-settings"></span>
            </div>
          </header>`;
}
function createStockUL() {
  return `<ul class="stock-list">${mockData.map(createStockItem).join('')}</ul>`;
}
function createStockItem(stockItem) {
  return `<li class="stock-item" data-id="${stockItem.Symbol}" >
              <div class="stock-name">
                <span class="symbol">${stockItem.Symbol}</span>
                <span class="full-name">${stockItem.Name}</span>
              </div>
              <div class="stock-params">
                <span class="price">${parseInt(stockItem.LastTradePriceOnly).toFixed(2)} </span>
                <button class="present-value"><span>${stockItem.PercentChange}</span></button>
                <div class="arrange-btns-bar">
                  <button class="up icon-arrow"></button>
                  <button class="down icon-arrow"></button>
                </div>
              </div>
            </li>`
}
function generateMainScreen(){
  return createGeneralAppHeader() + createStockUL();
}
function handleAppCntClickEvent(e){
  if (ev.target.nodeType === 'LI'){


  }

}

function init() {
  const appCnt = document.querySelector('.app-container');
  appCnt.innerHTML = generateMainScreen();
  appCnt.addEventListener('click', handleAppCntClickEvent);
}


init();
