package g37.cryapi.exchange;

import java.util.ArrayList;

///todo: we should probably make an interface that handles the communication between the wallet and the exchange  //will it be related to Adopter design pattern?

public class ExchangeHandler {

	private static ExchangeHandler instance = new ExchangeHandler();
	private ArrayList<ExchangeAccess> exchanges;

	private ExchangeHandler() {
		this.exchanges = new ArrayList<>();
	}

	public static ExchangeHandler getInstance() {
		return instance;
	}

	public void addExchange(String apiKey, ExchangeName exchangeName) {
		switch(exchangeName) {
			case Binance:
				exchanges.add(new Binance(apiKey));
				break;
			case Coinbase:
				exchanges.add(new Coinbase(apiKey));
				break;
			default:
				throw new IllegalArgumentException();
		}
	}

	public ArrayList<Order> getOrderHistory() {
		// TODO - implement ExchangeHandler.getOrderHistory
		throw new UnsupportedOperationException();
	}

	public ExchangeAccess getExchange(ExchangeName name) {
		for(int i = 0; i < exchanges.size(); i++) {
			ExchangeAccess exchangeAccess = exchanges.get(i);
			if(name == exchangeAccess.getName()) {
				return exchangeAccess;
			}
		}
		throw new IllegalArgumentException();
	}

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