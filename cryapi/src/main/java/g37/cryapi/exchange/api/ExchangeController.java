package g37.cryapi.exchange.api;

import g37.cryapi.common.CryptoCurrency;
import g37.cryapi.exchange.CurrencyInExchange;
import g37.cryapi.exchange.ExchangeAccess;
import g37.cryapi.exchange.ExchangeHandler;
import g37.cryapi.exchange.ExchangeName;
import org.springframework.web.bind.annotation.*;

@RestController
public class ExchangeController {

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
        ExchangeHandler exchangeHandler = ExchangeHandler.getInstance();

        if(exchangeHandler.getExchanges().size() == 0) {
            exchangeHandler.addTestExchanges();
        }


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
}
