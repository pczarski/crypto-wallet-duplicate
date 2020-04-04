package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.Serializable;
import java.util.Map;

public class CurrencyInCoinbase extends CurrencyInExchange {

    private static final String PRICE_URL_BASE = "https://api.coinbase.com/v2/prices/";

    public CurrencyInCoinbase(CryptoCurrency name) {
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
        try {
            RestTemplate restTemplate = this.getRestTemplate();
//            ResponseEntity<String> response = restTemplate.getForEntity(PRICE_URL_BASE + this.getName() + "-USD/spot", String.class);
//            System.out.println(response.toString());
            String url = PRICE_URL_BASE + this.getName() + "-USD/spot";
            MarketPriceCoinbase marketPrice = restTemplate.getForObject(url, MarketPriceCoinbase.class);
            double value = Double.parseDouble(marketPrice.getData().get("amount"));
            this.setMarketPrice(value);
        } catch (Exception e) {
            System.out.println(e.toString());
            this.setMarketPrice(1.0);
        }
    }
} //https://api.coinbase.com/v2/prices/BTC-USD/spot

class MarketPriceCoinbase implements Serializable {

    public Map<String, String> getData() {
        return data;
    }

    public void setData(Map<String, String> data) {
        this.data = data;
    }

    private Map<String, String> data;
}