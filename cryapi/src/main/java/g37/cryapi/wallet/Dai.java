//package g37.cryapi.wallet;
//
//import g37.cryapi.common.CryptoCurrency;
//
//public class Dai extends CurrencyInWallet {
//    private static final int privLen = 24;
//    private static final int pubLen = 33;
//
//    public Dai(boolean isToSet) {
//        super(privLen, pubLen, CryptoCurrency.DAI, isToSet);
//        if(this.isToSet()) {
//            this.addTestReceive(13, 30);
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