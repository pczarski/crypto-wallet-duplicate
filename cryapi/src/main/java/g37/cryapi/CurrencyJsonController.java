package g37.cryapi;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Controller that handles the GET request and returns an appropriate object (factory design pattern)
// it will return all the getParameter() functions to the json object
@RestController
public class CurrencyJsonController {

    private final AtomicLong counter = new AtomicLong();

    @CrossOrigin(origins = "*")  //fixes the CORS blocking problem
    @GetMapping("/currency") // setting up the url location
    public CurrencyJson greeting(@RequestParam(value = "name", defaultValue = "Bitcoin") String name) {
        double templateBalance = 23.45543;
        if(name.equals("Litecoin")) {
            templateBalance = 500.088;
        }
        return new CurrencyJson(counter.incrementAndGet(), templateBalance, name);
    }
}

// accessed through: http://localhost:8080/currency?name=CurrencyName