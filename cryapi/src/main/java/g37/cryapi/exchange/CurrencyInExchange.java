package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.common.Currency;
import g37.cryapi.wallet.CurrencyInWallet;
import g37.cryapi.wallet.Wallet;

public abstract class CurrencyInExchange extends Currency {

	//todo temporary for tests
	public boolean isSet;

	private double marketPrice;

	public CurrencyInExchange(CryptoCurrency name) {
		super(name);

		//todo temporary for test
		this.addTestBalance(100.0);
	}

	public abstract void updateMarketPrice();

	protected abstract void performSend(String address, double amount);

	@Override
	public abstract void updateBalance();

	@Override
	public abstract String getCurrentPublicKey();

	public double getMarketPrice() {
		return this.marketPrice;
	};

	protected void setMarketPrice(double value) {
		this.marketPrice = value;
	}

	public boolean depositCurrency(double amount) {
		return false;
	};

	public boolean withdrawCurrency(double amount){
		Wallet wallet = Wallet.getInstance();
		CurrencyInWallet currencyInWallet = wallet.getCurrencyInWallet(this.getName()); // todo can be shortened after test
		String address = currencyInWallet.getCurrentPublicKey();
		boolean result = this.send(address, amount); //todo after testing stage is done this
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
		this.setBalance(this.getBalance() - amount);
		return true;
	};

	public void changeBalance(double amount) {
		if(-amount > this.getBalance()) {
			throw new IllegalArgumentException("Balance cannot end up being negative");
		}
		this.setBalance(this.getBalance() + amount);
	}

	//todo for tests

	public void addTestBalance(double amount) {
		this.setBalance(this.getBalance() + amount);
	}




}