package g37.cryapi.exchange;
import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.wallet.CurrencyInWallet;

import java.rmi.NoSuchObjectException;
import java.util.ArrayList;
import java.util.List;

public abstract class ExchangeAccess {

	private String ApiKey;
	private ExchangeName name;
	private ArrayList<CurrencyInExchange> currencies;
	private ArrayList<Order> orders;
	private Thread orderThread;

	public String getApiKey() {
		return ApiKey;
	}

	public ExchangeName getName() {
		return name;
	}
	private OrderHandler orderHandler;

	public ExchangeAccess(String apiKey, ExchangeName name, OrderHandler orderHandler) {
		this.ApiKey = apiKey;
		this.name = name;
		currencies = new ArrayList<>();
		this.addSupportedCurrencies();
		this.orders = new ArrayList<>();
		this.orderHandler = orderHandler;
		this.orderThread = new Thread(orderHandler);
		this.orderThread.start();
	}

	protected void addCurrency(CurrencyInExchange currency) {
		this.currencies.add(currency);
	}

	//todo: should we do factory here?? - it's kinda like built in factory now
	protected abstract void addSupportedCurrencies();

	public ArrayList<Order> getOrders() {
		return this.orders;
	}

	/**
	 *
	 * @param id
	 */
	public Order getOrder(long id) throws NoSuchObjectException {
		for(Order order: orders) {
			if(order.getOrderID() == id) {
				return order;
			}
		}
		throw new NoSuchObjectException("no order with id: "+ id +" found");
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
	public Order makeSellOrder(long id, CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price) {
		if(this.getCurrencyInExchange(currency1).getBalance() < amount) {
			throw new IllegalStateException();
		}
		Order order = new Order(id, OrderType.Sell, currency1, currency2, amount, price, this);
		createOrder(order);
		return order;
	};

	public Order makeExchangeOrder(long id, CryptoCurrency currency1, CryptoCurrency currency2, double amount) {
		CurrencyInExchange currency = this.getCurrencyInExchange(currency1);
		double price = currency.getMarketPriceIn(currency2);
		if(this.getCurrencyInExchange(currency1).getBalance() < amount) {
			throw new IllegalStateException();
		}
		Order order = new Order(id, OrderType.Sell, currency1, currency2, amount, price, this);
		createOrder(order);
		return order;
	};

	public Order makeBuyOrder(long id, CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price) {
		if(this.getCurrencyInExchange(currency2).getBalance() < amount * price){
			throw new IllegalStateException();
		}
		Order order = new Order(id, OrderType.Buy, currency1, currency2, amount, price, this);
        createOrder(order);
		return order;
	};

	private void createOrder(Order order) {
		orders.add(order);
		orderHandler.placeOrder(order);
	}

	protected void changeCurrencyAmount(CryptoCurrency c1, double amount) {
		CurrencyInExchange currency1 = this.getCurrencyInExchange(c1);
		currency1.changeBalance(amount);
	}

	public Order makeOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price, OrderType type) {
		return null;
	}

	public double valueInCurrency(CryptoCurrency currency, CryptoCurrency inCurrency){
		return this.getCurrencyInExchange(currency).getValueIn(this.getCurrencyInExchange(inCurrency));
		//return this.getCurrencyInExchange(currency).getMarketPriceIn(inCurrency);
	};

	public double getTotalBalance(CryptoCurrency inCurrency) {
		CurrencyInExchange currencyIn = this.getCurrencyInExchange(inCurrency);
		double value = 0;
		for (CurrencyInExchange currency: this.currencies) {
			value += currency.getValueIn(currencyIn) * currency.getBalance();
		}
		return value;
	}

	public List<Order> getOrder() {
		return this.orders;
	}

	//TODO for tests
	public void addTestCurrencies() {

	}

}