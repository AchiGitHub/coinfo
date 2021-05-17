import {
  FETCH_COIN_DETAILS_FAILED,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_DETAILS,
  SEARCH_COINS,
  SAVE_FAVORITE,
  DELETE_FAVORITE
} from "./types";

const initialState = {
  loading: false,
  coinData: [],
  error: null,
  allCoinData: [],
  favoriteCoins: []
};

export default function coinDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COIN_DETAILS:
      let favoriteData = [];
      if (action.payload.data !== null) {
        favoriteData = JSON.parse(action.payload.data).coins;
      }
      return {
        ...state,
        loading: true,
        favoriteCoins: favoriteData
      };
    case FETCH_COIN_DETAILS_SUCCESS:
      //check if theres favorites and set variable to true
      if (state.favoriteCoins.length !== 0) {
        action.payload.data.map((data, key) => {
          if (state.favoriteCoins.includes(data.name)) {
            data.isFavorite = true;
          } else {
            data.isFavorite = false;
          }
        });
      }
      return {
        ...state,
        loading: false,
        error: null,
        coinData: action.payload.data,
        allCoinData: action.payload.data
      };
    case FETCH_COIN_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        coinData: [],
        allCoinData: []
      };
    case SEARCH_COINS:
      var searchFilterList = state.allCoinData.filter(elem => {
        return elem.name.toLowerCase().includes(action.payload.query.toLowerCase())
      });
      return {
        ...state,
        coinData: searchFilterList
      };
    case SAVE_FAVORITE:
      let index = state.coinData.findIndex(data => data.name === action.payload.coinName);
      state.coinData[index].isFavorite = true;
      state.allCoinData[index].isFavorite = true;
      return {
        ...state
      };
    case DELETE_FAVORITE:
      let idx = state.coinData.findIndex(data => data.name === action.payload.coinName);
      state.coinData[idx].isFavorite = false;
      state.allCoinData[idx].isFavorite = false;
      return {
        ...state
      };
    default:
      return state;
  }
}