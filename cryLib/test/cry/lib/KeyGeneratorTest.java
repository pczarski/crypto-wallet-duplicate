package cry.lib;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class KeyGeneratorTest {

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
}