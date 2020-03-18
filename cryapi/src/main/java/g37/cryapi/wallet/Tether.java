package g37.cryapi.wallet;

public class Tether extends CurrencyInWallet {

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