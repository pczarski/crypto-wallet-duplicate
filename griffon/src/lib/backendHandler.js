
// this function calls the backend API to get data
// in format http://localhost:8080/location?argumentName=argumentValue the backend can make decisions based on location and argument name and value
// TODO: make another one of those that accepts any number of arguments
export function getRequest(location, argumentName, argumentValue) {
    const baseUrl = "http://localhost:8080/";
    const url = baseUrl + location +"?"+ argumentName +"="+ argumentValue;
    console.log(url); // example url: http://localhost:8080/currency?name=Bitcoin

    // get request
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);
}

export function getCurr(currency) {
    const baseUrl = "http://localhost:8080/currency?name=";
    const url = baseUrl + currency;
    console.log(url); // example url: http://localhost:8080/currency?name=Bitcoin

    // get request
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);
}

export function makeWallet(seed){
    let url;
    if (seed === null) {
        url = "http://localhost:8080/new-wallet?type=new";
    } else {
        url = "http://localhost:8080/new-wallet?type=" + seed;
    }
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);
}
