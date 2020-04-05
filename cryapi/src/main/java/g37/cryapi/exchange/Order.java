package g37.cryapi.exchange;

import com.sun.xml.internal.ws.util.CompletedFuture;
import g37.cryapi.common.CryptoCurrency;

import java.util.Date;

import static g37.cryapi.exchange.OrderStatus.*;

public abstract class Order {

	private long orderID;
	private CryptoCurrency currency1;
	private CryptoCurrency currency2;
	private double initialAmount;
	private double amountComplete;
	private double unitPrice;
	private OrderType type;
	private OrderStatus status;
	private Date date;
	private OrderHandler orderHandler;

	public Order(long orderID, OrderType type, CryptoCurrency currency1,
				 CryptoCurrency currency2, double amount, double price) { //todo the long is for prototyping
		this.orderID = orderID;
		this.type = type;
		this.currency1 = currency1;
		this.currency2 = currency2;
		this.initialAmount = amount;
		this.amountComplete = 0;
		this.status = NEW;
		this.unitPrice = price;
		this.date = new Date();
	}

	public void fulFilAmount(double amount) {
		amountComplete = (amountComplete <= amount) ? initialAmount : amountComplete - amount;
	}

	public boolean equals(Order other) {
		return this.orderID == other.orderID;
	}

	protected void placeOrder(){
		//this.orderHandler
	}

	protected abstract void performCancel();

	public void cancelOrder() {
		this.performCancel();
		if(this.status != COMPLETE){
			this.status = CANCELED;
		}
		this.status = CANCELED;
	};

	protected abstract void performUpdate();

	public void updateProgress() {
		this.performUpdate();
		this.status = (this.initialAmount == this.amountComplete) ? COMPLETE : IN_PROGRESS;
	};

	public long getOrderID() {
		return this.orderID;
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

	public double getAmountComplete() {
		return this.amountComplete;
	}

	public double getUnitPrice() {
		return this.unitPrice;
	}

}