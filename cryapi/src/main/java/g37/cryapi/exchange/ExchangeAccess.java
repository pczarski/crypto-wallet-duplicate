package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

import java.util.ArrayList;

public abstract class ExchangeAccess {

	private int APIkey;

	/**
	 * 
	 * @param apiKey
	 * @param name
	 */
	public void Exchange(String apiKey, ExchangeName name) {
		// TODO - implement ExchangeAccess.Exchange
		throw new UnsupportedOperationException();
	}

	public ArrayList<Order> getOrders() {
		// TODO - implement ExchangeAccess.getOrders
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param id
	 */
	public Order getOrder(String id) {
		// TODO - implement ExchangeAccess.getOrder
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param currency
	 * @param amount
	 */
	public abstract void depositCurrency(CryptoCurrency currency, double amount);

	public CurrencyInExchange getCurrenciesInExchange() {
		// TODO - implement ExchangeAccess.getCurrenciesInExchange
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param currency
	 * @param amount
	 */
	public abstract void withdrawCurrency(CryptoCurrency currency, double amount);

	public abstract void withdrawAll();

	/**
	 * 
	 * @param currency1
	 * @param currency2
	 * @param amount
	 * @param price
	 */
	public abstract Order makeSellOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price);

	/**
	 * 
	 * @param currency1
	 * @param currency2
	 * @param amount
	 * @param price
	 */
	public abstract Order makeBuyOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price);

	/**
	 * 
	 * @param currency1
	 * @param currency2
	 * @param amount
	 */
	public abstract Order makeExchangeOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount);

}