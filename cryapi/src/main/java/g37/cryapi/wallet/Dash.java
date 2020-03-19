package g37.cryapi.wallet;

public class Dash extends CurrencyInWallet {

    private static final int privLen = 24;
    private static final int pubLen = 32;

    public Dash() {
        super(privLen, pubLen);
    }

    @Override
    public double getPrice() {
        return 0;
    }

    @Override
    public String getCurrentPublicKey() {
        return null;
    }

    @Override
    public double getBalance() {
        return 0;
    }

    @Override
    public void updateBalance() {

    }

    @Override
    public void send(String address, double amount) {

    }
}