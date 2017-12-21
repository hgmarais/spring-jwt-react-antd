package com.hgm.server.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hgm.server.service.UserService;



@Component
public class InitDatabase {


    @Autowired
    public InitDatabase(UserService userService) {
        userService.create("admin", "admin", "USER");
        userService.create("tomcat", "tomcat", "USER");
    }


}
