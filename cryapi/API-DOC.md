# Api calls:

##Wallet

### Wallet creation:

##### Example Call:
###### `http://localhost:8080/new-wallet?type=new`
###### `{or pass existing seed as argument, as opposed to "new"}`

#####Example reply:

###### `{"seedPhrase":"[thank, original, sick, spice, fuel, column, city, blast, rain, used, tray, input]"}`

### Getting currency:
#### successful:
##### Example Call:
##### `http://localhost:8080/currency?name=Bitcoin`
####
#####Example reply:
###### `{"name":"Bitcoin","price":9000.11,"balance":99.11,"keyPairs":[{"privateKey":"lotkydQ8249XBxFqMNZnEP3V","publicKey":"XnMvgmr5N9zGsFsA3nYLPpY1KD9MKxYq"},{"privateKey":"NrhNNEo2gF15FAyRd9uNkFu5","publicKey":"lMNGmVRnl4DAzqKl5zkMivMRu4Lhbosl"}, ...]}`
##### TODO: there will also be a balance attached to each keypair soon

#### not successful:
##### Example Call:
`http://localhost:8080/currency?name={any unsoppurted name}`
#####Example reply:
`{"name":"Invalid name","price":-1.0,"balance":-1.0,"keyPairs":null}`