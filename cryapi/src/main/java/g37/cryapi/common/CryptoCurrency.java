package g37.cryapi.common;
//test change
public enum CryptoCurrency {
	BTC("Bitcoin"),
	ETH("Ethereun"),
	DASH("Dash"),
	LTC("Litecoin"),
	USDT("Thether"),
	BCH("Bitcoin Cash"),
	EOS("EOS"),
	ETC("Ethereum Classic"),
	ATOM("Cosmos"),
	XRP("Ripple"),
	ZEC("Zcash"),
	ZRX("0x"),
	LINK("Chainlink");

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