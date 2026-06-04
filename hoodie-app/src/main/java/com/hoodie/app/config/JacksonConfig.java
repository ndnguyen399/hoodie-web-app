/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.module.SimpleModule;

/**
 * JacksonConfig class
 */
@Configuration
public class JacksonConfig {
    @Bean
    public Module trimStringModule() {
        SimpleModule module = new SimpleModule();
        module.addDeserializer(String.class, new StringTrimDeserializer());
        return module;
    }
}
