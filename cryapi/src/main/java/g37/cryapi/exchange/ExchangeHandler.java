package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

import java.rmi.NoSuchObjectException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

///todo: we should probably make an interface that handles the communication between the wallet and the exchange  //will it be related to Adopter design pattern?

public class ExchangeHandler {

	private static ExchangeHandler instance = new ExchangeHandler();
	private ArrayList<ExchangeAccess> exchanges;
	private AtomicLong idCreator;

	private ExchangeHandler() {
		this.exchanges = new ArrayList<>();
		this.idCreator = new AtomicLong();
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

	public ExchangeAccess getExchange(ExchangeName name) {
		for(int i = 0; i < exchanges.size(); i++) {
			ExchangeAccess exchangeAccess = exchanges.get(i);
			if(name == exchangeAccess.getName()) {
				return exchangeAccess;
			}
		}
		throw new IllegalArgumentException();
	}

	public ArrayList<ExchangeAccess> getExchanges() {
		return this.exchanges;
	}

	public Order getOrder(long id, ExchangeName exchangeName) throws NoSuchObjectException {
		return this.getExchange(exchangeName).getOrder(id);
	}

	public Order placeOrder(ExchangeName exchangeName, OrderType type, CryptoCurrency c1, CryptoCurrency c2, double amount, double unitPrice) {
		ExchangeAccess exchange = this.getExchange(exchangeName);
		Order order;
		switch (type) {
			case Buy:
				order = exchange.makeBuyOrder(idCreator.incrementAndGet(), c1, c2, amount, unitPrice);
				break;
			case Sell:
				order = exchange.makeSellOrder(idCreator.incrementAndGet(), c1, c2, amount, unitPrice);
			break;
			default:
				throw new IllegalArgumentException("unsupported operation");
		}
		return order;
	}

	public Order placeSwapOrder(ExchangeName exchangeName, CryptoCurrency c1, CryptoCurrency c2, double amount) {
		ExchangeAccess exchangeAccess = this.getExchange(exchangeName);
		return exchangeAccess.makeExchangeOrder(idCreator.incrementAndGet(), c1, c2, amount);
	}

	public List<Order> getFullOrderHistory() {
		ArrayList<Order> toRet = new ArrayList<>();
		for(ExchangeAccess exchangeAccess: exchanges) {
			toRet.addAll(exchangeAccess.getOrder());
		}
		return toRet;
	}

	//TOdo for tests
	public void addTestExchanges() {
		this.exchanges.add(new Binance("XX_TEST_BINANCE_KEY_XX"));
		this.exchanges.add(new Coinbase("XX_TEST_COINBASE_KEY_XX"));
	}
// JUST A MARKER TO SEE CHANGES
}