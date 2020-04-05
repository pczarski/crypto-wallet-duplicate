package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.wallet.CurrencyInWallet;
import g37.cryapi.wallet.Wallet;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

public abstract class ExchangeAccess {


	private String ApiKey;
	private ExchangeName name;
	private ArrayList<CurrencyInExchange> currencies;
	private ArrayList<Order> orders;

	public String getApiKey() {
		return ApiKey;
	}

	public ExchangeName getName() {
		return name;
	}
	private OrderHandler orderHandler;

	public ExchangeAccess(String apiKey, ExchangeName name) {
		this.ApiKey = apiKey;
		this.name = name;
		currencies = new ArrayList<>();
		this.addSupportedCurrencies();
		this.orders = new ArrayList<>();
	}

	//todo: should we do factory here?? - it's kinda like built in factory now
	private void addSupportedCurrencies() {
		for(CryptoCurrency currency: CryptoCurrency.values()) {
			switch (this.name) {
				case Binance:
					this.currencies.add(new CurrencyInBinance(currency));
					break;
				case Coinbase:
					this.currencies.add(new CurrencyInCoinbase(currency));
					break;
				default:
					throw new IllegalArgumentException();
			}
		}
	}

	public ArrayList<Order> getOrders() {
		return this.orders;
	}

	/**
	 *
	 * @param id
	 */
	public Order getOrder(String id) {
		// TODO - implement ExchangeAccess.getOrder
		throw new UnsupportedOperationException();
	}



	public ArrayList<CurrencyInExchange> getCurrenciesInExchange() {
		return this.currencies;
	}

	public CurrencyInExchange getCurrencyInExchange(CryptoCurrency currency) {
		for(int i = 0; i < this.currencies.size(); i++) {
			CurrencyInExchange current = this.currencies.get(i);
			if (current.getName() == currency) {
				return current;
			}
		}
		throw new IllegalArgumentException();
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
	public Order makeBuyOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price) {
		CurrencyInExchange toBuy = this.getCurrencyInExchange(currency1);
		CurrencyInExchange toSell = this.getCurrencyInExchange(currency2);
		//Order order = new Order(currency1, currency2, amount, price);
		return null;
	};

	protected void changeCurrencyAmount(CryptoCurrency c1, double amount) {
		CurrencyInExchange currency1 = this.getCurrencyInExchange(c1);
		currency1.changeBalance(amount);
	}

	private Order makeOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price, OrderType type) {
		return null;
	}

	//protected abstract void performOrder(CurrencyInExchange toBuy);

	/**
	 *
	 * @param currency1
	 * @param currency2
	 * @param amount
	 */
	public abstract Order makeExchangeOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount);


	//TODO for tests
	public void addTestCurrencies() {

	}

}