package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Litecoin extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Litecoin(boolean isToSet) {
        super(privLen, pubLen, CryptoCurrency.LTC, isToSet);
        if(isToSet()){
            this.addTestReceive(3, 500);
        }
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}