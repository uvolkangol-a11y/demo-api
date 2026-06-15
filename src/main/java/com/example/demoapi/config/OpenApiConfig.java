package com.example.demoapi.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("demo-api")
                        .description("Spring Boot 3 + PostgreSQL + Flyway REST API")
                        .version("v1")
                        .contact(new Contact()
                                .name("Volkan")
                                .email("u.volkangol@gmail.com")));
    }
}
