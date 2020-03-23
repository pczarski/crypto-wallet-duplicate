# Api calls:

#Wallet

## Wallet creation:

##### Example Call:
###### `http://localhost:8080/new-wallet?type=new`
###### `{or pass existing seed as argument, as opposed to "new"}`

#####Example reply:

###### `{"seedPhrase":"[thank, original, sick, spice, fuel, column, city, blast, rain, used, tray, input]"}`

## Getting currency:
#### successful:
##### Example Call:
##### `http://localhost:8080/currency?name=Bitcoin`
####
#####Example reply:
###### `{"name":"Bitcoin","price":9000.11,"balance":11.635996202010295,"currentPublicKey":"fqSCGfR1S2vLK3h9mEyEMPQp1qg7Y1amV","keyPairs":[{"privateKey":"ZOG8cgxc2DLelVIZfzWBfmz1","publicKey":"fqSCGfR1S2vLK3h9mEyEMPQp1qg7Y1amV","balance":0.36231410355174454},{"privateKey":"mVqqyUzASMivBQdiQMfH86bR","publicKey":"5mEm9VbOpLd8QLFjBN5DonarfitViMLh8","balance":0.2889623081611379}, ...`


#### not successful:
##### Example Call:
`http://localhost:8080/currency?name={any unsoppurted name}`
#####Example reply:
`{"name":"Invalid name","price":-1.0,"balance":-1.0,"keyPairs":null}`


## Sending coins:
#### successful:
##### Example Call:
`http://localhost:8080/send?name=Bitcoin&amount=0.5&address=xxxxxxxxxxx`
##### Example reply:
`{"response":"success","id":3}`  //successful id > 0

#### unsuccessful:
##### Example Call:
`http://localhost:8080/send?name=Bitcoin&amount=10003.2&address=xxxxx`
##### Example reply:
`{"response":"Insufficient balance","id":0}`

#####also:
`http://localhost:8080/send?name=Bitjjcoin&amount=10003.2&address=xxxxx`
######
`{"response":"Invalid currency name","id":-1}`


## Get Records:
#### successful:
##### Example Call:
`http://localhost:8080/records?name=Bitcoin`
##### Example reply:
`{"currencyName":"Bitcoin","records":[{"time":"Sun Mar 22 14:51:02 GMT 2020","destinationAddress":"xxxxx","originAddress":"UqS4lznYHH0WdSGzoCLx3PZUTol4dZk6U","id":1,"type":"SEND","transactionAmount":0.2}, {"time":"Sun Mar 22 15:16:34 GMT 2020","destinationAddress":"tad0t7eFWLRsZfMWbylF6su290cUGnVj3","originAddress":"xxxTHExxSYSTEMxxx","id":2,"type":"RECEIVE","transactionAmount":0.9905082941082037}, ...]}`
##

#Exchange

## Adding exchange

####call
`http://localhost:8080/add-exchange?name=Coinbase&key=XXXKEYXXX`
####response: 
`{"exchangeName":"Coinbase","apiKey":"XXXKEYXXX"}`

####call
`http://localhost:8080/add-exchange?name=Bitconnect&key=XXXKEYXXX`
####response: 
`{"exchangeName":"Not Supported","apiKey":null}`