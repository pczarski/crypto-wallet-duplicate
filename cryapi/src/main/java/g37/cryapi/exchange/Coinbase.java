package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public class Coinbase extends ExchangeAccess {

    public Coinbase(String apiKey) {
        super(apiKey, ExchangeName.Coinbase);
    }

    @Override
    public void depositCurrency(CryptoCurrency currency, double amount) {

    }

    @Override
    public void withdrawCurrency(CryptoCurrency currency, double amount) {

    }

    @Override
    public void withdrawAll() {

    }

    @Override
    public Order makeSellOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price) {
        return null;
    }

    @Override
    public Order makeBuyOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price) {
        return null;
    }

    @Override
    public Order makeExchangeOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount) {
        return null;
    }
}