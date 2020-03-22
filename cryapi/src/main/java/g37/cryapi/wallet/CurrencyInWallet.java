package g37.cryapi.wallet;
import g37.cryapi.common.CryptoCurrency;

import java.util.ArrayList;
import java.util.Collection;

public abstract class CurrencyInWallet {

	private double balance;
	private boolean active;

	private final int privLen;
	private final int pubLen;
	private final CryptoCurrency name;

	private final static int N_KEY_PAIRS = 16;
	private ArrayList<KeyPair> keyPairs;

	public CurrencyInWallet(int privLen, int pubLen, CryptoCurrency name) {
		this.privLen = privLen;
		this.pubLen = pubLen;
		this.name = name;
		this.generateKeys();
	}

	private void generateKeys(){
		this.keyPairs = new ArrayList<>();
		for(int i = 0; i < N_KEY_PAIRS; i++) {
			this.keyPairs.add(new KeyPair(this.privLen, this.pubLen));
		}
	}

	public String getCurrentPublicKey() {

		// the one at index 0 will always be the current
		if (keyPairs.size() == 0){
			return "No key for this currency";
		}
		return keyPairs.get(0).getPublicKey();
	};

	public double getBalance() {
		this.updateBalance();
		return this.balance;
	};

	public ArrayList<KeyPair> getKeyPairs() {
		return this.keyPairs;
	}

	protected void setBalance(double balance){
		this.balance = balance;
	}

	public abstract double getPrice();

	public void updateBalance() {
		double _balance = 0;
		for (int i = 0; i < this.keyPairs.size(); i++) {
			this.updateKeyBalance(this.keyPairs.get(i));
			_balance += this.keyPairs.get(i).getAmount();
		}
		this.balance = _balance;
	};

	protected abstract void updateKeyBalance(KeyPair key);

	public abstract void send(String address, double amount);

	public CryptoCurrency getName() {
		return this.name;
	}

}