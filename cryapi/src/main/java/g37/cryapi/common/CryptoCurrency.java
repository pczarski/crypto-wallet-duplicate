package g37.cryapi.common;
//test change
public enum CryptoCurrency {
	BTC("Bitcoin"),
	DASH("Dash"),
	DOGE("Doge"),
	ETH("Ethereun"),
	LTC("Litecoin"),
	USDT("Thether");

	private final String name;

	public String getName() {
		return this.name;
	}

	CryptoCurrency(String name) {
		this.name = name;
	}
}