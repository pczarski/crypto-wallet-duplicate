package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public class CurrencyInCoinbase implements CurrencyInExchange {
    @Override
    public double getAmount() {
        return 0;
    }

    @Override
    public double getMarketPrice() {
        return 0;
    }

    @Override
    public CryptoCurrency getCurrencyName() {
        return null;
    }

    @Override
    public String getPublicKey() {
        return null;
    }

    @Override
    public void updateMarketPrice() {

    }
}