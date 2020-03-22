package g37.cryapi.api;

import g37.cryapi.wallet.TransactionRecord;

import java.util.List;

public class RecordsJson {
    private final String currencyName;
    private final List<TransactionRecord> records;
    public RecordsJson(List<TransactionRecord> records, String currencyName) {
        this.records = records;
        this.currencyName = currencyName;
    }

    public String getCurrencyName() {
        return currencyName;
    }

    public List<TransactionRecord> getRecords() {
        return this.records;
    }
}
