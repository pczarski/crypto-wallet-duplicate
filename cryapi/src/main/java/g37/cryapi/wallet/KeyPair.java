package g37.cryapi.wallet;

import java.util.Collection;
import cry.lib.KeyGenerator;

public class KeyPair {

	private String privateKey;
	private String publicKey;
	private double amount;
	private Collection<TransactionRecord> transactions;

	public KeyPair(int privLen, int pubLen) {
		this.privateKey = KeyGenerator.generateKey(privLen);
		this.publicKey = KeyGenerator.generateKey(pubLen);
		this.amount = 0.0;
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

}