package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public class CurrencyInBinance extends CurrencyInExchange {

    public CurrencyInBinance(CryptoCurrency name) {
        super(name);
    }

    @Override
    public String getCurrentPublicKey() {
        return this.getName().getName() + "_TEST_KEY_XX";
    }

    @Override
    public void updateBalance() {

    }

    @Override
    protected void performSend(String address, double amount) {

    }

    @Override
    public void updateMarketPrice() {
        this.setMarketPrice(100.0);
    }
}