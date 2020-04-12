package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public class Coinbase extends ExchangeAccess {

    public Coinbase(String apiKey) {
        super(apiKey, ExchangeName.Coinbase, new CoinbaseOrderHandler());
    }


    @Override
    public void withdrawCurrency(CryptoCurrency currency, double amount) {

    }

    @Override
    protected void addSupportedCurrencies() {
        for(CryptoCurrency currency: CryptoCurrency.values()) {
            this.addCurrency(new CurrencyInCoinbase(currency, this));
        }
    }

    @Override
    public void withdrawAll() {

    }
}