
package com.hgm.server.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * Returns a 401 error code (Unauthorized) to the client.
 */
@Component
public class Http401UnauthorizedEntryPoint implements AuthenticationEntryPoint {

	@Autowired
	HeaderHandler headerHandler;

	/**
	 * Always returns a 401 error code to the client.
	 */
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException arg2)
			throws IOException, ServletException {
		System.out.println("Http401UnauthorizedEntryPoint");
		System.out.println(arg2.getMessage());
		System.out.println(request.getRequestURI());
		headerHandler.process(request, response);

		if (!response.isCommitted()) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access Denied");
		}
	}
}
