package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public class CoinbaseOrder extends Order {

    /**
     * @param currency1
     * @param currency2
     * @param amount
     * @param price
     */
    public CoinbaseOrder(long orderID, OrderType type, CryptoCurrency currency1, CryptoCurrency currency2, double amount, double price, ExchangeAccess exchange) {
        super(orderID, type, currency1, currency2, amount, price, exchange);
    }

    @Override
    public void cancelOrder() {
    }

}// JUST A MARKER TO SEE CHANGES