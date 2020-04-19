package g37.cryapi.wallet;

import g37.cryapi.common.CryptoCurrency;

public class CurrencyInWalletFactory {
    public static CurrencyInWallet makeCurrencyInWallet(CryptoCurrency currencyName, boolean isToSet) {
        switch (currencyName) {
            case BTC:{
                return new Bitcoin(isToSet);
            }
            case DASH:{
                return new Dash(isToSet);
            }
            case ETH:{
                return new Ethereum(isToSet);
            }
            case USDT:{
                return new Tether(isToSet);
            }
            case LTC:{
                return new Litecoin(isToSet);
            }
            case BCH:{
                return new BitcoinCash(isToSet);
            }
            default:{
                throw new IllegalArgumentException();
            }
        }
    }
}
