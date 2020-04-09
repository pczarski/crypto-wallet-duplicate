package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Tether extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Tether() {
        super(privLen, pubLen, CryptoCurrency.USDT);
        this.addTestReceive(4, 3000);
    }

    @Override
    public Double getPrice() {
        return 1.01;
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}