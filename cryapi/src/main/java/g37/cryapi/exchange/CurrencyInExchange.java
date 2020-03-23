package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.common.Currency;

public abstract class CurrencyInExchange extends Currency {

	public CurrencyInExchange(CryptoCurrency name) {
		super(name);
	}

	public abstract void updateMarketPrice();
	abstract double getMarketPrice();

	@Override
	public abstract String getCurrentPublicKey();


}