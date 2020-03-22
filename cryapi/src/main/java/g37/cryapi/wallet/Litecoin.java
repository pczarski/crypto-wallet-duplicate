package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Litecoin extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 33;

    public Litecoin() {
        super(privLen, pubLen, CryptoCurrency.Litecoin);
    }


    @Override
    public double getPrice() {
        return 50.1 + Math.random();
    }

    @Override
    protected void updateKeyBalance(KeyPair key) {

        //todo: temporary
        if(this.isSet < 6) {
            key.setAmount(Math.random() * 8);
            this.isSet++;
        }
    }

    @Override
    protected void performSend(KeyPair pair, String addressTo, double amount) {

    }
}