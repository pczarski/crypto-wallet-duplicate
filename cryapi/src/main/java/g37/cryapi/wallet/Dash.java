package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class Dash extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 32;

    public Dash() {
        super(privLen, pubLen, CryptoCurrency.Dash);
    }

    @Override
    public double getPrice() {
        return 103.2;
    }

    @Override
    public void updateBalance(){
        this.setBalance(12.33);
    }

    @Override
    public void send(String address, double amount) {

    }
}