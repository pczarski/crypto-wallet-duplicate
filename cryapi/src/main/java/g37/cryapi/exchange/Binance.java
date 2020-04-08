package g37.cryapi.exchange;
import g37.cryapi.common.CryptoCurrency;

// todo: perhaps all these exchanges should use Singleton??
public class Binance extends ExchangeAccess {

    public Binance(String apiKey) {
        super(apiKey, ExchangeName.Binance, new BinanceOrderHandler());
    }

    @Override
    public void withdrawCurrency(CryptoCurrency currency, double amount) {

    }

    @Override
    protected void addSupportedCurrencies() {
        for(CryptoCurrency currency: CryptoCurrency.values()) {
            this.addCurrency(new CurrencyInBinance(currency));
        }
    }

    @Override
    public void withdrawAll() {

    }

//    @Override
//    public double valueInCurrency(CryptoCurrency currency, CryptoCurrency inCurrency) {
//        return this.getCurrencyInExchange(currency).getMarketPriceIn(inCurrency);
//    }

//    @Override
//    public Order makeSellOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price) {
//        CurrencyInExchange toSell = this.getCurrencyInExchange(currency1);
//        CurrencyInExchange toBuy = this.getCurrencyInExchange(currency2);
//       // BinanceOrder order = new BinanceOrder(currency1, currency2, amount, price);
//        return null;
//    }

//   // @Override
//    public Order makeBuyOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price) {
//        return null;
//    }
//
//    @Override
//    public Order makeExchangeOrder(CryptoCurrency currency1, CryptoCurrency currency2, double amount) {
//        return null;
//    }
}