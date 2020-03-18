package g37.cryapi.api;

// class that is used to create an JSON object sent with the GET requests
public class CurrencyJson {
    private final long id;
    private final double balance;
    private final String name;

    public CurrencyJson(long id, double balance, String name) {
        this.id = id;
        this.balance = balance;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public double getBalance() {
        return balance;
    }

    public String getName() {
        return name;
    }
}
