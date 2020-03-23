package g37.cryapi.wallet;
import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.common.Currency;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

public abstract class CurrencyInWallet extends Currency {

	private double balance;
	private final int privLen;
	private final int pubLen;

	private final static int N_KEY_PAIRS = 16;
	private ArrayList<KeyPair> keyPairs;
	private final AtomicLong counter = new AtomicLong();

	// TODO: temporary variable for prototype
	protected int isSet;

	public CurrencyInWallet(int privLen, int pubLen, CryptoCurrency name) {
		super(name);
		this.privLen = privLen;
		this.pubLen = pubLen;
		this.keyPairs = new ArrayList<>();
		this.generateKeys();

		//todo: temporary
		this.isSet = 0;
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

	public boolean send(String address, double amount) {
		this.updateBalance();
		if (this.balance < amount) {
			return false;
		}
		for (int i = 0; i < this.keyPairs.size(); i++){
			KeyPair pair = this.keyPairs.get(i);
			if(pair.getAmount() > amount) {
				this.performSend(pair, address, amount);
				pair.setAmount(pair.getAmount() - amount);

				pair.addTransaction(new TransactionRecord(
						counter.incrementAndGet(), new Date().toString(),
						amount, address, pair.getPublicKey(), TransactionType.SEND
						));

				return true;
			}
			else {
				this.performSend(pair, address, pair.getAmount());
				amount -= pair.getAmount();

				pair.addTransaction(new TransactionRecord(
						counter.incrementAndGet(), new Date().toString(),
						pair.getAmount(), address, pair.getPublicKey(), TransactionType.SEND
				));

				pair.setAmount(0.0);

			}
		}
		return true;
	};

	public ArrayList<TransactionRecord> getTransactionRecords() {
		ArrayList<TransactionRecord> transactionRecords = new ArrayList<>();
		for (KeyPair pair: this.keyPairs) {
			transactionRecords.addAll(pair.getTransactions());
		}
		return transactionRecords;
	}

	// a method that actually posts the sending on the block-chain
	protected abstract void performSend(KeyPair keys, String addressTo, double amount);

	protected void addReceiveRecord(KeyPair keys, String addressFrom, double amount) {
		keys.addTransaction(new TransactionRecord(
				this.counter.incrementAndGet(), new Date().toString(),
				amount, keys.getPublicKey(), addressFrom, TransactionType.RECEIVE
				));
	}


	//todo: temporary function that adds random transactions
	protected void addTestReceive(int nAddresses, double factor) {
		for (int i = 0; i < nAddresses; i++) {
			KeyPair pair = this.keyPairs.get(i);
			double addAmount = Math.random() * factor;
			pair.setAmount(pair.getAmount() + addAmount);
			this.addReceiveRecord(pair, "xxxTHExxSYSTEMxxx", addAmount);
		}
	}

}