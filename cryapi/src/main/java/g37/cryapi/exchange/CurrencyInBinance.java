package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public class CurrencyInBinance extends CurrencyInExchange {

    public CurrencyInBinance(CryptoCurrency name) {
        super(name);
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


    @Override
    public void updateMarketPrice() {

    }
}