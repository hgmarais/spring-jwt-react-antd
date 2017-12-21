package com.hgm.server.model.factory;

import org.springframework.stereotype.Component;

import com.hgm.server.model.User;



@Component
public class UserFactory {

    public User create(String username, String password, String salt, String role) {
        return new User(username, password, salt, role);
    }

}
