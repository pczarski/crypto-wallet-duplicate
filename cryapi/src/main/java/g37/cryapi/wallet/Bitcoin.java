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
        key.setAmount(Math.random() * 2);
    }

    @Override
    public void send(String address, double amount) {

    }
}