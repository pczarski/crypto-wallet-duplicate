package g37.cryapi.wallet;
import java.util.ArrayList;
import java.util.Collection;

public abstract class CurrencyInWallet {

	private double balance;
	private boolean active;

	private final int privLen;
	private final int pubLen;
	private final static int N_KEY_PAIRS = 16;
	private ArrayList<KeyPair> keyPairs;

	public CurrencyInWallet(int privLen, int pubLen) {
		this.privLen = privLen;
		this.pubLen = pubLen;
	}

	private void generateKeys(){
		for(int i = 0; i < N_KEY_PAIRS; i++) {
			this.keyPairs.add(new KeyPair(this.privLen, this.pubLen));
		}
	}

	public abstract double getPrice();

	public abstract String getCurrentPublicKey();

	public abstract double getBalance();

	public abstract void updateBalance();

	public abstract void send(String address, double amount);

	public Collection<KeyPair> getKeyPairs() {
		return this.keyPairs;
	}

	public CryptoCurrency getName() {
		// TODO - implement CurrencyInWallet.getName
		throw new UnsupportedOperationException();
	}

}