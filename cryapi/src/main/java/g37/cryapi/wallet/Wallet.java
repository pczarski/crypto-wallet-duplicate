package g37.cryapi.wallet;
import java.util.Collection;

public class Wallet {

	private Wallet instance;
	private String recoveryPhrase;
	private String password;

	private Wallet() {
		// TODO - implement Wallet.Wallet
		throw new UnsupportedOperationException();
	}

	private void updateBalances() {
		// TODO - implement Wallet.updateBalances
		throw new UnsupportedOperationException();
	}

	public Wallet getInstance() {
		return this.instance;
	}

	/**
	 * 
	 * @param newPassword
	 */
	public void changePassword(String newPassword) {
		// TODO - implement Wallet.changePassword
		throw new UnsupportedOperationException();
	}

	public String getRecoveryPhrase() {
		return this.recoveryPhrase;
	}

	/**
	 * 
	 * @param recoverPhrase
	 */
	public void recoverWallet(String recoverPhrase) {
		// TODO - implement Wallet.recoverWallet
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param currency
	 */
	public void activateCurrency(CryptoCurrency currency) {
		// TODO - implement Wallet.activateCurrency
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param publicKey
	 * @param Amount
	 * @param currency
	 */
	public void sendCoins(String publicKey, double Amount, CurrencyInWallet currency) {
		// TODO - implement Wallet.sendCoins
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param currency
	 */
	public CurrencyInWallet getCurrencyInWallet(CryptoCurrency currency) {
		// TODO - implement Wallet.getCurrencyInWallet
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param displayCurrency
	 */
	public double getTotalBalance(CryptoCurrency displayCurrency) {
		// TODO - implement Wallet.getTotalBalance
		throw new UnsupportedOperationException();
	}

	public void authenticate() {
		// TODO - implement Wallet.authenticate
		throw new UnsupportedOperationException();
	}

	public Collection<TransactionRecord> getTransactionHistory() {
		// TODO - implement Wallet.getTransactionHistory
		throw new UnsupportedOperationException();
	}

}