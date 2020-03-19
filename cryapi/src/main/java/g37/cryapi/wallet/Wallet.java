package g37.cryapi.wallet;
import java.util.Collection;

public class Wallet {

	private static final Wallet instance = new Wallet();
	private String recoveryPhrase;

	private Wallet() {
		// TODO - implement Wallet.Wallet
	}

	private static String generateRecoveryPhrase() {
		// todo call a function from the library
        return "";
	}

	private void updateBalances() {
		// TODO - implement Wallet.updateBalances
		throw new UnsupportedOperationException();
	}

	public Wallet getInstance() {
		return instance;
	}

	public void changePassword(String newPassword) {
		// TODO - implement Wallet.changePassword
		throw new UnsupportedOperationException();
	}

	public String getRecoveryPhrase() {
		return this.recoveryPhrase;
	}

	public void recoverWallet(String recoverPhrase) {
		// TODO - implement Wallet.recoverWallet
		throw new UnsupportedOperationException();
	}

	public void activateCurrency(CryptoCurrency currency) {
		// TODO - implement Wallet.activateCurrency
		throw new UnsupportedOperationException();
	}


	public void sendCoins(String publicKey, double Amount, CurrencyInWallet currency) {
		// TODO - implement Wallet.sendCoins
		throw new UnsupportedOperationException();
	}

	public CurrencyInWallet getCurrencyInWallet(CryptoCurrency currency) {
		// TODO - implement Wallet.getCurrencyInWallet
		throw new UnsupportedOperationException();
	}

	public double getTotalBalance(CryptoCurrency displayCurrency) {
		// TODO - implement Wallet.getTotalBalance
		throw new UnsupportedOperationException();
	}

	public Collection<TransactionRecord> getTransactionHistory() {
		// TODO - implement Wallet.getTransactionHistory
		throw new UnsupportedOperationException();
	}

}