package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Ethereum extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Ethereum(boolean isToSet) {
        super(privLen, pubLen, CryptoCurrency.ETH, isToSet);

        if(this.isToSet()) {
            this.addTestReceive(12, 280);
        }
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}