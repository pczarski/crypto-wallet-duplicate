package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public interface CurrencyInExchange {

	double getAmount();

	double getMarketPrice();

	CryptoCurrency getCurrencyName();

	String getPublicKey();

	void updateMarketPrice();

}