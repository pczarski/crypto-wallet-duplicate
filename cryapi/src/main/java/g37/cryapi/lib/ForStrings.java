package g37.cryapi.lib;

public class ForStrings {
    public static String arrayToSpaceString(String[] in) {
        StringBuilder out = new StringBuilder();
        for (String word: in) {
            out.append(word).append(" ");
        }
        out.deleteCharAt(out.length()-1);
        return out.toString();
    }
}
