package g37.cryapi.exchange.api;

public class CurrencyInExchangeJson {
    private final String name;
    private final String exchangeName;
    private final String publicAddress;
    private final double balance;
    private final double marketPrice;

    public CurrencyInExchangeJson(String name, String exchangeName, String publicAddress, double balance, double marketPrice) {
        this.name = name;
        this.exchangeName = exchangeName;
        this.publicAddress = publicAddress;
        this.balance = balance;
        this.marketPrice = marketPrice;
    }

    public String getName() {
        return name;
    }

    public String getExchangeName() {
        return exchangeName;
    }

    public String getPublicAddress() {
        return publicAddress;
    }

    public double getBalance() {
        return balance;
    }

    public double getMarketValue() { return marketPrice; }

}
