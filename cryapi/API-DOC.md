## Supported currencies and names:
	BTC (Bitcoin)
	DASH (Dash)
	ETH (Ethereun)
	LTC (Litecoin)
	USDT (Thether)
	
	
### Price is by default in USD

# Api calls:

# Wallet

## Wallet creation:

##### Example Call:
    http://localhost:8080/new-wallet?type=new {or pass existing seed as argument, as opposed to "new"}

##### Example reply:

    {"seedPhrase":"joke curious express sunset grow tray hello explain wasp dinner ridge bench"}

##### Get wallet:
    http://localhost:8080/seed
##### Example reply:

    {"seedPhrase":"joke curious express sunset grow tray hello explain wasp dinner ridge bench"}


## Getting currency:
#### successful:
##### Example Call:
    http://localhost:8080/currency?name=BTC
####
##### Example reply:
    {"name":"Bitcoin","price":9000.11,"balance":11.635996202010295,"currentPublicKey":"fqSCGfR1S2vLK3h9mEyEMPQp1qg7Y1amV","keyPairs":[{"privateKey":"ZOG8cgxc2DLelVIZfzWBfmz1","publicKey":"fqSCGfR1S2vLK3h9mEyEMPQp1qg7Y1amV","balance":0.36231410355174454},{"privateKey":"mVqqyUzASMivBQdiQMfH86bR","publicKey":"5mEm9VbOpLd8QLFjBN5DonarfitViMLh8","balance":0.2889623081611379}, ...


#### not successful:
##### Example Call:
    http://localhost:8080/currency?name={any unsoppurted name}
##### Example reply:
    {"name":"Invalid name","price":-1.0,"balance":-1.0,"keyPairs":null}


## Sending coins:
#### successful:
##### Example Call:
    http://localhost:8080/send?name=BTC&amount=0.5&address=xxxxxxxxxxx
##### Example reply:
    {"response":"success","id":3}  //successful id > 0

#### unsuccessful:
##### Example Call:
    http://localhost:8080/send?name=BTC&amount=10003.2&address=xxxxx
##### Example reply:
    {"response":"Insufficient balance","id":0}

##### also:
    http://localhost:8080/send?name=Bitjjcoin&amount=10003.2&address=xxxxx
######
    {"response":"Invalid currency name","id":-1}


## Get Records:
#### successful:
##### Example Call:
    http://localhost:8080/records?name=BTC
##### Example reply:
    {"currencyName":"Bitcoin","records":[{"time":"Sun Mar 22 14:51:02 GMT 2020","destinationAddress":"xxxxx","originAddress":"UqS4lznYHH0WdSGzoCLx3PZUTol4dZk6U","id":1,"type":"SEND","transactionAmount":0.2}, {"time":"Sun Mar 22 15:16:34 GMT 2020","destinationAddress":"tad0t7eFWLRsZfMWbylF6su290cUGnVj3","originAddress":"xxxTHExxSYSTEMxxx","id":2,"type":"RECEIVE","transactionAmount":0.9905082941082037}, ...]}
##

# Exchange

## Adding exchange

#### call
    http://localhost:8080/add-exchange?name=Coinbase&key=XXXKEYXXX
#### response: 
    {"exchangeName":"Coinbase","apiKey":"XXXKEYXXX"}

#### call
    http://localhost:8080/add-exchange?name=Bitconnect&key=XXXKEYXXX
#### response: 
    {"exchangeName":"Not Supported","apiKey":null}

## Get currency in exchange

#### call
    http://localhost:8080/exchange-currency?exchange=Binance&currency=BTC
#### response: 
    {"name":"Bitcoin","exchangeName":"Binance","publicAddress":"Bitcoin_TEST_KEY_XX","balance":100.0,"marketValue":0.0}

## Withdraw from an exchange to the wallet

#### call
    http://localhost:8080/withdraw?exchange=Binance&currency=BTC&amount=2.5
#### response: 
    {"response":"success","id":1}

## Deposit from the wallet to an exchange

#### call
    http://localhost:8080/deposit?exchange=Binance&currency=BTC&amount=0.5

#### response:
    {"response":"success","id":1}

####

## Make Orders

#### call
    types include: Sell, Buy

    http://localhost:8080/new-order?&type=Sell&exchange=Binance&currency1=BTC&currency2=ETH&amount=0.5&price=10.4`

### reply:

    {"id":1,"currency1":"BTC","currency2":"ETH","initialAmount":5.0,"amountComplete":0.0,"unitPrice":10.0,"type":"Sell","status":"NEW","percentComplete":0.0,"date":"Mon Apr 06 18:55:59 BST 2020"}

## Get Order / view progress

    http://localhost:8080/get-order?&exchange=Binance&id=1

## Place swap order
######  swap order automatically places a sell order at the market price
    
    http://localhost:8080/swap?exchange=Binance&currency1=BTC&currency2=ETH&amount=0.5
    
## get order history:
#### all history:
    [{"id":1,"exchange":"Binance","currency1":"BTC","currency2":"DASH","initialAmount":10.0,"amountComplete":10.0,"unitPrice":10.0,"type":"Buy","status":"COMPLETE","percentComplete":100.0,"date":"Wed Apr 08 22:45:14 BST 2020"},{"id":2,"exchange":"Binance","currency1":"LTC","currency2":"ETH","initialAmount":20.0,"amountComplete":20.0,"unitPrice":3.2,"type":"Sell","status":"COMPLETE","percentComplete":100.0,"date":"Wed Apr 08 22:45:22 BST 2020"},{"id":4,"exchange":"Coinbase","currency1":"DASH","currency2":"ETH","initialAmount":15.0,"amountComplete":15.0,"unitPrice":0.4366547219974569,"type":"Sell","status":"COMPLETE","percentComplete":100.0,"date":"Wed Apr 08 22:46:30 BST 2020"},{"id":5,"exchange":"Coinbase","currency1":"DASH","currency2":"ETH","initialAmount":4.0,"amountComplete":4.0,"unitPrice":0.43705889158856875,"type":"Sell","status":"COMPLETE","percentComplete":100.0,"date":"Wed Apr 08 22:46:36 BST 2020"}]
   
#### by exchange:
    http://localhost:8080/orders?exchange=Binance
    
##### ex. reply:
    [{"id":1,"exchange":"Binance","currency1":"BTC","currency2":"DASH","initialAmount":10.0,"amountComplete":10.0,"unitPrice":10.0,"type":"Buy","status":"COMPLETE","percentComplete":100.0,"date":"Wed Apr 08 22:45:14 BST 2020"},{"id":2,"exchange":"Binance","currency1":"LTC","currency2":"ETH","initialAmount":20.0,"amountComplete":20.0,"unitPrice":3.2,"type":"Sell","status":"COMPLETE","percentComplete":100.0,"date":"Wed Apr 08 22:45:22 BST 2020"}]