export function roundTo2(val) {
    if (val > 0.001) {
        return(Math.floor(val * 100) / 100 ) }
    else {
        return val.toPrecision(4);
    }
}

export function getCoinByCode(code, coins) {
    if(!coins){
        return null;
    }
    for(let i = 0; i <coins.length; i++) {
        if(coins[i].code === code){
            return coins[i]
        }
    }
    return null;
}
