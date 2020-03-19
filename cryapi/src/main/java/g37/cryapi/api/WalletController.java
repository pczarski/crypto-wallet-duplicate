package g37.cryapi.api;
import java.util.concurrent.atomic.AtomicLong;

import g37.cryapi.wallet.Wallet;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Controller that handles the GET request and returns an appropriate object (factory design pattern)
// it will return all the getParameter() functions to the json object
@RestController
public class WalletController {

    private final int MIN_SEED_LEN = 24; // TODO: I don't know what is the actual minimum

    private final AtomicLong counter = new AtomicLong();

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/new-wallet") // setting up the url location
    public WalletJson createNew(@RequestParam(value = "type", defaultValue = "new") String name) {

        // get wallet instance
        Wallet wallet = Wallet.getInstance();

        // new wallet: initiate wallet and return the wallet Json
        if(name.equals("new")) {
            wallet.setUpNew();
            return new WalletJson(wallet.getRecoveryPhrase());
        }

        //trash value return null
        if (name.length() < MIN_SEED_LEN) {
            return new WalletJson("Bad Request");
        }

        //otherwise recover wallet from seed and return
        wallet.recoverWallet(name);
        return new WalletJson(wallet.getRecoveryPhrase());

    }
}

// accessed through: http://localhost:8080/new-wallet?type=new {or pass existing seed as argument}