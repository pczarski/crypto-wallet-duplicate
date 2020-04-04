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
//            MarketPrice[] response = (MarketPrice[]) restService.getPostsAsObject(PRICE_URL_BASE+"BTC"+"USDT");
//            System.out.println(Arrays.toString(response));
            //todo
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(PRICE_URL_BASE + "BTCUSDT", String.class);
            System.out.println(response.toString());

        } catch (Exception e) {
            System.out.println(e.toString());
        }
        this.setMarketPrice(100.0);
    }
}
// https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT

class MarketPrice extends Post {
    private String symbol;
    private String price;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public MarketPrice(String symbol, String price) {
        this.symbol = symbol;
        this.price = price;
    }
}