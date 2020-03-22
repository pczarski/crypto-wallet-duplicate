package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Dash extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Dash() {
        super(privLen, pubLen, CryptoCurrency.Dash);
    }

    @Override
    public double getPrice() {
        return 103.2;
    }


    @Override
    protected void updateKeyBalance(KeyPair key) {
        key.setAmount(Math.random() * 3);
    }

    @Override
    public void send(String address, double amount) {

    }
}