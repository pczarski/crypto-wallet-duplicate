export function roundTo2(val) {
    if(val == null){
        return 0;
    }
    if (val > 0.001) {
        return(Math.floor(val * 100) / 100 ) }
    else if (val < 0.001) {
        return Number.parseFloat(val).toPrecision(4);
    }
    else return null
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

export function get24changeFormat(val) {
    return Number.parseFloat(val).toPrecision(2)
}