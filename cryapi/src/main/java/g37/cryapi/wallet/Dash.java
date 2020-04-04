package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Dash extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Dash() {
        super(privLen, pubLen, CryptoCurrency.DASH);
        this.addTestReceive(9, 10);
    }

    @Override
    public double getPrice() {
        return 103.2;
    }


    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}