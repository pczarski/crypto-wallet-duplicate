package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Bitcoin extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Bitcoin(boolean isToSet) {
        super(privLen, pubLen, CryptoCurrency.BTC, isToSet);

        // todo temporary for tests
        if(this.isToSet()) {
            this.addTestReceive(12, 30);
        }
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {
    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }

}