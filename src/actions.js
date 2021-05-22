/* eslint-disable prettier/prettier */
import axios from "axios";
import { DELETE_FAVORITE, FETCH_COIN_DETAILS, FETCH_COIN_DETAILS_FAILED, FETCH_COIN_DETAILS_SUCCESS, SAVE_FAVORITE, SEARCH_COINS, SORT_LIST } from './types';

export function fetchCoinList(data) {
    return dispatch => {
        dispatch(fetchCoinDetails(data));
        axios
            .get(`https://api.nomics.com/v1/currencies/ticker?key=aec0250b1d047a85b34b149b04aeacab194a2ac8&per-page=150&interval=1d`)
            .then(res => {
                dispatch(fetchCoinDetailsSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchCoinDetailsFailed(err.message));
            });
    };
};

export function searchCoinList(query) {
    return dispatch => {
        dispatch(searchCoin(query));
    }
};

export function saveFavoriteCoin(name) {
    return dispatch => {
        dispatch(saveFavorite(name));
    }
};

export function deleteFavorite(name) {
    return dispatch => {
        dispatch(removeFavorite(name));
    }
};

export function sortList(type) {
    return dispatch => {
        dispatch(sortCoinList(type));
    }
};

const fetchCoinDetails = (data) => ({
    type: FETCH_COIN_DETAILS,
    payload: {
        data
    }
});

const fetchCoinDetailsSuccess = data => ({
    type: FETCH_COIN_DETAILS_SUCCESS,
    payload: {
        data
    }
});

const fetchCoinDetailsFailed = error => ({
    type: FETCH_COIN_DETAILS_FAILED,
    payload: {
        error
    }
});

const searchCoin = (query) => ({
    type: SEARCH_COINS,
    payload: {
        query
    }
});

const saveFavorite = (coinName) => ({
    type: SAVE_FAVORITE,
    payload: {
        coinName
    }
});

const removeFavorite = (coinName) => ({
    type: DELETE_FAVORITE,
    payload: {
        coinName
    }
});

const sortCoinList = (type) => ({
    type: SORT_LIST,
    payload: {
        type
    }
});