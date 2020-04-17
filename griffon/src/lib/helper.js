export function roundTo2(val) {
    if (val > 0) {
        return(Math.floor(val * 100) / 100 ) }
    else {
        return val.toFixed(2)
    }
}

export function getCoinByCode(code, coins) {
    for(let i = 0; i <coins.length; i++) {
        if(coins[i].code === code){
            return coins[i]
        }
    }
    return null;
}
