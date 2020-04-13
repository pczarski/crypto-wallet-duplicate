package g37.cryapi.wallet;
import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.lib.KeyGenerator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

public class Wallet {

	private static final Wallet instance = new Wallet();
	private String recoveryPhrase;
	private ArrayList<CurrencyInWallet> currencyInWallets;
	private Boolean isSetup = false;

	private Wallet() {
	}

	public void setUpNew(){
		this.assignRecoveryPhrase();
		this.setUpCurrencies();
		this.isSetup = true;
	}

	private void setUpCurrencies(){
		//todo make coin factory instead and loop through the enum to follow better practises
		currencyInWallets = new ArrayList<>();
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

	public CurrencyInWallet getCurrencyInWallet(CryptoCurrency currency) {
		for (int i = 0; i < this.currencyInWallets.size(); i++) {
			CurrencyInWallet currencyInWallet = this.currencyInWallets.get(i);
			if(currency == currencyInWallet.getName()){
				return currencyInWallet;
			}
		}
		throw new IllegalStateException();
	}

	public double valueIn(CryptoCurrency c1, CryptoCurrency c2) {
		CurrencyInWallet currencyInWallet = this.getCurrencyInWallet(c1);
		CurrencyInWallet currencyInWallet2 = this.getCurrencyInWallet(c2);
		return currencyInWallet.getPrice()/currencyInWallet2.getPrice();
	}

	public ArrayList<CurrencyInWallet> getCurrenciesInWallet() {
		return this.currencyInWallets;
	}

	public double getTotalBalance(CryptoCurrency displayCurrency) {
		CurrencyInWallet currencyIn = this.getCurrencyInWallet(displayCurrency);
		double value = 0;
		for (CurrencyInWallet currency: this.currencyInWallets) {
			value += currency.getPriceIn(currencyIn) * currency.getBalance();
		}
		return value;
	}

	public Collection<TransactionRecord> getTransactionHistory() {
		// TODO - implement Wallet.getTransactionHistory
		throw new UnsupportedOperationException();
	}

}