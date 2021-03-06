package g37.cryapi.exchange.api;
import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.common.TextResponse;
import g37.cryapi.common.ValueResponse;
import g37.cryapi.exchange.*;
import g37.cryapi.wallet.Wallet;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.rmi.NoSuchObjectException;
import java.util.List;

@RestController
public class ExchangeController {

    // todo temporary helpers for testing
    private void runHelpers() {
        if(ExchangeHandler.getInstance().getExchanges().size() == 0) {
            ExchangeHandler.getInstance().addTestExchanges();
        }
        Wallet wallet = Wallet.getInstance();
        if(wallet.areSavedFiles() && !wallet.getIsSetUp()){
            wallet.loadFromFile();
            return;
        }
        if (!wallet.getIsSetUp()) {
            wallet.setUpNew();
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
                    CryptoCurrency.valueOf(currency).toString(),
                    selectedExchange.getName().getName(),
                    selectedCurrency.getCurrentPublicKey(),
                    selectedCurrency.getBalance(),
                    selectedCurrency.getMarketPrice());
        }
        catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exchange or currency not found");
           // return new CurrencyInExchangeJson("Exchange or currency not found", null, null, null, -1, -1);
        }

    } // http://localhost:8080/exchange-currency?exchange=Binance&currency=Bitcoin

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/exchange-currencies") // setting up the url location
    public CurrencyInExchangeJson[] getExchangeCurrencies(
            @RequestParam(value = "exchange", defaultValue = "Binance") String exchange) {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();

        try {
            ExchangeAccess selectedExchange = exchangeHandler.getExchange(ExchangeName.valueOf(exchange));
            return this.toCurrencyInExchangeJsonArray(selectedExchange.getCurrenciesInExchange());
        }
        catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exchange not found");
           // CurrencyInExchangeJson[] error = {new CurrencyInExchangeJson("Exchange not found", null, null, -1, -1)};
           // return error;
        }

    } // http://localhost:8080/exchange-currencies?exchange=Binance

    private CurrencyInExchangeJson[] toCurrencyInExchangeJsonArray(List<CurrencyInExchange> currencies) {
        CurrencyInExchangeJson[] out = new CurrencyInExchangeJson[currencies.size()];
        for (int i = 0; i < out.length; i++){
            CurrencyInExchange currency = currencies.get(i);
            out[i] = new CurrencyInExchangeJson(
                    currency.getName().getName(),
                    currency.getName().toString(),
                    currency.getExchangeAccess().getName().getName(),
                    currency.getCurrentPublicKey(),
                    currency.getBalance(),
                    currency.getMarketPrice());
        }
        return out;
    }

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
                Wallet.getInstance().saveState();
                return new TextResponse("success", 1); //todo the id thing, smth is missing here
            };
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient balance");
        }
        catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "Exchange or currency not found");
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
                Wallet.getInstance().saveState();
                return new TextResponse("success", 1); //todo the id thing, smth is missing here
            };
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient balance");
        }
        catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "Exchange or currency not found");
        }

    } // http://localhost:8080/deposit?exchange=Binance&currency=BTC&amount=0.5


    /* orders */

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/new-order") // setting up the url location
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
                    order.getOrderID(), order.getExchangeAccess().getName().getName(),
                    order.getCurrency1().toString(), order.getCurrency2().toString(),
                    order.getInitialAmount(), order.getAmountComplete(), order.getUnitPrice(),
                    order.getType(), order.getStatus(), order.getDate().toString()
                    );
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "Unsupported exchange or currency");
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient balance");
        }

    } // http://localhost:8080/new-order?&type=Sell&exchange=Binance&currency1=BTC&currency2=ETH&amount=0.5&price=10.4

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/swap") // setting up the url location
    public OrderJson makeSwapOrder(
            @RequestParam(value = "exchange") String exchange,
            @RequestParam(value = "currency1") String currency1,
            @RequestParam(value = "currency2") String currency2,
            @RequestParam(value = "amount") double amount
    ) {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        try {
            Order order = exchangeHandler.placeSwapOrder(
                    ExchangeName.valueOf(exchange), CryptoCurrency.valueOf(currency1),
                    CryptoCurrency.valueOf(currency2), amount
            );
            return new OrderJson(
                    order.getOrderID(), order.getExchangeAccess().getName().getName(),
                    order.getCurrency1().toString(), order.getCurrency2().toString(),
                    order.getInitialAmount(), order.getAmountComplete(), order.getUnitPrice(),
                    order.getType(), order.getStatus(), order.getDate().toString()
            );
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "Unsupported exchange or currency");
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient balance");
        }

    } // http://localhost:8080/swap?exchange=Binance&currency1=BTC&currency2=ETH&amount=0.5

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/get-order") // setting up the url location
    public OrderJson getOrder(
            @RequestParam(value = "exchange") String exchange,
            @RequestParam(value = "id") long id
    ) {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        try {
            Order order = exchangeHandler.getOrder(id, ExchangeName.valueOf(exchange));
            return new OrderJson(
                    order.getOrderID(), order.getExchangeAccess().getName().getName(),
                    order.getCurrency1().toString(), order.getCurrency2().toString(),
                    order.getInitialAmount(), order.getAmountComplete(), order.getUnitPrice(),
                    order.getType(), order.getStatus(), order.getDate().toString()
            );
        } catch (IllegalArgumentException e) {
            return new OrderJson(-1, null, "Unsupported exchange or currency", null, -1,
                    -1, -1, null, null, null);
        } catch (NoSuchObjectException e) {
            return new OrderJson(0, null, "Order not found", null, -1,
                    -1, -1, null, null, null);
        }
    } // http://localhost:8080/get-order?&exchange=Binance&id=1

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/all-orders") // setting up the url location
    public OrderJson[] getOrders() {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        return this.getOrderList(exchangeHandler.getFullOrderHistory());
    } // http://localhost:8080/all-orders

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/orders") // setting up the url location
    public OrderJson[] getExchangeOrders(@RequestParam(value = "exchange") String exchange) {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        try {
            return this.getOrderList(exchangeHandler.getExchange(ExchangeName.valueOf(exchange)).getOrders());
        } catch (IllegalArgumentException e) {
            OrderJson[] toRet = {new OrderJson(-1, null, "Unsupported/Invalid exchange", null, -1,
                    -1, -1, null, null, null)};
            return toRet;
        }
    } // http://localhost:8080/orders?exchange=Binance


    private OrderJson[] getOrderList(List<Order> orderList) {
        OrderJson[] toRet = new OrderJson[orderList.size()];
        for(int i = 0; i < toRet.length; i++) {
            Order order = orderList.get(i);
            toRet[i] = new OrderJson(
                    order.getOrderID(), order.getExchangeAccess().getName().getName(),
                    order.getCurrency1().toString(), order.getCurrency2().toString(),
                    order.getInitialAmount(), order.getAmountComplete(), order.getUnitPrice(),
                    order.getType(), order.getStatus(), order.getDate().toString()
            );
        }
        return toRet;
    }

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/cancel") // setting up the url location
    public OrderJson cancelOrder(@RequestParam(value = "exchange") String exchange, @RequestParam(value = "id") long id) {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        try {
            Order order = exchangeHandler.getOrder(id, ExchangeName.valueOf(exchange));
            order.cancelOrder();
            return new OrderJson(
                    order.getOrderID(), order.getExchangeAccess().getName().getName(),
                    order.getCurrency1().toString(), order.getCurrency2().toString(),
                    order.getInitialAmount(), order.getAmountComplete(), order.getUnitPrice(),
                    order.getType(), order.getStatus(), order.getDate().toString()
            );

        } catch (IllegalArgumentException e) {
            return new OrderJson(-1, null, "Unsupported/Invalid exchange", null, -1,
                    -1, -1, null, null, null);
        } catch (NoSuchObjectException e) {
            return new OrderJson(-1, null, "Order doesn't exist", null, -1,
                    -1, -1, null, null, null);
        }
    } // http://localhost:8080/cancel?exchange=Binance&id=1

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/exchange-price-in") // setting up the url location
    public ValueResponse getPriceIn(
            @RequestParam(value = "exchange", defaultValue = "Binance") String exchange,
            @RequestParam(value = "base", defaultValue = "BTC") String c1,
            @RequestParam(value = "in", defaultValue = "ETH") String c2
    ) {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        try {
            double value = exchangeHandler.getExchange(ExchangeName.valueOf(exchange)).valueInCurrency(CryptoCurrency.valueOf(c1), CryptoCurrency.valueOf(c2));
            return new ValueResponse(c1 + " in " + c2, value);
        } catch (IllegalArgumentException e) {
            return new ValueResponse("Couldn't find the currencies or the exchange", -1);
        }
    } // http://localhost:8080/exchange-price-in?exchange=Binance&base=BTC&in=ETH

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/exchange-total-balance") // setting up the url location
    public ValueResponse getTotalBalance(
            @RequestParam(value = "exchange", defaultValue = "Binance") String exchange,
            @RequestParam(value = "in", defaultValue = "BTC") String currency
    ) {
        this.runHelpers();
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();
        try {
            double value = exchangeHandler.getExchange(ExchangeName.valueOf(exchange)).getTotalBalance(CryptoCurrency.valueOf(currency));
            return new ValueResponse(exchange + " total balance in "+currency, value);
        } catch (IllegalArgumentException e) {
            return new ValueResponse("Couldn't find the currencies or exchange", -1);
        }
    } // http://localhost:8080/exchange-total-balance?exchange=Binance&in=BTC





}
