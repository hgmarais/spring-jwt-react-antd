package com.hgm.server.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/app")
public class AppController {
	
	private String name = "App";
	
	@RequestMapping(value = "/name", method = RequestMethod.GET)
	public String getName() {
		return name;
	}
	
	@RequestMapping(value = "/name/{name}", method = RequestMethod.PUT)
	public void setName(@PathVariable String name) {
		this.name = name;
	}

}
