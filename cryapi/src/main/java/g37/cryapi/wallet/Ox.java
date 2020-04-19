//package g37.cryapi.wallet;
//
//import g37.cryapi.common.CryptoCurrency;
//
//public class Ox extends CurrencyInWallet {
//    private static final int privLen = 24;
//    private static final int pubLen = 33;
//
//    public Ox(boolean isToSet) {
//        super(privLen, pubLen, CryptoCurrency.ZRX, isToSet);
//        if(this.isToSet()) {
//            this.addTestReceive(6, 2);
//        }
//    }
//
//    @Override
//    protected void updateKeyBalance(KeyPair key) {
//
//    }
//
//    @Override
//    protected void performSend(KeyPair pair, String addressTo, double amount) {
//
//    }
//}
