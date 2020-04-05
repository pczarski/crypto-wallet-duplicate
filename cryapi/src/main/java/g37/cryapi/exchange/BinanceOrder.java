package g37.cryapi.exchange;

import g37.cryapi.common.CryptoCurrency;

public class BinanceOrder extends Order {
    /**
     * @param currency1
     * @param currency2
     * @param amount
     * @param price
     */
    public BinanceOrder(long orderID, OrderType type, CryptoCurrency currency1,
                        CryptoCurrency currency2, double amount, double price) {
        super(orderID, type, currency1, currency2, amount, price);
    }

    @Override
    public void cancelOrder() {

    }

//    @Override
//    public void updateProgress() {
//
//    }
}