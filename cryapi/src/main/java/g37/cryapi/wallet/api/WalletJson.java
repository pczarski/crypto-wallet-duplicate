package g37.cryapi.wallet.api;

import java.io.Serializable;

public class WalletJson implements Serializable {
    private final String seedPhrase;

    public WalletJson(String seedPhrase) {
        this.seedPhrase = seedPhrase;
    }

    public String getSeedPhrase() {
        return this.seedPhrase;
    }

}
