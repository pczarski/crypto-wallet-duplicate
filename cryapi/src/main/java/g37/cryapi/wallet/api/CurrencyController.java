package g37.cryapi.wallet.api;

import g37.cryapi.common.TextResponse;
import g37.cryapi.wallet.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import g37.cryapi.common.CryptoCurrency;

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
        if (!Wallet.getInstance().getIsSetUp()) {
            Wallet.getInstance().setUpNew();
        }
    }

    private KeyPairJson[] convertToKeyPairJson(List<KeyPair> keyPairs) {
        KeyPairJson[] outKeys = new KeyPairJson[keyPairs.size()];
        for(int i = 0; i < keyPairs.size(); i++) {
            outKeys[i] = new KeyPairJson(keyPairs.get(i).getPrivateKey(), keyPairs.get(i).getPublicKey(), keyPairs.get(i).getAmount());
        }
        return outKeys;
    }


    // send currency
    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/currency") // setting up the url location
    public CurrencyJson getCurrency(@RequestParam(value = "name", defaultValue = "Bitcoin") String name) {


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
        }
    } // accessed through: http://localhost:8080/currency?name=CurrencyName



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
                return new TextResponse("success", counter.incrementAndGet());
            }
            return new TextResponse("Insufficient balance", 0);

        } catch (IllegalArgumentException e) {

            return new TextResponse("Invalid currency name", -1);
        }
    } // accessed through: http://localhost:8080/send?name=Bitcoin&amount=0.5&address=xxxxxxxxxxx



    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/records") // setting up the url location
    public RecordsJson getRecords(@RequestParam(value = "name", defaultValue = "Bitcoin") String name) {
        // todo temporary "hacks" to avoid null pointers
        this.runHelpers();
        try {
            CurrencyInWallet currency = Wallet.getInstance().getCurrencyInWallet(CryptoCurrency.valueOf(name));
            ArrayList<TransactionRecord> transactions = new ArrayList<>();
            return new RecordsJson(currency.getTransactionRecords(), name);

        } catch (IllegalArgumentException e) {
            return new RecordsJson(null, "Invalid Name");
        }
    } // accessed through: http://localhost:8080/records?name=Bitcoin

}