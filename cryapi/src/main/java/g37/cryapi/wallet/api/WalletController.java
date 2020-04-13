package g37.cryapi.wallet.api;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Arrays;
import java.util.concurrent.atomic.AtomicLong;

import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.common.TextResponse;
import g37.cryapi.wallet.Bitcoin;
import g37.cryapi.wallet.CurrencyInWallet;
import g37.cryapi.wallet.KeyPair;
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

    }// http://localhost:8080/new-wallet?type=new

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/seed") // setting up the url location
    public WalletJson getWallet() {
        if (!Wallet.getInstance().getIsSetUp()) {
            Wallet.getInstance().setUpNew();
        }

        // todo: example for saving stuff
//        try
//        {
//            KeyPair pair = Wallet.getInstance().getCurrencyInWallet(CryptoCurrency.BTC).getKeyPairs().get(0);
//            FileOutputStream myFileOutputStream = new FileOutputStream("pair.ser");
//            ObjectOutputStream myObjectOutputStream = new ObjectOutputStream(myFileOutputStream);
//            myObjectOutputStream.writeObject(pair);
//            myObjectOutputStream.close();
//        }
//        catch (Exception e)
//        {
//            System.out.println("fuck off:  "+e.toString());
//        }
//
//        try
//        {
//            FileInputStream myFileInputStream = new FileInputStream("pair.ser");
//            ObjectInputStream myObjectInputStream = new ObjectInputStream(myFileInputStream);
//            KeyPair hiTest= (KeyPair) myObjectInputStream.readObject();
//            myObjectInputStream.close();
//            System.out.println(hiTest.getPublicKey());
//            System.out.println(hiTest.getAmount());
//            System.out.println(hiTest.getTransactions().get(0).getTime());
//        }
//        catch (Exception e)
//        {
//            System.out.println("fuck off:  "+e.toString());
//        }

        // get wallet instance
        Wallet wallet = Wallet.getInstance();
        return new WalletJson(wallet.getRecoveryPhrase());
    }
}



// accessed through:  {or pass existing seed as argument, as opposed to "new"}