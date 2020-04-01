package g37.cryapi.exchange;

import java.util.ArrayList;

///todo: we should probably make an interface that handles the communication between the wallet and the exchange  //will it be related to Adopter design pattern?

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

	//TOdo for tests
	public void addTestExchanges() {
		this.exchanges.add(new Binance("XX_TEST_BINANCE_KEY_XX"));
		this.exchanges.add(new Coinbase("XX_TEST_COINBASE_KEY_XX"));
	}

	public ArrayList<ExchangeAccess> getExchanges() {
		return this.exchanges;
	}

}