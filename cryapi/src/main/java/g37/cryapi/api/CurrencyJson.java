package g37.cryapi.api;

// class that is used to create an JSON object sent with the GET requests
public class CurrencyJson {
    private final String name;
    private final double price;
    private final double balance;
    private final String currentPublicKey;
    private final KeyPairJson[] keyPairs;

    public CurrencyJson(String name, double balance, double price, String currentPublicKey, KeyPairJson[] keyPairs) {
        this.balance = balance;
        this.name = name;
        this.currentPublicKey = currentPublicKey;
        this.keyPairs = keyPairs;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public double getPrice() { return price; }

    public double getBalance() {
        return balance;
    }

    public String getCurrentPublicKey() { return currentPublicKey; }

    public KeyPairJson[] getKeyPairs() {
        return keyPairs;
    }

}

class KeyPairJson {

    private final String privateKey;
    private final String publicKey;
    private final double balance;

    public KeyPairJson(String privateKey, String publicKey, double balance) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.balance = balance;
    }

    public String getPrivateKey() {
        return this.privateKey;
    }

    public String getPublicKey() {
        return this.publicKey;
    }

    public double getBalance() { return this.balance; }
}