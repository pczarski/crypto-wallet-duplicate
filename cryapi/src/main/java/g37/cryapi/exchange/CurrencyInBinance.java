package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;
import org.springframework.web.client.RestTemplate;

import java.io.Serializable;

public class CurrencyInBinance extends CurrencyInExchange {

    private static final String PRICE_URL_BASE = "https://api.binance.com/api/v3/ticker/price?symbol=";

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

    }// JUST A MARKER TO SEE CHANGES

    @Override
    public void updateMarketPrice() {
        try {
//            RestTemplate restTemplate = this.getRestTemplate();
//            MarketPriceBinance marketPrice = restTemplate.getForObject(PRICE_URL_BASE + this.getName()+"USDT", MarketPriceBinance.class);
//            System.out.println(marketPrice.getPrice() + marketPrice.getSymbol());
            this.setMarketPrice(getMarketPriceIn(CryptoCurrency.USDT));

        } catch (Exception e) {
            if (this.getMarketPrice() == null) {
                this.setMarketPrice(1.0);
            }
            System.out.println(e.toString());
            System.out.println("from currency: " + this.getName().toString());
        }
    }

    @Override
    public double getMarketPriceIn(CryptoCurrency currencyIn) {
            RestTemplate restTemplate = this.getRestTemplate();
            MarketPriceBinance marketPrice = restTemplate.getForObject(PRICE_URL_BASE + this.getName() + currencyIn.toString(), MarketPriceBinance.class);
            return marketPrice.getPrice();
    }
}
// https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT

class MarketPriceBinance implements Serializable {
    private String symbol;
    private double price;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
// JUST A MARKER TO SEE CHANGES