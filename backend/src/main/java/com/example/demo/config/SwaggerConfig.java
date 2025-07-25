package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 🔥 SWAGGER CONFIG HEROES OF TIME 🔥
 * Config SpringDoc pour documentation API automatique
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI heroesOfTimeOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("🌍 Heroes of Time API - RÉVOLUTION GRUT")
                        .description("API complète Heroes of Time avec système terrain intelligent, " +
                                   "formules magiques, et gun interdimensionnel Vince Vega !")
                        .version("v1.0 - GRUT Edition")
                        .contact(new Contact()
                                .name("Jean-Grofignon")
                                .description("Créateur cosmique depuis son canapé")
                                .url("https://github.com/heroes-of-time")
                        )
                );
    }
} 