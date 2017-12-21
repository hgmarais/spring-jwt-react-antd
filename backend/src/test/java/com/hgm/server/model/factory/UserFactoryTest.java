package com.hgm.server.model.factory;


import org.junit.Test;

import com.hgm.server.model.factory.UserFactory;

import java.util.Arrays;

import static org.junit.Assert.*;

public class UserFactoryTest {

    @Test
    public void testCreate() {
        UserFactory userFactory = new UserFactory();
        assertNotNull(userFactory.create("username", "pass", "salt", "USER"));
    }

}
