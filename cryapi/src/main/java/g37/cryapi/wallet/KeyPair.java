package g37.cryapi.wallet;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import g37.cryapi.lib.KeyGenerator;

public class KeyPair implements Serializable {

	private String privateKey;
	private String publicKey;
	private double amount;
	private ArrayList<TransactionRecord> transactions;

	public KeyPair(int privLen, int pubLen) {
		this.privateKey = KeyGenerator.generateKey(privLen);
		this.publicKey = KeyGenerator.generateKey(pubLen);
		this.amount = 0.0;
		this.transactions = new ArrayList<>();
	}

	public String getPrivateKey() {
		return this.privateKey;
	}

	public String getPublicKey() {
		return this.publicKey;
	}

	public double getAmount() {
		return this.amount;
	}

	protected void setAmount(double amount) {
		this.amount = amount;
	}

	protected void addTransaction(TransactionRecord record) {
		this.transactions.add(record);
	}

	public ArrayList<TransactionRecord> getTransactions(){
		return this.transactions;
	}
}