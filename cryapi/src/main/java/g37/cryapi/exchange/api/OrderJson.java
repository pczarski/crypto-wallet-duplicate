package g37.cryapi.exchange.api;

import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.exchange.OrderStatus;
import g37.cryapi.exchange.OrderType;

import java.util.Date;

public class OrderJson {
    private final long id;
    private final String currency1;
    private final String currency2;
    private final double initialAmount;
    private final double amountComplete;
    private final double unitPrice;
    private final OrderType type;
    private final OrderStatus status;
    private final double percentComplete;

    public OrderJson(long id, String currency1, String currency2, double initialAmount,
                     double amountComplete, double unitPrice, OrderType type, OrderStatus status, String date) {
        this.id = id;
        this.currency1 = currency1;
        this.currency2 = currency2;
        this.initialAmount = initialAmount;
        this.amountComplete = amountComplete;
        this.unitPrice = unitPrice;
        this.type = type;
        this.status = status;
        this.percentComplete = amountComplete / initialAmount * 100;
        this.date = date;
    }

    private final String date;

    public long getId() {
        return id;
    }

    public String getCurrency1() {
        return currency1;
    }

    public String getCurrency2() {
        return currency2;
    }

    public double getInitialAmount() {
        return initialAmount;
    }

    public double getAmountComplete() {
        return amountComplete;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public OrderType getType() {
        return type;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public double getPercentComplete() {
        return percentComplete;
    }

    public String getDate() {
        return date;
    }
}
