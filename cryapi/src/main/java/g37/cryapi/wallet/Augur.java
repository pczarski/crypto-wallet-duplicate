package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Augur extends CurrencyInWallet {
    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Augur(boolean isToSet) {
        super(privLen, pubLen, CryptoCurrency.REP, isToSet);
        if(this.isToSet()) {
            this.addTestReceive(8, 50);
        }
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}