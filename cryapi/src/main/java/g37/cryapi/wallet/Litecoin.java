package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Litecoin extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Litecoin() {
        super(privLen, pubLen, CryptoCurrency.Litecoin);
    }


    @Override
    public double getPrice() {
        return 50.1;
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {
        key.setAmount(Math.random() * 7);
    }

    @Override
    public void send(String address, double amount) {

    }
}