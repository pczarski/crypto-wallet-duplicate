package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Chainlink extends CurrencyInWallet {
    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Chainlink(boolean isToSet) {
        super(privLen, pubLen, CryptoCurrency.LINK, isToSet);
        if(this.isToSet()) {
            this.addTestReceive(14, 1);
        }
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}