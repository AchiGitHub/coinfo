import {
  FETCH_COIN_DETAILS_FAILED,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_DETAILS,
  SEARCH_COINS,
  SAVE_FAVORITE,
  DELETE_FAVORITE,
  SORT_LIST
} from "./types";
import { sortByPriceAsc, sortByPriceDsc, sortByRank, sortByRankDsc } from "./util/Helpers";

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
      state.coinData.map((data, idx) => {
        if (data.name === action.payload.coinName) {
          data.isFavorite = true;
        }
      });
      state.allCoinData.map((data, idx) => {
        if (data.name === action.payload.coinName) {
          data.isFavorite = true;
        }
      });
      return {
        ...state
      }
    case DELETE_FAVORITE:
      state.coinData.map((data, idx) => {
        if (data.name === action.payload.coinName) {
          data.isFavorite = false;
        }
      });
      state.allCoinData.map((data, idx) => {
        if (data.name === action.payload.coinName) {
          data.isFavorite = false;
        }
      });
      return {
        ...state
      };
    case SORT_LIST:
      if (action.payload.type === "asc") {
        state.coinData.sort(sortByPriceAsc);
        state.allCoinData.sort(sortByPriceAsc);
      } else if (action.payload.type === "dsc") {
        state.coinData.sort(sortByPriceDsc);
        state.allCoinData.sort(sortByPriceDsc);
      } else {
        state.coinData.sort(sortByRank);
        state.allCoinData.sort(sortByRank);
      }
      return {
        ...state
      }
    default:
      return state;
  }
}