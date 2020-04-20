package g37.cryapi.common;
//test change
public enum CryptoCurrency {
	BTC("Bitcoin"),
	ETH("Ethereun"),
	DASH("Dash"),
	LTC("Litecoin"),
	USDT("Thether"),
	BCH("Bitcoin Cash"),
	ETC("Ethereum Classic"),
	XRP("Ripple");

	private final String name;

	public String getName() {
		return this.name;
	}

	CryptoCurrency(String name) {
		this.name = name;
	}
}

//	ZRX("0x"),
//	ZEC("Zcash"),
//	BAT("Basic Attention Token"),
//	REP("Augur"),
//
//	KNC("Kyber Network");