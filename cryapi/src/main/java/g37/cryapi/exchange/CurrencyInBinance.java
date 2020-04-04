package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.exchange.api.Post;
import g37.cryapi.exchange.api.RestService;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.Serializable;
import java.util.Arrays;

public class CurrencyInBinance extends CurrencyInExchange {

    private static final String PRICE_URL_BASE = "https://api.binance.com/api/v3/ticker/price?symbol=";
    private RestService restService;

    public CurrencyInBinance(CryptoCurrency name) {
        super(name);
        restService = new RestService(new RestTemplateBuilder());
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
        try {
            RestTemplate restTemplate = new RestTemplate();
            MarketPrice marketPrice = restTemplate.getForObject(PRICE_URL_BASE + this.getName()+"USDT", MarketPrice.class);
            System.out.println(marketPrice.getPrice() + marketPrice.getSymbol());
            this.setMarketPrice(marketPrice.getPrice());

        } catch (Exception e) {
            System.out.println(e.toString());
            this.setMarketPrice(-1.0);
        }
    }
}
// https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT

class MarketPrice implements Serializable {
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
