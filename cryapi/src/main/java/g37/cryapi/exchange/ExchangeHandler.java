package g37.cryapi.exchange;

import java.util.ArrayList;

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

}