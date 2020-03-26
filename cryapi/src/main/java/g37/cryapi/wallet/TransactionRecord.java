package g37.cryapi.wallet;

public class TransactionRecord {

	private String time;
	private double amount;
	private String destinationAddress;
	private String originAddress;
	private long id;
	private TransactionType type;

	public TransactionRecord(long id, String time, double amount, String destinationAddress, String originAddress, TransactionType type) {
		this.id = id;
		this.time = time;
		this.destinationAddress = destinationAddress;
		this.originAddress = originAddress;
		this.type = type;
		this.amount = amount;
	}

	public String getTime() {
		return this.time;
	}

	public double getTransactionAmount() {
		return this.amount;
	}

	public String getDestinationAddress() {
		return this.destinationAddress;
	}

	public String getOriginAddress() {return this.originAddress; }

	public long getId() { return this.id; }

	public TransactionType getType() { return this.type; }

}