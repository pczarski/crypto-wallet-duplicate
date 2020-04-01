package g37.cryapi.api;

public class WalletJson {
    private final String seedPhrase;

    public WalletJson(String seedPhrase) {
        this.seedPhrase = seedPhrase;
    }

    public String getSeedPhrase() {
        return this.seedPhrase;
    }

}
