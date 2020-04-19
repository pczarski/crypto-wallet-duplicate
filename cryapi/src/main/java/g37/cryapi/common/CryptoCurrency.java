package g37.cryapi.common;
//test change
public enum CryptoCurrency {
	BTC("Bitcoin"),
	ETH("Ethereun"),
	DASH("Dash"),
	LTC("Litecoin"),
	USDT("Thether"),
	BCH("Bitcoin Cash"),
	REP("Augur"),
	ETC("Ethereum Classic"),
	XRP("Ripple"),
	ZEC("Zcash");

	private final String name;

	public String getName() {
		return this.name;
	}

	CryptoCurrency(String name) {
		this.name = name;
	}
}