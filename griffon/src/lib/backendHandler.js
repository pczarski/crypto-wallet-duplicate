
// this function calls the backend API to get data
// in format http://localhost:8080/location?argumentName=argumentValue the backend can make decisions based on location and argument name and value
// TODO: make another one of those that accepts any number of arguments
export function getRequest(location, argumentName, argumentValue) {
    const baseUrl = "http://localhost:8080/";
    const url = baseUrl + location +"?"+ argumentName +"="+ argumentValue;
    // console.log(url); // example url: http://localhost:8080/currency?name=Bitcoin

    // get request
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);
}
export function getCurr(currency) {
    const baseUrl = "http://localhost:8080/currency?name=";
    const url = baseUrl + currency;
    // console.log(url); // example url: http://localhost:8080/currency?name=Bitcoin

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

export function sendCurr(curr, amount, address){

    // http://localhost:8080/send?name=BTC&amount=0.5&address=xxxxxxxxxxx
    // example URL

    const url = "http://localhost:8080/send?name=" + curr + "&amount=" + amount + "&address=" + address;
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);
}
export function getBalance(currency) {
    const baseUrl = "http://localhost:8080/currency?name=";
    const url = baseUrl + currency;
    // console.log(url); // example url: http://localhost:8080/currency?name=Bitcoin

    // get request
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText).balance;
}

export function getRecords(curr) {
    // http://localhost:8080/records?name=BTC
    const baseUrl = "http://localhost:8080/records?name=" + curr;
    const url = baseUrl + curr;

    // get request
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);

}
export function cancelOrder(exchange, id) {
    // http://localhost:8080/cancel?exchange=Binance&id=1
    const url = "http://localhost:8080/cancel?exchange=" + exchange + "&id=" + id;

    // get request
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);
}
export function getOrders(exchange) {
    // http://localhost:8080/orders?exchange=Binance
    const url = "http://localhost:8080/orders?exchange=" + exchange;
    // get request
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);
}
export function makeOrder(type, exchange, currencyFrom, currencyTo, amount, price) {
    // http://localhost:8080/new-order?&type=Sell&exchange=Binance&currency1=BTC&currency2=ETH&amount=0.5&price=10.4`
    const url = "http://localhost:8080/new-order?&type=" + type + "&exchange=" + exchange + "&currency1=" + currencyFrom + "&currency2=" + currencyTo +"&amount="+amount+"&price=" + price;

    // get request
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);
}
export function swapOrder(exchange, currencyFrom, currencyTo, amount) {
    // http://localhost:8080/swap?exchange=Binance&currency1=BTC&currency2=ETH&amount=0.5
    const url = "http://localhost:8080/swap?exchange="+ exchange + "&currency1=" + currencyFrom + "&currency2=" + currencyTo + "&amount=" + amount;

    // get request
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);
}
export function addExchange(exchange, key) {
    // http://localhost:8080/add-exchange?name=Coinbase&key=XXXKEYXXX
    const url = "http://localhost:8080/add-exchange?name=" + exchange + "&key=" + key;
    // get request
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    return JSON.parse(req.responseText);
}
export function getOrderHistory(exchange) {
  const baseUrl = "http://localhost:8080/orders?exchange=";
  const url = baseUrl + exchange;
  // get request
  let req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send(null);
  return JSON.parse(req.responseText);
}
export function getAllOrderHistory() {
  const url = "http://localhost:8080/all-orders";
  // get request
  let req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send(null);
  return JSON.parse(req.responseText);
}
