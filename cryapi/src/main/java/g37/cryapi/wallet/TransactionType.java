package g37.cryapi.wallet;

public enum TransactionType {
    SEND("send"),
    RECEIVE("receive");

    private final String name;

    public String getName() { return this.name; }

    TransactionType(String name) { this.name = name; }
}
