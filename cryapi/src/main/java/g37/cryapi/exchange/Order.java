package g37.cryapi.exchange;
import g37.cryapi.common.CryptoCurrency;
// JUST A MARKER TO SEE CHANGES
import java.util.Date;

import static g37.cryapi.exchange.OrderStatus.*;

public class Order {

	private long orderID;
	private CryptoCurrency currency1;
	private CryptoCurrency currency2;
	private double initialAmount;
	private double amountComplete;
	private double unitPrice;
	private OrderType type;
	private OrderStatus status;
	private Date date;
	private ExchangeAccess exchangeAccess;

	public Order(long orderID, OrderType type, CryptoCurrency currency1,
				 CryptoCurrency currency2, double amount, double price, ExchangeAccess exchange) { //todo the long is for prototyping
		this.orderID = orderID;
		this.type = type;
		this.currency1 = currency1;
		this.currency2 = currency2;
		this.initialAmount = amount;
		this.amountComplete = 0;
		this.status = NEW;
		this.unitPrice = price;
		this.exchangeAccess = exchange;
		this.date = new Date();
	}


	public synchronized void fulFilAmount(double amount) {
		double toUpdate;
		if(amount + amountComplete > initialAmount) {
			toUpdate = initialAmount - amountComplete;
		} else {
			toUpdate = amount;
		} if (toUpdate < 0) { throw new IllegalStateException(); }
		amountComplete += toUpdate;

		//todo: this seems little bit not like proper OOP
		if (type == OrderType.Buy) {
			exchangeAccess.changeCurrencyAmount(currency1, toUpdate);
			exchangeAccess.changeCurrencyAmount(currency2, toUpdate * -unitPrice);
		} else {
			// exchange and sell are treated the same here
			exchangeAccess.changeCurrencyAmount(currency1, -1 * toUpdate);
			exchangeAccess.changeCurrencyAmount(currency2, toUpdate * unitPrice);
		}

		this.updateProgress();
	}

	public void setExchangeAccess(ExchangeAccess exchangeAccess) {
		this.exchangeAccess = exchangeAccess;
	}

	public ExchangeAccess getExchangeAccess() {
		return exchangeAccess;
	}

	public synchronized boolean equals(Order other) {
		return this.orderID == other.orderID;
	}

	protected void placeOrder(){
		//this.orderHandler
	}

	protected void performCancel(){};

	public void cancelOrder() {
		this.performCancel();
		if(this.status != COMPLETE){
			this.status = CANCELED;
		}
		this.status = CANCELED;
	};

	public synchronized OrderStatus updateProgress() {
		this.status = (this.initialAmount <= this.amountComplete) ? COMPLETE : IN_PROGRESS;
		return this.status;
	};

	public long getOrderID() {
		return this.orderID;
	}

	public boolean isCancelled() {
		return this.status == CANCELED;
	}

	public boolean isComplete() {
		return amountComplete >= initialAmount; // because doubles aren't precise
	}

	public Date getDate() {
		return this.date;
	}

	public CryptoCurrency getCurrency1() {
		return this.currency1;
	}

	public CryptoCurrency getCurrency2() {
		return this.currency2;
	}

	public double getInitialAmount() {
		return this.initialAmount;
	}

	public synchronized double getAmountComplete() {
		return this.amountComplete;
	}

	public double getUnitPrice() {
		return this.unitPrice;
	}

	public OrderType getType() {
		return this.type;
	}

	public OrderStatus getStatus() {
		return this.status;
	}

}