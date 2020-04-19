package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Ripple extends CurrencyInWallet {
    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Ripple(boolean isToSet) {
        super(privLen, pubLen, CryptoCurrency.XRP, isToSet);
        if(this.isToSet()) {
            this.addTestReceive(3, 80);
        }
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}
