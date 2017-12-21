package com.hgm.server.support;


import org.junit.Test;

import com.hgm.server.support.StringSupport;

import static org.junit.Assert.*;

public class StringSupportTest {

    @Test
    public void testGenerate() {
        StringSupport stringSupport = new StringSupport();
        assertNotNull(stringSupport.generate());
        assertTrue(stringSupport.generate().length() > 0);
    }

}
