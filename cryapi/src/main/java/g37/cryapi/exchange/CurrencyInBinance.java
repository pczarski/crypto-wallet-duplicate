package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;
import org.springframework.web.client.RestTemplate;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class CurrencyInBinance extends CurrencyInExchange {

    private Map<CryptoCurrency, String> symbolList;

    private static final String PRICE_URL_BASE = "https://api.binance.com/api/v3/ticker/price?symbol=";

    public CurrencyInBinance(CryptoCurrency name, ExchangeAccess exchangeAccess) {
        super(name, exchangeAccess);
    }

    private void SetupSymbolList() {
        symbolList = new HashMap<CryptoCurrency, String>();
       // symbolList.put();
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
            RestTemplate restTemplate = this.getRestTemplate();
            String url = PRICE_URL_BASE + this.getName()+"USDT";
            MarketPriceBinance marketPrice = restTemplate.getForObject(url, MarketPriceBinance.class);
            System.out.println(marketPrice.getPrice() + marketPrice.getSymbol());
            this.setMarketPrice(marketPrice.getPrice());

        } catch (Exception e) {
            if (this.getMarketPrice() == null) {
                this.setMarketPrice(1.0);
            }
            System.out.println(e.toString());
            System.out.println("from currency: " + this.getName().toString());
        }
    }

    @Override
    // todo we have to consider making BTC and USDT a subclass here to follow oop principles
    public double getMarketPriceIn(CryptoCurrency currencyIn) {
        if(this.getName().getName().equals(currencyIn.getName())) {
            return 1.0;
        }
        RestTemplate restTemplate = this.getRestTemplate();
        String url;

        if (this.getName() == CryptoCurrency.BTC) {
            url = PRICE_URL_BASE + currencyIn.toString() + "BTC";
            MarketPriceBinance marketPrice = restTemplate.getForObject(url, MarketPriceBinance.class);
            return 1.0 / marketPrice.getPrice();
        } else {
            url = PRICE_URL_BASE + this.getName() + "BTC";
            System.out.println(url);
            MarketPriceBinance marketPrice = restTemplate.getForObject(url, MarketPriceBinance.class);
            if (currencyIn == CryptoCurrency.BTC) {
                return marketPrice.getPrice();
            } else {
                url = PRICE_URL_BASE + currencyIn.toString() + "BTC";
                MarketPriceBinance currencyInMarketPrice = restTemplate.getForObject(url, MarketPriceBinance.class);
                return marketPrice.getPrice() / currencyInMarketPrice.getPrice();
            }
        }
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