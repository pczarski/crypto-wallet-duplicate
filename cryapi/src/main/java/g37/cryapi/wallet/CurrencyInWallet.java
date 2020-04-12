package g37.cryapi.wallet;
import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.common.Currency;
import org.springframework.web.client.RestTemplate;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

public abstract class CurrencyInWallet extends Currency {

	private static final String PRICE_BASE_URL = "https://api.coinbase.com/v2/prices/";

	private final int privLen;
	private final int pubLen;

	private final static int N_KEY_PAIRS = 16;
	private ArrayList<KeyPair> keyPairs;
	private final AtomicLong counter = new AtomicLong();
	private RestTemplate restTemplate;

	public void setPrice(Double price) {
		this.price = price;
	}

	private Double price;

	// TODO: temporary variable for prototype
	protected int isSet;

	public CurrencyInWallet(int privLen, int pubLen, CryptoCurrency name) {
		super(name);
		this.privLen = privLen;
		this.pubLen = pubLen;
		this.keyPairs = new ArrayList<>();
		this.generateKeys();
		this.restTemplate = new RestTemplate();
		this.updatePrice();

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

	public ArrayList<KeyPair> getKeyPairs() {
		return this.keyPairs;
	}

	public Double getPrice() {
		this.updatePrice();
		return this.price;
	};

	private void updatePrice() {
		try {
			String url = PRICE_BASE_URL + this.getName() + "-USD/spot";
			MarketPrice marketPrice = restTemplate.getForObject(url, MarketPrice.class);
			double value = Double.parseDouble(marketPrice.getData().get("amount"));
			this.setPrice(value);
		} catch (Exception e) {
			System.out.println(e.toString());
			if(this.price == null) {
				this.setPrice(1.0);
			}
		}
	}

	public void updateBalance() {
		double _balance = 0;
		for (int i = 0; i < this.keyPairs.size(); i++) {
			this.updateKeyBalance(this.keyPairs.get(i));
			_balance += this.keyPairs.get(i).getAmount();
		}
		this.setBalance(_balance);
	};

	protected abstract void updateKeyBalance(KeyPair key);

	public boolean send(String address, double amount) {
		this.updateBalance();
		if (this.getBalance() < amount) {
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

	//todo: temporary for testing
	public void testReceive(double amount, String origin) {
		KeyPair pair = this.keyPairs.get(0);
		pair.setAmount(pair.getAmount() + amount);
		this.addReceiveRecord(pair, origin, amount);
	}

	public double getPriceIn(CurrencyInWallet currencyIn) {
		return this.getPrice() / currencyIn.getPrice();
	}

}// JUST A MARKER TO SEE CHANGES

class MarketPrice implements Serializable {

	public Map<String, String> getData() {
		return data;
	}

	public void setData(Map<String, String> data) {
		this.data = data;
	}

	private Map<String, String> data;
}