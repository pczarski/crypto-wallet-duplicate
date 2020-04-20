//package g37.cryapi.wallet;
//
//import g37.cryapi.common.CryptoCurrency;
//
//public class Zcash extends CurrencyInWallet {
//    private static final int privLen = 24;
//    private static final int pubLen = 33;
//
//    public Zcash(boolean isToSet) {
//        super(privLen, pubLen, CryptoCurrency.ZEC, isToSet);
//        if(this.isToSet()) {
//            this.addTestReceive(7, 35);
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