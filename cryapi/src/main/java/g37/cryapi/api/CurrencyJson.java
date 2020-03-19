package g37.cryapi.api;

// class that is used to create an JSON object sent with the GET requests
public class CurrencyJson {
    private final double balance;
    private final String name;
    private final KeyPairJson[] keyPairs;
    private final double price;

    public CurrencyJson(String name, double balance, double price, KeyPairJson[] keyPairs) {
        this.balance = balance;
        this.name = name;
        this.keyPairs = keyPairs;
        this.price = price;
    }

    public double getBalance() {
        return balance;
    }

    public String getName() {
        return name;
    }

    public double getPrice() { return price; }

    public KeyPairJson[] getKeyPairs() {
        return keyPairs;
    }

}

class KeyPairJson {

    private final String privateKey;
    private final String publicKey;

    public KeyPairJson(String privateKey, String publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    public String getPrivateKey() {
        return this.privateKey;
    }

    public String getPublicKey() {
        return this.publicKey;
    }
}