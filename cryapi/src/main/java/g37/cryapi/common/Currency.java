package g37.cryapi.common;

public abstract class Currency {
    private double balance;
    private final CryptoCurrency name;

    public Currency(CryptoCurrency name) {
        this.name = name;
        this.balance = 0;
    }

    public abstract String getCurrentPublicKey();
    public abstract void updateBalance();
    public abstract boolean send(String address, double amount);


    public double getBalance() {
        this.updateBalance();
        return this.balance;
    };

    public CryptoCurrency getName() {
        return this.name;
    }

    protected void setBalance(double value) {
        this.balance = value;
    }
}
