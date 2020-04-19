package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class KyberNetwork extends CurrencyInWallet {
    private static final int privLen = 24;
    private static final int pubLen = 33;

    public KyberNetwork(boolean isToSet) {
        super(privLen, pubLen, CryptoCurrency.KNC, isToSet);
        if(this.isToSet()) {
            this.addTestReceive(6, 20);
        }
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}
