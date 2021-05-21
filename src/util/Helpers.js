export const sortByPriceAsc = (a, b) => {
    if (parseFloat(a.price) < parseFloat(b.price)) {
        return -1;
    }
    if (parseFloat(a.price) > parseFloat(b.price)) {
        return 1;
    }
    return 0;
}

export const sortByPriceDsc = (a, b) => {
    if (parseFloat(a.price) > parseFloat(b.price)) {
        return -1;
    }
    if (parseFloat(a.price) < parseFloat(b.price)) {
        return 1;
    }
    return 0;
}

export const sortByRank = (a, b) => {
    return parseInt(a.rank) - parseInt(b.rank);
}