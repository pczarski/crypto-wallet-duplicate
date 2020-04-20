package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class EthereumClassic extends CurrencyInWallet {
    private static final int privLen = 24;
    private static final int pubLen = 33;

    public EthereumClassic(boolean isToSet) {
        super(privLen, pubLen, CryptoCurrency.ETC, isToSet);
        if(this.isToSet()) {
            this.addTestReceive(8, 10);
        }
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}
