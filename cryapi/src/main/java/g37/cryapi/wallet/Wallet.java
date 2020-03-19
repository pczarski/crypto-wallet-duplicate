package g37.cryapi.wallet;
import cry.lib.KeyGenerator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

public class Wallet {

	private static final Wallet instance = new Wallet();
	private String recoveryPhrase;
	private ArrayList<CurrencyInWallet> currencyInWallets;

	private Wallet() {
		// TODO - implement Wallet.Walle
	}

	public void setUpNew(){
		this.assignRecoveryPhrase();
		this.setUpCurrencies();
	}

	private void setUpCurrencies(){
		currencyInWallets.add(new Bitcoin());
		currencyInWallets.add(new Ethereum());
		currencyInWallets.add(new Litecoin());
		currencyInWallets.add(new Tether());
		currencyInWallets.add(new Dash());
	}

	private void assignRecoveryPhrase(){
		try {
			this.recoveryPhrase = KeyGenerator.generateSeed();
		}
		catch (IOException e) {
			System.out.println("Failed to generate a Key");
			this.recoveryPhrase = "test test test test test test test test test test test test";
		}
	}

	public void recoverWallet(String recoverPhrase) {
		this.recoveryPhrase = recoverPhrase;
	}

	private void updateBalances() {
		// TODO - implement Wallet.updateBalances
		throw new UnsupportedOperationException();
	}

	public static Wallet getInstance() {
		return instance;
	}

	public void changePassword(String newPassword) {
		// TODO - implement Wallet.changePassword
		throw new UnsupportedOperationException();
	}

	public String getRecoveryPhrase() {
		return this.recoveryPhrase;
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