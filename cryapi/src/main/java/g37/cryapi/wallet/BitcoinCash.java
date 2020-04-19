package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class BitcoinCash extends CurrencyInWallet {
    private static final int privLen = 24;
    private static final int pubLen = 33;

    public BitcoinCash(boolean isToSet) {
        super(privLen, pubLen, CryptoCurrency.DASH, isToSet);
        if(this.isToSet()) {
            this.addTestReceive(8, 30);
        }
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}
