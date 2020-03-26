package g37.cryapi.common;

public class TextResponse {
    private final String response;
    private final long id;
    public TextResponse(String response, long id) {
        this.response = response;
        this.id = id;
    }
    public String getResponse() {
        return this.response;
    }

    public long getId() {
        return this.id;
    }
}
