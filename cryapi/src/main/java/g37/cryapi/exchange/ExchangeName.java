package g37.cryapi.exchange;

public enum ExchangeName {
	Binance("Binance"),
	Coinbase("Coinbase");

	private final String name;

	public String getName() {return  this.name; }

	ExchangeName(String name) { this.name = name; }
}// JUST A MARKER TO SEE CHANGES