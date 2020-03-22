package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

import java.util.Random;

public class Bitcoin extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Bitcoin() {
        super(privLen, pubLen, CryptoCurrency.Bitcoin);
    }

    @Override
    public double getPrice() {
        return 9000.11;
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

        // todo temporary
        if (this.isSet < 12){
            key.setAmount(Math.random() * 2);
            this.isSet++;
        }
    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }

}