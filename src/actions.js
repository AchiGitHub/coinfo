/* eslint-disable prettier/prettier */
import axios from "axios";
import {
    DELETE_FAVORITE,
    FETCH_COIN_DETAILS,
    FETCH_COIN_DETAILS_FAILED,
    FETCH_COIN_DETAILS_SUCCESS,
    FETCH_SECONDARY_LIST,
    SAVE_FAVORITE,
    SEARCH_COINS,
    SORT_LIST,
    FETCH_SECONDARY_LIST_SUCCESS,
    FETCH_SECONDARY_LIST_FAILED
} from './types';

export function fetchCoinList(data) {
    return dispatch => {
        dispatch(fetchCoinDetails(data));
        axios
            .get(`https://api.nomics.com/v1/currencies/ticker?key=aec0250b1d047a85b34b149b04aeacab194a2ac8&page=1&per-page=100&interval=1d`)
            .then(res => {
                dispatch(fetchCoinDetailsSuccess(res.data));
                dispatch(fetchNextSet());
            })
            .catch(err => {
                dispatch(fetchCoinDetailsFailed(err.message));
            });
    };
};

export function fetchNextSet() {
    return dispatch => {
        dispatch(fetchSecondaryList());
        axios
            .get(`https://api.nomics.com/v1/currencies/ticker?key=aec0250b1d047a85b34b149b04aeacab194a2ac8&page=2&per-page=100&interval=1d`)
            .then(res => {
                dispatch(fetchSecondaryListSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchSecondaryListFailed(err.message));
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

const fetchSecondaryList = (data) => ({
    type: FETCH_SECONDARY_LIST,
    payload: {
        data
    }
});

const fetchSecondaryListSuccess = data => ({
    type: FETCH_SECONDARY_LIST_SUCCESS,
    payload: {
        data
    }
});

const fetchSecondaryListFailed = error => ({
    type: FETCH_SECONDARY_LIST_FAILED,
    payload: {
        error
    }
});