package g37.cryapi.exchange;

import java.util.ArrayList;

public class ExchangeHandler {

	private static ExchangeHandler instance;

	private ExchangeHandler() {
		// TODO - implement ExchangeHandler.ExchangeHandler
		throw new UnsupportedOperationException();
	}

	public static ExchangeHandler getInstance() {
		return instance;
	}

	/**
	 * 
	 * @param apiKey
	 */
	public void addExchange(String apiKey) {
		// TODO - implement ExchangeHandler.addExchange
		throw new UnsupportedOperationException();
	}

	public ArrayList<Order> getOrderHistory() {
		// TODO - implement ExchangeHandler.getOrderHistory
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param name
	 */
	public ExchangeAccess getExchange(ExchangeName name) {
		// TODO - implement ExchangeHandler.getExchange
		throw new UnsupportedOperationException();
	}

	/**
	 * 
	 * @param id
	 * @param exchangeName
	 */
	public void getOrder(String id, ExchangeName exchangeName) {
		// TODO - implement ExchangeHandler.getOrder
		throw new UnsupportedOperationException();
	}

}