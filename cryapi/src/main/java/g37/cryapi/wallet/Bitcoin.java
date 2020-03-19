package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Bitcoin extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 32;

    public Bitcoin() {
        super(privLen, pubLen, CryptoCurrency.Bitcoin);
    }

    @Override
    public double getPrice() {
        return 23.11;
    }


    @Override
    public void updateBalance(){
        this.setBalance(99.11);
    }

    @Override
    public void send(String address, double amount) {

    }
}