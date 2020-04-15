package g37.cryapi.wallet.api;

import g37.cryapi.common.TextResponse;
import g37.cryapi.common.ValueResponse;
import g37.cryapi.wallet.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import g37.cryapi.common.CryptoCurrency;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

// Controller that handles the GET request and returns an appropriate object (factory design pattern)
// it will return all the getParameter() functions to the json object
@RestController
public class CurrencyController {

    private final AtomicLong counter = new AtomicLong();

    // todo temporary helpers for testing
    private void runHelpers() {
        Wallet wallet = Wallet.getInstance();
        if(wallet.areSavedFiles() && !wallet.getIsSetUp()){
            wallet.loadFromFile();
            return;
        }
        if (!wallet.getIsSetUp()) {
            Wallet.getInstance().setUpNew();
        }
    }

    private void saveState() {
        Wallet wallet = Wallet.getInstance();
        wallet.saveState();
    }

    private KeyPairJson[] convertToKeyPairJson(List<KeyPair> keyPairs) {
        KeyPairJson[] outKeys = new KeyPairJson[keyPairs.size()];
        for(int i = 0; i < keyPairs.size(); i++) {
            outKeys[i] = new KeyPairJson(keyPairs.get(i).getPrivateKey(), keyPairs.get(i).getPublicKey(), keyPairs.get(i).getAmount());
        }
        return outKeys;
    }

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/currency") // setting up the url location
    public CurrencyJson getCurrency(@RequestParam(value = "name", defaultValue = "BTC") String name) {


        Wallet wallet = Wallet.getInstance();

        // todo temporary "hacks" to avoid null pointers for testing
        this.runHelpers();

        try {
            CurrencyInWallet currency = wallet.getCurrencyInWallet(CryptoCurrency.valueOf(name));
            return new CurrencyJson(
                    currency.getName().toString(),
                    currency.getName().getName(),
                    currency.getBalance(),
                    currency.getPrice(),
                    currency.getCurrentPublicKey(),
                    this.convertToKeyPairJson(currency.getKeyPairs())
            );
        } catch (IllegalArgumentException e) {
            return new CurrencyJson("Invalid name", null, -1, -1, null, null);
            //  throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid currency name", e); //TODO: this is what it should be but don't want to mess up the front end
        }
    } // accessed through: http://localhost:8080/currency?name=CurrencyName

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/all-coins")
    public CurrencyJson[] getCurrencies() {
        Wallet wallet = Wallet.getInstance();
        // todo temporary "hacks" to avoid null pointers for testing
        this.runHelpers();
        return this.toCurrencyJsonArray(wallet.getCurrenciesInWallet());
    } // accessed through: http://localhost:8080/all-coins

    private CurrencyJson[] toCurrencyJsonArray(List<CurrencyInWallet> currencyInWallets) {
        CurrencyJson[] out = new CurrencyJson[currencyInWallets.size()];
        for (int i = 0; i < out.length; i ++) {
            CurrencyInWallet currency = currencyInWallets.get(i);
            out[i] = new CurrencyJson(
                    currency.getName().toString(),
                    currency.getName().getName(),
                    currency.getBalance(),
                    currency.getPrice(),
                    currency.getCurrentPublicKey(),
                    this.convertToKeyPairJson(currency.getKeyPairs())
            );
        }
        return out;
    }



    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/send") // setting up the url location
    public TextResponse sendCoins(@RequestParam(value = "name", defaultValue = "Bitcoin") String name,
                                  @RequestParam(value = "amount", defaultValue = "0.0") double amount,
                                  @RequestParam(value = "address", defaultValue = "xxx") String address) {

        // todo temporary "hacks" to avoid null pointers
        this.runHelpers();

        Wallet wallet = Wallet.getInstance();
        try {
            CurrencyInWallet currency = wallet.getCurrencyInWallet(CryptoCurrency.valueOf(name));
            if(currency.send(address, amount)) {
                wallet.saveState();
                return new TextResponse("success", counter.incrementAndGet());
            }
            return new TextResponse("Insufficient balance", 0);

        } catch (IllegalArgumentException e) {

            return new TextResponse("Invalid currency name", -1);
        }
    } // accessed through: http://localhost:8080/send?name=Bitcoin&amount=0.5&address=xxxxxxxxxxx



    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/records") // setting up the url location
    public RecordsJson getRecords(@RequestParam(value = "name", defaultValue = "BTC") String name) {
        // todo temporary "hacks" to avoid null pointers
        this.runHelpers();
        try {
            CurrencyInWallet currency = Wallet.getInstance().getCurrencyInWallet(CryptoCurrency.valueOf(name));
            ArrayList<TransactionRecord> transactions = new ArrayList<>();
            return new RecordsJson(currency.getTransactionRecords(), name);

        } catch (IllegalArgumentException e) {
          //  throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid currency name", e); //TODO: this is what it should be but don't want to mess up the front end
            return new RecordsJson(null, "Invalid Name");
        }
    } // accessed through: http://localhost:8080/records?name=Bitcoin

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/price-in") // setting up the url location
    public ValueResponse getPriceIn(
            @RequestParam(value = "base", defaultValue = "BTC") String c1,
            @RequestParam(value = "in", defaultValue = "ETH") String c2
    ) {
        this.runHelpers();
        // get wallet instance
        Wallet wallet = Wallet.getInstance();
        try {
            double value = wallet.valueIn(CryptoCurrency.valueOf(c1), CryptoCurrency.valueOf(c2));
            return new ValueResponse(c1 + " in " + c2, value);
        } catch (IllegalArgumentException e) {
            return new ValueResponse("Couldn't find the currencies", -1);
        }
    } // http://localhost:8080/price-in?base=BTC&in=ETH

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/total-balance") // setting up the url location
    public ValueResponse getTotalBalance(
            @RequestParam(value = "in", defaultValue = "BTC") String currency
    ) {
        this.runHelpers();
        Wallet wallet = Wallet.getInstance();
        try {
            double value = wallet.getTotalBalance(CryptoCurrency.valueOf(currency));
            return new ValueResponse("Total balance in "+currency, value);
        } catch (IllegalArgumentException e) {
            return new ValueResponse("Couldn't find the currencies", -1);
        }
    } // http://localhost:8080/total-balance?in=BTC

}