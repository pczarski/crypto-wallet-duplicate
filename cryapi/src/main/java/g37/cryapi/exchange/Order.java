package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public abstract class Order {

	private String orderID;
	private String dateCreated;
	private CryptoCurrency currency1;
	private CryptoCurrency currency2;
	private double initialAmount;
	private double amountComplete;
	private int value;

	public abstract void cancelOrder();

	public abstract void updateProgress();

	public String getOrderID() {
		return this.orderID;
	}

	public String getDate() {
		// TODO - implement Order.getDate
		throw new UnsupportedOperationException();
	}

	public CryptoCurrency getCurrency1() {
		return this.currency1;
	}

	public CryptoCurrency getCurrency2() {
		return this.currency2;
	}

	public double getInitialAmount() {
		// TODO - implement Order.getInitialAmount
		throw new UnsupportedOperationException();
	}

	public double getAmountComplete() {
		return this.amountComplete;
	}

	/**
	 * 
	 * @param currency1
	 * @param currency2
	 * @param amount
	 * @param price
	 */
	public Order(CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price) {
		// TODO - implement Order.Order
		throw new UnsupportedOperationException();
	}

	public double getValue() {
		// TODO - implement Order.getValue
		throw new UnsupportedOperationException();
	}

}