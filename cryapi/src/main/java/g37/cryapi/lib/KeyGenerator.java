package g37.cryapi.lib;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Random;

public class KeyGenerator {

    private static final int N_SEED_WORDS = 2048;
    private static final int SEED_LENGTH = 12;
    private static final String WORDS_PATH = "sources/seed_list.txt";

    public static String generateKey(int n) {

        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);

        for (int i = 0; i < n; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }

        return sb.toString();
    }

    public static String generateSeed() throws IOException {
        String[] seed = new String[SEED_LENGTH];
        String[] words = txtToArray(WORDS_PATH, N_SEED_WORDS);
        for(int i = 0; i < SEED_LENGTH; i++){
            seed[i] = words[new Random().nextInt(N_SEED_WORDS)];
        }
        return Arrays.toString(seed);
    }

    private static String[] txtToArray(String path, int length) throws IOException {
        String[] arr = new String[length];
        BufferedReader bufferedReader = new BufferedReader(new FileReader(path));
        for (int i = 0; i < length; i++){
            arr[i] = bufferedReader.readLine();
        }
        bufferedReader.close();
        return arr;
    }

}

