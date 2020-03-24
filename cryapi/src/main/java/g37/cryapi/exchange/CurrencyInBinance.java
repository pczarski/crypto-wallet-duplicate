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
        this.setBalance(100.0);
    }

    @Override
    public boolean send(String address, double amount) {
        return false;
    }


    @Override
    public void updateMarketPrice() {
        this.setMarketPrice(100.0);
    }
}