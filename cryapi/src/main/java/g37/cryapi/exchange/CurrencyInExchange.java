package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.common.Currency;

public abstract class CurrencyInExchange extends Currency {

	private double marketPrice;

	public CurrencyInExchange(CryptoCurrency name) {
		super(name);
	}

	public abstract void updateMarketPrice();

	public double getMarketPrice() {
		return this.marketPrice;
	};

	protected void setMarketPrice(double value) {
		this.marketPrice = value;
	}

	@Override
	public abstract void updateBalance();

	@Override
	public abstract String getCurrentPublicKey();

	@Override
	public abstract boolean send(String address, double amount);




}