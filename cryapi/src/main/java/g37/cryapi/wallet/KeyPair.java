package g37.cryapi.wallet;

public class KeyPair {

	private String privateKey;
	private String publicKey;
	private double amount;

	public String getPrivateKey() {
		return this.privateKey;
	}

	public String getPublicKey() {
		return this.publicKey;
	}

	public double getAmount() {
		return this.amount;
	}

}