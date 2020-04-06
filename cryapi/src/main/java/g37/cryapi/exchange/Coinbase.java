package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public class Coinbase extends ExchangeAccess {

    public Coinbase(String apiKey) {
        super(apiKey, ExchangeName.Coinbase);
    }


    @Override
    public void withdrawCurrency(CryptoCurrency currency, double amount) {

    }

    @Override
    public void withdrawAll() {

    }
}