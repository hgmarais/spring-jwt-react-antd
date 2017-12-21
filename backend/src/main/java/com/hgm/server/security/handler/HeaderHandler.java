package com.hgm.server.security.handler;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class HeaderHandler {

    static final String ALLOW_ORIGIN = "Access-Control-Allow-Origin";
    static final String ALLOW_CREDENTIALS = "Access-Control-Allow-Credentials";
    static final String ALLOW_HEADERS = "Access-Control-Allow-Headers";
    static final String OPTIONS = "OPTIONS";
    static final String OK = "OK";
    static final String REQUEST_HEADERS = "Access-Control-Request-Headers";
    static final String STAR = "*"; //* or origin as you prefer
    static final String TRUE = "true";

    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
    	System.out.println("HGM header : " + request.getHeader(REQUEST_HEADERS));
    	System.out.println("HGM method : " + request.getMethod());
   	
			// this origin value could just as easily have come from a database
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setHeader("Access-Control-Allow-Credentials", "true");
			response.setHeader(
					"Access-Control-Allow-Headers",
					"Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization");

			// CORS pre-flight request
			if (request.getHeader("Access-Control-Request-Method") != null && "OPTIONS".equals(request.getMethod())) {

        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        response.setHeader("Access-Control-Max-Age", "1");// 30 min
			}
			
			response.getWriter().flush();
      
      
//        response.setHeader(ALLOW_ORIGIN, STAR);
//        response.setHeader(ALLOW_CREDENTIALS, TRUE);
//        response.setHeader(ALLOW_HEADERS,  request.getHeader(REQUEST_HEADERS));
//        if (request.getMethod().equals(OPTIONS)) {
//            response.getWriter().print(OK);
//            response.getWriter().flush();
//        }
    }
}
