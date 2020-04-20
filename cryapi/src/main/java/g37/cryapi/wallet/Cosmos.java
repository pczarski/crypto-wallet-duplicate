package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Cosmos extends CurrencyInWallet {
    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Cosmos(boolean isToSet) {
        super(privLen, pubLen, CryptoCurrency.ATOM, isToSet);
        if(this.isToSet()) {
            this.addTestReceive(16, 2);
        }
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}