package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public class Binance extends ExchangeAccess {

    public Binance(String apiKey) {
        super(apiKey, ExchangeName.Binance);
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