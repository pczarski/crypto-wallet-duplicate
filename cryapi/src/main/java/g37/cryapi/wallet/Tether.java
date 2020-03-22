package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Tether extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Tether() {
        super(privLen, pubLen, CryptoCurrency.Tether);
    }

    @Override
    public double getPrice() {
        return 1.01;
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {
        key.setAmount(Math.random() * 8);
    }

    @Override
    public void send(String address, double amount) {

    }
}