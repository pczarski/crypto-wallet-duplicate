package g37.cryapi.wallet;
import cry.lib.KeyGenerator;
import g37.cryapi.common.CryptoCurrency;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

public class Wallet {

	private static final Wallet instance = new Wallet();
	private String recoveryPhrase;
	private ArrayList<CurrencyInWallet> currencyInWallets;
	private Boolean isSetup = false;

	private Wallet() {
		// TODO - implement Wallet.Walle
	}

	public void setUpNew(){
		this.assignRecoveryPhrase();
		this.setUpCurrencies();
		this.isSetup = true;
	}

	private void setUpCurrencies(){
		currencyInWallets = new ArrayList<CurrencyInWallet>();
		currencyInWallets.add(new Bitcoin());
		currencyInWallets.add(new Ethereum());
		currencyInWallets.add(new Litecoin());
		currencyInWallets.add(new Tether());
		currencyInWallets.add(new Dash());
	}

	private void recoverCurrencies() {
		// todo: for now we'll just set up
		this.setUpCurrencies();
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
		this.recoverCurrencies();
		this.isSetup = true;
	}

	public static Wallet getInstance() {
		return instance;
	}

	public String getRecoveryPhrase() {
		return this.recoveryPhrase;
	}


	public void activateCurrency(CryptoCurrency currency) {
		// TODO - implement Wallet.activateCurrency
		throw new UnsupportedOperationException();
	}

	public boolean getIsSetUp() {
		return this.isSetup;
	}


	public void sendCoins(String publicKey, double Amount, CurrencyInWallet currency) {
		// TODO - implement Wallet.sendCoins
		throw new UnsupportedOperationException();
	}

	public CurrencyInWallet getCurrencyInWallet(CryptoCurrency currency) {
		for (int i = 0; i < this.currencyInWallets.size(); i++) {
			CurrencyInWallet currencyInWallet = this.currencyInWallets.get(i);
			if(currency == currencyInWallet.getName()){
				return currencyInWallet;
			}
		}
		throw new IllegalStateException();
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