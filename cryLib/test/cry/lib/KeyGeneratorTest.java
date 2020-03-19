package cry.lib;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

public class KeyGeneratorTest {
    private static final int SEED_LIST_LEN = 2048;
    private static final int SEED_LEN = 12;

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
    }

    @Test
    public void testGenerateKey() {
        int length = 24;
        String randomKey = KeyGenerator.generateKey(length);
        System.out.println(randomKey);
        assertEquals(length, randomKey.length());
    }

    @Test
    public void testGenerateSeed() throws IOException {
        String seed1 = KeyGenerator.generateSeed();
        String seed2 = KeyGenerator.generateSeed();
        assertNotEquals(seed1, seed2);
        System.out.println(seed1 + " " + seed2);
    }
}