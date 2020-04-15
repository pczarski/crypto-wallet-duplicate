package g37.cryapi.wallet;
import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.lib.KeyGenerator;
import g37.cryapi.wallet.api.WalletJson;

import java.io.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
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
		this.setUpCurrencies(true);
		this.isSetup = true;
		this.saveState();
	}

		//todo make coin factory instead and loop through the enum to follow better practises
	private void setUpCurrencies(boolean isToSet){
		currencyInWallets = new ArrayList<>();
		currencyInWallets.add(new Bitcoin(isToSet));
		currencyInWallets.add(new Ethereum(isToSet));
		currencyInWallets.add(new Litecoin(isToSet));
		currencyInWallets.add(new Tether(isToSet));
		currencyInWallets.add(new Dash(isToSet));
	}

	private void recoverCurrencies() {
		// todo: for now we'll just set up
		this.setUpCurrencies(true);
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
		this.saveState();
	}

	public boolean areSavedFiles() {
		File seedFile = new File("./local/seed.ser");
		File BTC = new File("./local/BTC.ser");
		return seedFile.exists() && BTC.exists();
	}

	public boolean loadFromFile() {
		// check if new wallet
		if(!areSavedFiles()){
			this.setUpNew();
			return false;
		}

		this.setUpCurrencies(false);

		try
		{
			FileInputStream fileInputStream = new FileInputStream("local/seed.ser");
			ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
			WalletJson seed = (WalletJson) objectInputStream.readObject();
			this.recoveryPhrase = seed.getSeedPhrase();
			for(int i = 0; i < this.currencyInWallets.size(); i++){
				CurrencyInWallet currencyInWallet = this.currencyInWallets.get(i);
				fileInputStream = new FileInputStream("local/"+ currencyInWallet.getName().toString()+".ser");
				objectInputStream = new ObjectInputStream(fileInputStream);
				KeyPair[] keyPairs = (KeyPair[]) objectInputStream.readObject();
				objectInputStream.close();
				currencyInWallet.setKeyPairs(Arrays.asList(keyPairs));
			}
			this.isSetup = true;
			return true;
		}
		catch (Exception e)
		{
			System.out.println("failed to load, setting up new:  "+e.toString());
			this.setUpNew();
			return false;
		}
	}

	public void saveState() {
		try {
			for(CurrencyInWallet currency: currencyInWallets) {
				KeyPair[] pairs = currency.keyPairsToArray();
				FileOutputStream fileOutputStream = new FileOutputStream("local/"+currency.getName().toString()+".ser");
				ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
				objectOutputStream.writeObject(pairs);
				objectOutputStream.close();
			}
			FileOutputStream fileOutputStream = new FileOutputStream("local/seed.ser");
			ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
			objectOutputStream.writeObject(new WalletJson(this.getRecoveryPhrase()));
			objectOutputStream.close();
		}
		catch (Exception e)
        {
            System.out.println("failed to save  "+e.toString());
        }
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