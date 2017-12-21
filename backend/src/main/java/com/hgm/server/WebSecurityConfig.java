package com.hgm.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hgm.server.security.AuthProviderService;
import com.hgm.server.security.filter.JwtAuthenticationTokenFilter;
import com.hgm.server.security.handler.AjaxAuthenticationFailureHandler;
import com.hgm.server.security.handler.AjaxAuthenticationSuccessHandler;
import com.hgm.server.security.handler.AjaxLogoutSuccessHandler;
import com.hgm.server.security.handler.Http401UnauthorizedEntryPoint;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    AjaxAuthenticationSuccessHandler ajaxAuthenticationSuccessHandler;
    @Autowired
    AjaxAuthenticationFailureHandler ajaxAuthenticationFailureHandler;
    @Autowired
    AjaxLogoutSuccessHandler ajaxLogoutSuccessHandler;
    @Autowired
    Http401UnauthorizedEntryPoint authenticationEntryPoint;
    @Autowired
    AuthProviderService authProvider;
    @Autowired
    SecurityProperties security;
    @Autowired
    JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        String[] permited = new String[security.getIgnored().size()];
        security.getIgnored().toArray(permited);
        
        HttpSecurity security = http.csrf().disable();
        
        security = security.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint).and();
        security = security.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and();
        
        /* Configure authentication. */
		    security = security.authorizeRequests()
		      .antMatchers("/api/authenticate").permitAll()
		      .antMatchers("/api/authentication").permitAll()
		      .anyRequest().authenticated()
		      .and();
		    
		    /* Configure login. */
	      security = security.formLogin()
		      .loginProcessingUrl("/api/authentication")
		      .successHandler(ajaxAuthenticationSuccessHandler)
		      .failureHandler(ajaxAuthenticationFailureHandler)
		      .usernameParameter("username")
		      .passwordParameter("password")
		      .and();
	      
	      /* Configure logout. */
	      security.logout()
          .logoutUrl("/api/logout")
          .logoutSuccessHandler(ajaxLogoutSuccessHandler)
          .invalidateHttpSession(true)
          .deleteCookies("JSESSIONID");
	      
//        http
//                .csrf().disable()
//                .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint).and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//                .authorizeRequests()
//	                .antMatchers("/api/authenticate").permitAll()
//	                .antMatchers("/api/authentication").permitAll()
//	                .anyRequest().authenticated()
//	              .and()
//	                .formLogin()
//	                .loginProcessingUrl("/api/authentication")
//	                .successHandler(ajaxAuthenticationSuccessHandler)
//	                .failureHandler(ajaxAuthenticationFailureHandler)
//	                .usernameParameter("username")
//	                .passwordParameter("password")
//                .and()
//	                .logout()
//	                .logoutUrl("/api/logout")
//	                .logoutSuccessHandler(ajaxLogoutSuccessHandler)
//	                .invalidateHttpSession(true)
//	                .deleteCookies("JSESSIONID");

        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
        http.headers().cacheControl();
    }

    @Bean
    public ShaPasswordEncoder sha() {
        ShaPasswordEncoder shaPasswordEncoder = new ShaPasswordEncoder(256);
        return shaPasswordEncoder;
    }
    
//  	@Bean
//  	public FilterRegistrationBean corsFilter() {
//  		System.out.println("HGM corsFilter");
//  		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//  		CorsConfiguration config = new CorsConfiguration();
//  		config.setAllowCredentials(true);
//  		config.addAllowedOrigin("*");
//  		config.addAllowedHeader("*");
//  		config.addAllowedMethod("*");
//  		source.registerCorsConfiguration("/**", config);
//  		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
//  		bean.setOrder(0);
//  		return bean;
//  	}
  	
}
