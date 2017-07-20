const DISPLAY_VALUES = {
  PERCENTAGE: 'PercentChange',
  MCAP: 'MCap',
  CHANGE: 'Change'
};
const CLASSES= {
  APP_WRAPPER:'app-wrapper',
  STOCK_ITEM:'stock-item',
  APP_CONTAINER: 'app-container',
  PRESENT_VALUE:'present-value',
  ICON_ARROW: 'icon-arrow',
  ICON_ARROW_UP: 'up',
  ICON_ARROW_DOWN: 'down',
  POSITIVE: 'positive',
  NEGATIVE: 'negative'
}

const DISPLAY_ARRAY=[DISPLAY_VALUES.PERCENTAGE, DISPLAY_VALUES.MCAP, DISPLAY_VALUES.CHANGE];

const MOCK_DATA = [
  {
    "Symbol": "WIX",
    "Name": "Wix.com Ltd.",
    "Change": "0.750000",
    "PercentChange": "+1.51%",
    "LastTradePriceOnly": "76.099998",
    "MCap":"30.2B"
  },
  {
    "Symbol": "MSFT",
    "Name": "Microsoft Corporation",
    "PercentChange": "-2.09%",
    "Change": "-0.850006",
    "LastTradePriceOnly": "69.620003",
    "MCap":"34.2B"

  },
  {
    "Symbol": "YHOO",
    "Name": "Yahoo! Inc.",
    "Change": "0.279999",
    "PercentChange": "+1.11%",
    "LastTradePriceOnly": "50.599998",
    "MCap":"294B"

  }
];
