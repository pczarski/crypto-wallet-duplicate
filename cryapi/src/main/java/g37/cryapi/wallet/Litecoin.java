package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Litecoin extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 32;

    public Litecoin() {
        super(privLen, pubLen, CryptoCurrency.Litecoin);
    }


    @Override
    public double getPrice() {
        return 50.1;
    }

    @Override
    public void updateBalance(){
        this.setBalance(102.3);
    }

    @Override
    public void send(String address, double amount) {

    }
}