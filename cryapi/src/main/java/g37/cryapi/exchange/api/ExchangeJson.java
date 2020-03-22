package g37.cryapi.exchange.api;

public class ExchangeJson {
    private final String exchangeName;
    private final String apiKey;

    public ExchangeJson(String exchangeName, String apiKey) {
        this.exchangeName = exchangeName;
        this.apiKey = apiKey;
    }

    public String getExchangeName() {
        return this.exchangeName;
    }

    public String getApiKey() {
        return apiKey;
    }
}
