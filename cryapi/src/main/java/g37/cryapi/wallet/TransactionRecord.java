package g37.cryapi.wallet;

public class TransactionRecord {

	private String timeOfTransaction;
	private double transactionAmount;
	private String destinationAddress;

	public String getTimeOfTransaction() {
		return this.timeOfTransaction;
	}

	public double getTransactionAmount() {
		return this.transactionAmount;
	}

	public String getDestinationAddress() {
		return this.destinationAddress;
	}

}