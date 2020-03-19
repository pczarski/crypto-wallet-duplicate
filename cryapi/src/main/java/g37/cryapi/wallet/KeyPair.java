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

	public static void main(String[] args) {
        KeyPair pair = new KeyPair(24, 36);
        System.out.println(pair.getPrivateKey());
		System.out.println(pair.getPublicKey());
		System.out.println(KeyGenerator.generateSeed());
	}

}