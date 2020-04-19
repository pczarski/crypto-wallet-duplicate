package g37.cryapi.common;
//test change
public enum CryptoCurrency {
	BTC("Bitcoin"),
	DASH("Dash"),
	ETH("Ethereun"),
	LTC("Litecoin"),
	USDT("Thether"),
	BCH("Bitcoin Cash");

	private final String name;

	public String getName() {
		return this.name;
	}

	CryptoCurrency(String name) {
		this.name = name;
	}
}