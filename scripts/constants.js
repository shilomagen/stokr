const SERVER_ADDRS='http://localhost:7000';

const DISPLAY_VALUES = {
  PERCENTAGE: 'realtime_chg_percent',
  MCAP: 'MarketCapitalization',
  CHANGE: 'realtime_change'
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
};

const ACTIONS={
  DISPLAY_VAL:'display_val',
  REORDER: 'reorder',
  REORDER_DIRECTION: {
    UP:'up',
    DOWN:'down'
  },
  SHOW_FILTER_BAR:'show_filter_bar',
  REFRESH:'refresh-stock',
  APPLY_FILTER: 'apply-filter'
};

const VIEWS={
  GENERAL:'general',
  SEARCH:'search'
};

const ENDPOINTS={
  QUOTES:SERVER_ADDRS+'/quotes?q='
};

const DISPLAY_ARRAY=[DISPLAY_VALUES.PERCENTAGE, DISPLAY_VALUES.MCAP, DISPLAY_VALUES.CHANGE];

