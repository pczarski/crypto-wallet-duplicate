package g37.cryapi.exchange.api;

import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.common.TextResponse;
import g37.cryapi.exchange.*;
import g37.cryapi.wallet.Wallet;
import org.springframework.web.bind.annotation.*;

@RestController
public class ExchangeController {

    // todo temporary helpers for testing
    private void runHelpers() {
        if(ExchangeHandler.getInstance().getExchanges().size() == 0) {
            ExchangeHandler.getInstance().addTestExchanges();
        }
        if(!Wallet.getInstance().getIsSetUp()) {
            Wallet.getInstance().setUpNew();
        }
    }


    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/add-exchange") // setting up the url location
    public ExchangeJson addExchange(
            @RequestParam(value = "name", defaultValue = "Binance") String name,
            @RequestParam(value = "key", defaultValue = "") String key
    ) {
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        try {
            exchangeHandler.addExchange(key, ExchangeName.valueOf(name));
            ExchangeAccess exchange = exchangeHandler.getExchange(ExchangeName.valueOf(name));
            return new ExchangeJson(exchange.getName().getName(), exchange.getApiKey());
        }
        catch (IllegalArgumentException e) {
            return new ExchangeJson("Not Supported", null);
        }

    } // http://localhost:8080/add-exchange?name=Binance&key=XXXKEYXXX

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/exchange-currency") // setting up the url location
    public CurrencyInExchangeJson getExchangeCurrency(
            @RequestParam(value = "exchange", defaultValue = "Binance") String exchange,
            @RequestParam(value = "currency", defaultValue = "Bitcoin") String currency
    ) {

        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();


        try {
            ExchangeAccess selectedExchange = exchangeHandler.getExchange(ExchangeName.valueOf(exchange));
            CurrencyInExchange selectedCurrency = selectedExchange.getCurrencyInExchange(CryptoCurrency.valueOf(currency));
            return new CurrencyInExchangeJson(
                    CryptoCurrency.valueOf(currency).getName(),
                    selectedExchange.getName().getName(),
                    selectedCurrency.getCurrentPublicKey(),
                    selectedCurrency.getBalance(),
                    selectedCurrency.getMarketPrice());
        }
        catch (IllegalArgumentException e) {
            return new CurrencyInExchangeJson("Exchange or currency not found", null, null, -1, -1);
        }

    } // http://localhost:8080/exchange-currency?exchange=Binance&currency=Bitcoin

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/withdraw") // setting up the url location
    public TextResponse withdrawCurrency(
            @RequestParam(value = "exchange", defaultValue = "Binance") String exchange,
            @RequestParam(value = "currency", defaultValue = "Bitcoin") String currency,
            @RequestParam(value = "amount", defaultValue = "0.0") double amount
    ) {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        try {
            ExchangeAccess selectedExchange = exchangeHandler.getExchange(ExchangeName.valueOf(exchange));
            CurrencyInExchange selectedCurrency = selectedExchange.getCurrencyInExchange(CryptoCurrency.valueOf(currency));
            if(selectedCurrency.withdrawCurrency(amount)) {
                return new TextResponse("success", 1); //todo the id thing, smth is missing here
            };
            return new TextResponse("insufficient balance", 0);
        }
        catch (IllegalArgumentException e) {
            return new TextResponse("Exchange or currency not found", -1);
        }

    } // http://localhost:8080/withdraw?exchange=Binance&currency=Bitcoin&amount=0.5

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/deposit") // setting up the url location
    public TextResponse depositCurrency(
            @RequestParam(value = "exchange", defaultValue = "Binance") String exchange,
            @RequestParam(value = "currency", defaultValue = "Bitcoin") String currency,
            @RequestParam(value = "amount", defaultValue = "0.0") double amount
    ) {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        try {
            ExchangeAccess selectedExchange = exchangeHandler.getExchange(ExchangeName.valueOf(exchange));
            CurrencyInExchange selectedCurrency = selectedExchange.getCurrencyInExchange(CryptoCurrency.valueOf(currency));
            if(selectedCurrency.depositCurrency(amount)) {
                return new TextResponse("success", 1); //todo the id thing, smth is missing here
            };
            return new TextResponse("insufficient balance", 0);
        }
        catch (IllegalArgumentException e) {
            return new TextResponse("Exchange or currency not found", -1);
        }

    } // http://localhost:8080/deposit?exchange=Binance&currency=Bitcoin&amount=0.5


    /* orders */

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/order") // setting up the url location
    public OrderJson makeOrder(
            @RequestParam(value = "type") String type,
            @RequestParam(value = "exchange") String exchange,
            @RequestParam(value = "currency1") String currency1,
            @RequestParam(value = "currency2") String currency2,
            @RequestParam(value = "amount") double amount,
            @RequestParam(value = "price") double price
    ) {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        try {
            Order order = exchangeHandler.placeOrder(
                    ExchangeName.valueOf(exchange), OrderType.valueOf(type),
                    CryptoCurrency.valueOf(currency1), CryptoCurrency.valueOf(currency2),
                    amount, price
                    );
            return new OrderJson(
                    order.getOrderID(), order.getCurrency1().toString(), order.getCurrency2().toString(),
                    order.getInitialAmount(), order.getAmountComplete(), order.getUnitPrice(),
                    order.getType(), order.getStatus(), order.getDate().toString()
                    );
        } catch (IllegalArgumentException e) {
            return new OrderJson(-1, "Unsupported exchange or currency", null, -1,
                    -1, -1, null, null, null);
        } catch (IllegalStateException e) {
            return new OrderJson(0, "Insufficient Balance", null, -1,
                    -1, -1, null, null, null);
        }

    } // http://localhost:8080/order?&type=Sell&exchange=Binance&currency1=BTC&currency2=ETH&amount=0.5&price=10.4

}