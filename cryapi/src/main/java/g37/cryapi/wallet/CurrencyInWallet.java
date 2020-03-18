package g37.cryapi.wallet;

import java.util.Collection;

public abstract class CurrencyInWallet {

	private double balance;
	private boolean active;

	public abstract double getPrice();

	public abstract String getCurrentPublicKey();

	public abstract double getBalance();

	public abstract void updateBalance();

	public abstract void send(String address, double amount);

	public Collection<KeyPair> getKeyPairs() {
		// TODO - implement CurrencyInWallet.getKeyPairs
		throw new UnsupportedOperationException();
	}

	public Collection<TransactionRecord> getTransactionRecords() {
		// TODO - implement CurrencyInWallet.getTransactionRecords
		throw new UnsupportedOperationException();
	}

	public CryptoCurrency getName() {
		// TODO - implement CurrencyInWallet.getName
		throw new UnsupportedOperationException();
	}

}