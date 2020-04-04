package g37.cryapi.common;

public enum CryptoCurrency {
	Bitcoin("Bitcoin"),
	Dash("Dash"),
	Doge("Doge"),
	Ethereum("Ethereun"),
	Litecoin("Litecoin"),
	Tether("Thether");

	private final String name;

	public String getName() {
		return this.name;
	}

	CryptoCurrency(String name) {
		this.name = name;
	}
}