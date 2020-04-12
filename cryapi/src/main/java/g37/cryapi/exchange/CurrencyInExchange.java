package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.common.Currency;
import g37.cryapi.wallet.CurrencyInWallet;
import g37.cryapi.wallet.Wallet;
import org.springframework.web.client.RestTemplate;

// todo: optional: make actual test receive

public abstract class CurrencyInExchange extends Currency {

	//todo temporary for tests
	public boolean isSet;

	private Double marketPrice;

	private RestTemplate restTemplate;

	private ExchangeAccess exchangeAccess;

	public CurrencyInExchange(CryptoCurrency name, ExchangeAccess exchangeAccess) {
		super(name);
		restTemplate = new RestTemplate();
		this.exchangeAccess = exchangeAccess;

		//todo temporary for test
		this.addTestBalance(100.0);
	}

	public ExchangeAccess getExchangeAccess() {
		return exchangeAccess;
	}

	protected RestTemplate getRestTemplate() {
		return restTemplate;
	}

	protected abstract void performSend(String address, double amount);

	@Override
	public abstract void updateBalance();

	@Override
	public abstract String getCurrentPublicKey();

	public Double getMarketPrice() {
		this.updateMarketPrice();
		return this.marketPrice;
	};

	protected void setMarketPrice(Double value) {
		this.marketPrice = value;
	}

	public boolean depositCurrency(double amount) {
		Wallet wallet = Wallet.getInstance();
		CurrencyInWallet currencyInWallet = wallet.getCurrencyInWallet(this.getName());
		String address = this.getCurrentPublicKey();
		boolean result = currencyInWallet.send(address, amount);

		//todo: this is only for the test
		if(result) {
			this.addTestBalance(amount);
		}
		return result;
	};

	public boolean withdrawCurrency(double amount){
		Wallet wallet = Wallet.getInstance();
		CurrencyInWallet currencyInWallet = wallet.getCurrencyInWallet(this.getName()); // todo can be shortened after test
		String address = currencyInWallet.getCurrentPublicKey();
		boolean result = this.send(address, amount); //todo after testing stage, should be done here
		// ...should just be return this...

		//todo: below is only for test purposes
		if(result) {
			currencyInWallet.testReceive(amount, this.getCurrentPublicKey());
		}
		return result;
	};

	@Override
	public boolean send(String address, double amount) {
		this.updateBalance();
		if (this.getBalance() < amount) {
			return false;
		}
		this.performSend(address, amount);
		this.setBalance(this.getBalance() - amount);
		return true;
	};

	public void changeBalance(double amount) {
		if(-amount > this.getBalance()) {
			throw new IllegalArgumentException("Balance cannot end up being negative");
		}
		this.setBalance(this.getBalance() + amount);
	}

	public abstract void updateMarketPrice();

	public abstract double getMarketPriceIn(CryptoCurrency currencyIn);

	public double getValueIn(CurrencyInExchange currencyInExchange) {
		return this.getMarketPrice() / currencyInExchange.getMarketPrice();
	}

	//todo for tests

	public void addTestBalance(double amount) {
		this.setBalance(this.getBalance() + amount);
	}




}