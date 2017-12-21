package com.hgm.server.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.hgm.server.model.User;
import com.hgm.server.security.factory.UsernamePasswordAuthenticationTokenFactory;
import com.hgm.server.service.UserService;



@Component
public class AuthProviderService implements AuthenticationProvider {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthProviderService.class);

    @Autowired
    UserService userService;
    @Autowired
    UsernamePasswordAuthenticationTokenFactory usernamePasswordAuthenticationTokenFactory;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String login = authentication.getName();
        String password = authentication.getCredentials().toString();
        LOGGER.info("Doing login " + login);
        User u = userService.isLoginValid(login, password);
        if(u != null) {
            LOGGER.info("Login successful. User: " + login);
            return usernamePasswordAuthenticationTokenFactory.create(u);
        }
        throw new UsernameNotFoundException("Not valid login/password");
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(UsernamePasswordAuthenticationToken.class);
    }
}
