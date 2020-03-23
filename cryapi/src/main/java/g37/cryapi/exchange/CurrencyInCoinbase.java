package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public class CurrencyInCoinbase extends CurrencyInExchange {
    public CurrencyInCoinbase(CryptoCurrency name) {
        super(name);
    }

    @Override
    public void updateMarketPrice() {

    }


    @Override
    public double getMarketPrice() {
        return 0;
    }

    @Override
    public String getCurrentPublicKey() {
        return null;
    }

    @Override
    public void updateBalance() {

    }

    @Override
    public boolean send(String address, double amount) {
        return false;
    }

    public CryptoCurrency getCurrencyName() {
        return null;
    }

}