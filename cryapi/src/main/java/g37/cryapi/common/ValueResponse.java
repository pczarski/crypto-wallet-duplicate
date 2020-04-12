package g37.cryapi.common;

public class ValueResponse {
    private final String response;
    private final double value;
    public ValueResponse(String response, double value) {
        this.response = response;
        this.value = value;
    }
    public String getResponse() {
        return this.response;
    }

    public double getValue() {
        return this.value;
    }
}