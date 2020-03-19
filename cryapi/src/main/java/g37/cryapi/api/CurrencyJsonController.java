package g37.cryapi.api;

import g37.cryapi.wallet.Bitcoin;
import g37.cryapi.wallet.CurrencyInWallet;
import g37.cryapi.wallet.KeyPair;
import g37.cryapi.wallet.Wallet;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import g37.cryapi.common.CryptoCurrency;

import java.util.Collection;
import java.util.List;

// Controller that handles the GET request and returns an appropriate object (factory design pattern)
// it will return all the getParameter() functions to the json object
@RestController
public class CurrencyJsonController {

    private KeyPairJson[] convertToKeyPairJson(List<KeyPair> keyPairs) {
        KeyPairJson[] outKeys = new KeyPairJson[keyPairs.size()];
        for(int i = 0; i < keyPairs.size(); i++) {
            outKeys[i] = new KeyPairJson(keyPairs.get(i).getPrivateKey(), keyPairs.get(i).getPublicKey());
        }
        return outKeys;
    }

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/currency") // setting up the url location
    public CurrencyJson sendCurrency(@RequestParam(value = "name", defaultValue = "Bitcoin") String name) {

        // todo temporary "hack" to avoid null pointers
        Wallet wallet = Wallet.getInstance();
        if(!wallet.getIsSetUp()) {
            wallet.setUpNew();
        }

        try {
            CurrencyInWallet currency = wallet.getCurrencyInWallet(CryptoCurrency.valueOf(name));
            return new CurrencyJson(
                    currency.getName().getName(),
                    currency.getBalance(),
                    currency.getPrice(),
                    this.convertToKeyPairJson(currency.getKeyPairs())
            );
        }
        catch (IllegalArgumentException e) {
            return new CurrencyJson("Invalid name", -1, -1, null);
        }
    }
}

// accessed through: http://localhost:8080/currency?name=CurrencyName