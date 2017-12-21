package com.hgm.server.repository;


import org.springframework.data.repository.CrudRepository;

import com.hgm.server.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

}
