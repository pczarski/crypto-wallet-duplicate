package g37.cryapi.exchange.api;

public class CurrencyInExchangeJson {
    private final String name;
    private final String code;
    private final String exchangeName;
    private final String currentPublicKey;
    private final double balance;
    private final double price;

    public CurrencyInExchangeJson(String name, String code, String exchangeName, String currentPublicKey, double balance, double price) {
        this.name = name;
        this.exchangeName = exchangeName;
        this.currentPublicKey = currentPublicKey;
        this.balance = balance;
        this.price = price;
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public String getExchangeName() {
        return exchangeName;
    }

    public String getCurrentPublicKey() {
        return currentPublicKey;
    }

    public double getBalance() {
        return balance;
    }

    public double getPrice() { return price; }

}
